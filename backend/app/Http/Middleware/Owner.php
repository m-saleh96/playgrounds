<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class Owner
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
        if(auth()->user()->role != 'owner'){
            return response()->json(['message' => 'Unauthorized'], 401);
        }
        return $next($request);
    }
}
