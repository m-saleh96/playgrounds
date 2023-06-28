<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdatecategoryRequest;
use Illuminate\Http\Request;
use App\Models\category;
use Validator;
class categoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $Categories= category::all();

        return response($Categories);
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    // public function store(StorecategoriesRequest $request)
    {

        $validator = Validator::make($request->all(), [
            'name' => 'required|max:30|min:3',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }
        $category = category::create(
            [
                'name' => $request->name,
            ]
            
        );
        return response()->json([
            'message' => 'Great success! New categories created',
            'category' => $category
        ], 201);

        //
    }


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(category $category)
    {
        return response()->json($category, 200);

        //
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdatecategoryRequest $request, category $category)
    // public function update(UpdatecategoriesRequest $request, categories $category)
    {
        $category->update($request->all());
        $category->save();
        return response($category);
        //
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */ public function destroy(category $category)
    {
     
        $category->delete();
        return response()->json(['message' =>"delete successfully"]);   //
    }
}
