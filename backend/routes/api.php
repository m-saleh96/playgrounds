<?php

use App\Http\Controllers\Api\categoryController;
use App\Http\Controllers\Api\PlaygroundController;
use App\Http\Controllers\Api\ReviewController;
use App\Http\Controllers\Api\userController;
use App\Http\Controllers\AuthController;
use App\Models\Playground;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
    Route::post('refresh', 'refresh');
    Route::get('a','a');
});

Route::get('playground/search',[PlaygroundController::class,'search']);


Route::resource('user', userController::class);

//should be logged in to access
Route::middleware('auth:api')->group(function () {
    Route::resource('review', ReviewController::class)->except(['index', 'show']);
});

//shoudl be logged in as admin to access
Route::middleware(['auth:api', 'admin'])->group(function () {
    Route::put('playground/changeStatus/{playground}',[PlaygroundController::class,'changeStates']);
    Route::get('playground/pending',[PlaygroundController::class,'pending']);
    Route::resource('category', categoryController::class)->except(['index', 'show']);
});

//should be logged in as owner to access
Route::middleware(['auth:api', 'owner'])->group(function () {
    Route::resource('playground', PlaygroundController::class)->except(['index', 'show']);

});

Route::resource('review', ReviewController::class, ['only' => ['index', 'show']]);
Route::resource('category', categoryController::class)->only(['index', 'show']);
Route::resource('playground', PlaygroundController::class)->only(['index', 'show']);

