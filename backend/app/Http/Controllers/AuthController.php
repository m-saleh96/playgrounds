<?php

namespace App\Http\Controllers;

use App\Models\User;
use Mail;
use App\Mail\firstmail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
class AuthController extends Controller
{
    //
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */




     public function sendmail(Request $request){
        $mailData=[
            'title' => 'mail from title',
            'body' => 'This is test body from mail'];
        // Mail::to('gergesvictor512@gmail.com')->send(new testmail($mailData));
        Mail::to('gergesvictor512@gmail.com')->send(new firstmail($mailData));

        return response()->json(['message' => 'Email send successfully']);
    }
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login','register','sendmail']]);
    }

    public function register2(){
        return response()->json(['message' => 'a']);
    }
    public function register(Request $request)
    {
        // dd($request->all());
        // return response()->json(['message' => $request->all()]);
        $validator = Validator::make($request->all(),[
            'name' => 'required|string',
            'email' => 'required|string|email|unique:users',
            'phone'=> 'required|string',
            'role'=> 'required|string|in:player,owner',
            'password' => 'required|string'
        ]);
        if($validator->fails()){
            return response()->json($validator->errors(),400);
        }  
        
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone'=> $request->phone,
            'role'=> $request->role,
            'password' => \Hash::make($request->password),
        ]);

        return response()->json([
            'message' => 'User created successfully',
            'user' => $user
        ]);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login()
    {
        $credentials = request(['email', 'password']);

        if (! $token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        // $token = auth()->claims(['foo' => 'bar'])->attempt($credentials);
        return  $this->respondWithToken($token);
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json(auth()->user());
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'user'=>auth()->user()
        ]);
    }
}
