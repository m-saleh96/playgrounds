<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Playground;
use App\Models\Review;
use Illuminate\Http\Request;
use Validator;
class RateController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        $Review= Review::all();

        return response($Review);
        //
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
        $validated = validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'playground_id' => 'required|exists:playgrounds,id',
            'review' => 'required',
            'rating' => 'required|integer|between:0,5',
        ]);
        if ($validated->fails()) {
            return response()->json($validated->errors(), 400);
        }
        $review = Review::updateOrCreate(
            ['playground_id' => $request->playground_id, 'user_id' =>$request->user_id],
              ['rating' =>$request->rating,"review"=>$request->review]
            //   ['playground_id' => $request->playground_id, 'user_id' =>$request->user_id,'rating' =>$request->rating,"review"=>""]
        );
        $rating = Review::
            where('playground_id', $request->playground_id)
             ->avg('rating');
             $this->updatePaygroundRate( $request->playground_id,$rating);
        return response()->json($review, 201);
    }

    
    public function updatePaygroundRate($id,$rating)
    {
        Playground::where('id',$id)
        ->update(['rating' =>$rating ]);
    }


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $allRatingOfplayground = Review::where('playground_id',$id)->with('user')->get();
        return response()->json($allRatingOfplayground, 200);
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        //
        $validated = validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'playground_id' => 'required|exists:playgrounds,id',
            'review' => 'required',
            'rating' => 'required|integer|between:0,5',
        ]);
        if ($validated->fails()) {
            return response()->json($validated->errors(), 400);
        }
        $review = Review::updateOrCreate(
            ['playground_id' => $request->playground_id, 'user_id' =>$request->user_id],
              ['rating' =>$request->rating,"review"=>$request->review]
            //   ['playground_id' => $request->playground_id, 'user_id' =>$request->user_id,'rating' =>$request->rating,"review"=>""]
        );
        $rating = Review::
            where('playground_id', $request->playground_id)
             ->avg('rating');
             $this->updatePaygroundRate( $request->playground_id,$rating);
        return response()->json($review, 201);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy( $id)
    {
        $element = Review::where('id',$id)->first();
        $review = Review::destroy($id);
        if($element){
            $rating = Review::where('playground_id', $element->playground_id)
            ->avg('rating');
            $this->updatePaygroundRate( $element->playground_id,$rating);
        }
       
    return response()->json("delete successfuly", 201);
    }
}
