<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Playground;
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
        $slot_id = TimeSlot::select('slot_id')->latest()->first();
        // if($slot_id == null){
        //     $slot_id = 0;
        // }
        $timeSlots = [];
        foreach($request->input('time') as $time){
            $timeSlots[] = TimeSlot::create([
                'playground_id' => $request->input('playground_id'),
                'day' => $request->input('day'),
                'start_time' => $time['start'],
                'end_time' => $time['end'],
                'slot_id' => $slot_id? $slot_id->slot_id + 1:1,
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
        $playground = Playground::find($id);
        if(!$playground){
            return response()->json(['message'=>'This playground does not exist'],404);
        }
        $timeSlots = TimeSlot::where('playground_id',$id)->get();
        if($timeSlots->isEmpty()){
            return response()->json(['message'=>'No time slots for this playground'],404);
        }
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
      $timeSlot = TimeSlot::where('slot_id',$id)->get();
        if(!$timeSlot){
            return response()->json(['message'=>'This time slot does not exist'],404);
        }
        $validator = Validator::make($request->all(), [
            'playground_id' => 'required|exists:playgrounds,id',
            // 'day' => 'required|date_format:Y-m-d|after_or_equal:today|unique:time_slots,day,'.$timeSlot->id.',id,playground_id,' . $request->input('playground_id'),
            'time' => 'required|array',
            'time.*.start' => 'required|date_format:g:i A|before:time.*.end',
            'time.*.end' => 'required|date_format:g:i A|after:time.*.start',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors(),400);
        }
        $timeSlots = [];

    foreach ($request->input('time') as $time) {
        if(isset($time['id'])){
            $existingTimeSlot = TimeSlot::where('id', $time['id'])
            // ->where('start_time', $time['start'])
            // ->where('end_time', $time['end'])
            ->first();

        if ($existingTimeSlot) {
            $existingTimeSlot->update([
                'start_time' => $time['start'],
                'end_time' => $time['end'],
              
            ]);

            $timeSlots[] = $existingTimeSlot;
        }
        } else {
            $newTimeSlot = TimeSlot::create([
                'playground_id' => $request->input('playground_id'),
                'day' => $request->input('day'),
                'start_time' => $time['start'],
                'end_time' => $time['end'],
                'slot_id' => $id,
            ]);

            $timeSlots[] = $newTimeSlot;
        }
    }

    return response()->json($timeSlots, 201);
        
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
        $slot = TimeSlot::where('slot_id',$id);
        $slot->delete();
        
        
    }
}
