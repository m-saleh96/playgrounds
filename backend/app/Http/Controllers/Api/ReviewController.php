<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Review;
use Illuminate\Http\Request;
use Validator;

class ReviewController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $reviews = Review::all();
        return response()->json($reviews, 200);
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
            'rating' => 'required|integer|between:1,5',
        ]);
        if ($validated->fails()) {
            return response()->json($validated->errors(), 400);
        }

        $review = Review::create($request->all());
        return response()->json($review, 201);
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
        $review = Review::find($id);
        if (is_null($review)) {
            return response()->json(["message" => "Record not found"], 404);
        }
        return response()->json($review, 200);
    }

    public function showByPlayground($id)
    {
        //
       
        $review = Review::where('playground_id', $id)->with('user')->get();
        if($review->isEmpty()){
            return response()->json(["message" => "Record not found"], 404);
        }
     
        $responseData = $review->map(function ($review) {
            return [
                'id' => $review->id,
                'rating' => $review->rating,
                'review' => $review->review,
                'created_id' => $review->created_at,
                'user_name' => $review->user->name,
                'user_id' => $review->user->id,
            ];
        });
        return response()->json($responseData, 200);
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

        $review = Review::find($id);
        if (is_null($review)) {
            return response()->json(["message" => "Record not found"], 404);
        }
        $validated = validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'playground_id' => 'required|exists:playgrounds,id',
            'review' => 'required',
            'rating' => 'required|integer|between:1,5',
        ]);
        if ($validated->fails()) {
            return response()->json($validated->errors(), 400);
        }
        $review->update($request->all());
        return response()->json($review, 200);
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
        $review = Review::find($id);
        if (is_null($review)) {
            return response()->json(["message" => "Record not found"], 404);
        }
        $review->delete();
        return response()->json("deleted sucessfully", 200);

    }
}