<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateuserRequest;
use Validator;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
class userController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function index()
    {
        $user= User::where('role', "player")->get();

        return response($user);
        // return response()->json([
        //     'message' => ' list successfully',
        //     'user' => $user
        // ]);   
    }

    public function owner()
    {
        $user= User::where('role', "owner")->get();
        return response($user);
    
    }
    public function deleteowner(User $user)
    {
         $user->delete();
        return response()->json(['message' =>"delete successfully"]);


    }
        
    
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateuserRequest $request, User $user)
    
    {

       
        
        // return response()->json(['message' => $request->all()]);



        $user->update($request->all());
        $user->save();
        return response($user);
        // return response($request->all());
        // return response()->json([
        //     'message' => 'User update successfully',
        //     'user' => $user
        // ]);
        //
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
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        return response()->json(['message' => $request->all()]);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy( User $user)
    {
         $user->delete();
        return response()->json(['message' =>"delete successfully"]);

    
            //

    }
}
