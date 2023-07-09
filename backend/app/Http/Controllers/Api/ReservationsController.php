<?php

namespace App\Http\Controllers\Api;
use Carbon\Carbon;
use App\Http\Controllers\Controller;
use App\Models\reservations;
use Illuminate\Http\Request;
use Nafezly\Payments\Classes\FawryPayment;
use Validator;
use App\Models\TimeSlot;
use Nafezly\Payments\PaymobPayment;
class ReservationsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()// for administration
    {
        //
        $reservations=reservations ::all();

        return response($reservations); 
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $validator = Validator::make($request->all(), [
            'playground_id' => 'required|exists:playgrounds,id',
            'user_id' => 'required|exists:users,id',
            'day' => 'required|date_format:Y-m-d|exists:time_slots,day',
            'start_time' => 'required|date_format:g:i A|before:time.*.end|exists:time_slots,start_time',
            'end_time' => 'required|date_format:g:i A|after:time.*.start|exists:time_slots,end_time',
        ]);
        if($validator->fails()){
            return response()->json($validator->errors(),400);
        }
           $reservations= reservations::create([
            'user_id'=>    $request->user_id,
            'playground_id' => $request->playground_id,
            'day' => $request->input('day'),
            'start_time' =>$request->start_time,
            'end_time' =>$request->end_time,
            ]);
        return response()->json($reservations,201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $reservations = reservations::where('user_id', '=', $id)->get();
        return response()->json($reservations, 200);

        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $reservations = reservations::where('id', '=', $id)->first();
        $date = Carbon::now();
        $diffHours = Carbon::parse($reservations->created_at)->diffInHours($date);
        
        if($diffHours>24){
            return   response( "sorry this request can not cansel");
        }
        else{
            $reservations->delete();
            return         
            response( "canselation seccessefuly"
            );
        }
       
        //
    }

    public function payment_verify(Request $request){
        $payment = new FawryPayment();
        // $payment->verify($request->merchantRefNumber);
        // return response()->json($payment, 200);
       $payment=  $payment->pay(
            $amount = 100,
            $user_id =1,
            $user_first_name = "ibra", 
            $user_last_name = "ibra", 
            $user_email = "ibrahimmuhammad13720@gmail.com", 
            $user_phone = "01144078667", 
            $source = null
        );
    $payment = $payment->generate_html($payment);
        return response()->json($payment, 200);
        
    }
}
