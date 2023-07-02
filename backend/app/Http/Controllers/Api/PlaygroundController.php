<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ImagePlayGround;
use App\Models\Playground;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Validator;

class PlaygroundController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        $playground = Playground::where('status', '<>', "pending")->get();
        return response()->json($playground, 200);

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
            'name' => 'required',
            'location' => 'required',
            'description' => 'required',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg',
            'price' => 'required',
            'size' => 'required',
            'type' => 'required',
            'user_id' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }
        $img = $request->file('image');
        $img_name = time() . '.' . $img->extension();
        $img->move(public_path('images'), $img_name);
        // $request->image = $img_name;
        $playground = Playground::create(
            [
                'name' => $request->name,
                'location' => $request->location,
                'description' => $request->description,
                'image' => $img_name,
                'price' => $request->price,
                'size' => $request->size,
                'type' => $request->type,
                'user_id' => $request->user_id,
            ]
        );

        return response()->json([
            'message' => 'Great success! New playground created',
            'playground' => $playground
        ], 201);


    }






    public function store2(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'location' => 'required',
            'description' => 'required',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg',
            'subimage.*' => 'required|image|mimes:jpeg,jpg,png,gif,svg|max:5120',
            'price' => 'required',
            'size' => 'required',
            'type' => 'required',
            'user_id' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }
        $img = $request->file('image');
        $img_name = time() . '.' . $img->extension();
        $img->move(public_path('images'), $img_name);
        $playground = Playground::create(
            [
                'name' => $request->name,
                'location' => $request->location,
                'description' => $request->description,
                'image' => $img_name,
                'price' => $request->price,
                'size' => $request->size,
                'type' => $request->type,
                'user_id' => $request->user_id,
            ]
        );
        $imgs = $request->file('subimage');
        $count=0;
        foreach($imgs as $image){
            $img_name = time() . '.' . $image->extension();
            $image->move(public_path('images'), $img_name);
            $imagePlayGround=ImagePlayGround::create([
            'playgrounds_id'=>$playground->id,
            'subImage'=>$img_name]);
            $count++;}
        $imagePlayGround = ImagePlayGround::where('playgrounds_id',$playground->id)->select('subImage')->get();
        $outputArray = [];
        foreach ($imagePlayGround as $obj) {
         $outputArray[] = $obj['subImage'];
        }
        return response()->json([
            'message' => 'Great success! New playground created',
            'playground' => $playground,
            'subImages'=>$outputArray
        ], 201);
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
        if (!$playground) {
            return response()->json([
                'message' => 'Record not found',
            ], 404);
        }
        $imagePlayGround = ImagePlayGround::where('playgrounds_id',$id)->select('subImage')->get();
        $outputArray = [];
        foreach ($imagePlayGround as $obj) {
         $outputArray[] = $obj['subImage'];
        }
        return response()->json([
            'playground' => $playground,
            'subImages'=>$outputArray
        ], 201);
        // return response()->json($playground, 200);
    }
    
    public function show2($id)
    {
        //
        $playground = Playground::find($id);
        if (!$playground) {
            return response()->json([
                'message' => 'Record not found',
            ], 404);
        }
        return response()->json($playground, 200);
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

        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'location' => 'required',
            'description' => 'required',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg',
            'price' => 'required',
            'size' => 'required',
            'type' => 'required',
            'user_id' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation error',
                'error' => $validator->errors()
            ], 400);
        }
        $playground = Playground::find($id);
        if (!$playground) {
            return response()->json([
                'message' => 'Record not found',
            ], 404);
        }
        $playground->update($request->all());
        return response()->json([
            'message' => 'Playground updated',
            'playground' => $playground
        ], 200);
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
        $playground = Playground::destroy($id);

        if (!$playground) {
            return response()->json([
                'message' => 'Record not found',
            ], 404);
        }

        // if ($playground->image) {
        //     unlink(public_path('images') . '/' . $playground->image);
        // }
        return response()->json([
            'message' => 'Playground deleted'
        ], 200);
    }

    public function search(Request $request)
    {

        $playground = Playground::query();

        if ($request->input('type')) {
            $playground->whereIn('type', $request->input('type'));

        }

        if ($request->input('location')) {
            $playground->whereIn('location', $request->input('location'));

        }

        if ($request->input('price_from') && $request->input('price_to')) {
            $playground->whereBetween('price', [intval($request->input('price_from')), intval($request->input('price_to'))]);

        }
        if ($request->input('price_below')) {
            $playground->where('price', '<', intval($request->input('price_below')));

        }
        if ($request->input('price_above')) {
            $playground->where('price', '>', intval($request->input('price_above')));

        }

        // $playground = $playground->where('status', '<>', "pending");

        $items_per_page = $request->input('items') ? $request->input('items') : 1;
        $playground = $playground->paginate($items_per_page);
        return response()->json($playground, 200);

    }





    public function pending() // for admin interface
    {
        return response()->json(Playground::where('status', "pending")->get(), 200);
    }



    public function changeStates(Request $request, Playground $playground)
    {

        $playground->status = "done";
        $playground->save();
        return response()->json([
            'message' => 'Playground updated',
            'playground' => $playground
        ], 200);
    }

    public function addAdmin(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $admin = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => \Hash::make($request->password),
            'role' => 'admin',
            'phone'=>$request->phone
        ]);

        return response()->json([
            'message' => 'Admin user created successfully',
            'admin' => $admin,
        ], 201);
    }

    public function playgroundByowner(Request $request,$id)
    {
        $playground = Playground::where('user_id',$id)->get();
        return response()->json($playground, 200);
    }


        public function topRatedPlayground()
    {
        $playground = Playground::where('status', '<>', "pending")->get();
        // dd($playground);
        $topRatedPlayground = $playground->sortByDesc(function ($playground) {
            $averageRating = $playground->reviews()->avg('rating');
            return $averageRating;
        })->first();
        // dd($topRatedPlayground);
        return response()->json($topRatedPlayground, 200);
    }


   


}

