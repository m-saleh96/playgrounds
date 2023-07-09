<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use DB;
use Hash;
use Illuminate\Http\Request;
use Validator;
use \Ichtrojan\Otp\Otp;
use Mail;
use App\Mail\firstmail;
class resetPasswordController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    private $otp;
    public function __construct(){
$this->otp=new Otp;
    }
    public function sendtoken(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|exists:users,email',
        ]);
        if($validator->fails()){
            return response()->json($validator->errors(),400);
        }
        $user= User::where('email', $request->email)->first();
        $otp = $this->otp->generate($user->email, 6, 15);
        $mailData=[
            'title' => 'Hallo mr/miss '.$user->name,
            'body' => 'use the below code for reset password',
            'code' =>$otp->token
        ];
        // Mail::to('gergesvictor512@gmail.com')->send(new firstmail($mailData));
        Mail::to($request->email)->send(new firstmail($mailData));
<<<<<<< HEAD

=======
>>>>>>> 81ab81774e53a91c185c61dffba15dd1f934c7da

        // return response()->json(['message' => $otp]);
        return response()->json(['message' => 'Email send successfully']);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function cheeckcode(Request $request)
    {
        //

        $validator = Validator::make($request->all(), [
            'email' => 'required|exists:users,email',
            'otp' => 'required|max:6',
        ]);
        if($validator->fails()){
            return response()->json($validator->errors(),400);
        }
        $check=$this->otp->validate($request->email,$request->otp);
        if(!$check->status){
        return response()->json(['error' => $check],401);
        }
         DB::table('otps')->where('token', $request->otp)->update(['valid' => 1]);
        return response()->json(['message' => 'valid code']);
        
    }

    public function resetpassword(Request $request)
    {
        //

        $validator = Validator::make($request->all(), [
            'email' => 'required|exists:users,email',
            'otp' => 'required|max:6',
            'password' => 'required'
        ]);
        if($validator->fails()){
            return response()->json($validator->errors(),400);
        }
        $check=$this->otp->validate($request->email,$request->otp);
        if(!$check->status){
        return response()->json(['error' => $check],401);
        }
        $user= User::where('email', $request->email)->first();
        $user->Update(['password'=>Hash::make($request->password)]);
        $user->tokens()->delete();
        $mailData=[
            'title' => 'Hallo mr/miss '.$user->name,
            'body' => 'Your password has been modified',
            'code' =>""
        ];

        Mail::to('gergesvictor512@gmail.com')->send(new firstmail($mailData));

        return response()->json(['message' => 'reset passwore  done']);
        
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    // public function show($id)
    // {
    //     //
    // }

    // /**
    //  * Update the specified resource in storage.
    //  *
    //  * @param  \Illuminate\Http\Request  $request
    //  * @param  int  $id
    //  * @return \Illuminate\Http\Response
    //  */
    // public function update(Request $request, $id)
    // {
    //     //
    // }

    // /**
    //  * Remove the specified resource from storage.
    //  *
    //  * @param  int  $id
    //  * @return \Illuminate\Http\Response
    //  */
    // public function destroy($id)
    // {
    //     //
    // }
}
