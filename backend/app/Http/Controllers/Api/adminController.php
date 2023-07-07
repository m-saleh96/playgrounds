<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateuserRequest;
use App\Models\User;
use Illuminate\Http\Request;

class adminController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user= User::where('role', "admin")->get();
        return response($user);
        //
    }
    public function owner()
    {
        $user= User::where('role', "owner")->get();
        return response($user);
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
   

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
   

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
 public function update(UpdateuserRequest $request, User $user)
    
    {

       
        
        // return response()->json(['message' => $request->all()]);



        $user->update($request->all());
        $user->save();
        return response($user);
        // return response()->json([
        //     'message' => 'User update successfully',
        //     'user' => $user
        // ]);
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
public function destroy( User $admin)
    {
         $admin->delete();  
        return response()->json(['message' =>"delete successfully"]);

    
            //

    }
}
