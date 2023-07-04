<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\TimeSlot;
use Illuminate\Http\Request;

use Validator;
class TimeSlotsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        // $timeSlots = TimeSlot::all();
        // return response()->json($timeSlots,200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        
        $validator = Validator::make($request->all(), [
            'playground_id' => 'required|exists:playgrounds,id',
            'day' => 'required|date_format:Y-m-d|after_or_equal:today|unique:time_slots,day,NULL,id,playground_id,' . $request->input('playground_id'),
            'time' => 'required|array',
            'time.*.start' => 'required|date_format:g:i A|before:time.*.end',
            'time.*.end' => 'required|date_format:g:i A|after:time.*.start',
        ]);
        

        if($validator->fails()){
            return response()->json($validator->errors(),400);
        }
        $timeSlots = [];
        foreach($request->input('time') as $time){
            $timeSlots[] = TimeSlot::create([
                'playground_id' => $request->input('playground_id'),
                'day' => $request->input('day'),
                'start_time' => $time['start'],
                'end_time' => $time['end'],
            ]);
        }
        return response()->json($timeSlots,201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
        $timeSlots = TimeSlot::where('playground_id',$id)->get();
        return response()->json($timeSlots,200);
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
      
        
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        
    }
}
