<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class sameplayer
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        if(auth()->user()->role != 'player'||auth()->user()->id !=$request->user_id){
            return response()->json(['message' =>"you mast same player for delete or update review" ], 401);
        }
        return $next($request);
    }
}
