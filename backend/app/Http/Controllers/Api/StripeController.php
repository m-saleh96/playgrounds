<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Stripe;

class StripeController extends Controller
{
    //

    public function StripePost(Request $request)
    {
        try {
            $stripe = new \Stripe\StripeClient(
                env('STRIPE_SECRET')
            );
            // $res = $stripe->tokens->create([
            //     'card' => [
            //         'number' => $request->number,
            //         'exp_month' => $request->exp_month,
            //         'exp_year' => $request->exp_year,
            //         'cvc' => $request->cvc,
            //     ],
            // ]);

            Stripe\Stripe::setApiKey(env('STRIPE_SECRET'));
           $response =  $stripe->charges->create([
                'amount' => $request->amount,
                'currency' => 'usd',
                'source' => $request->token,
                'description' => $request->description,
            ]);

            return response()->json($response->status, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}