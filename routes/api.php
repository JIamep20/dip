<?php

use Illuminate\Http\Request;

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


Route::group(['middleware' => ['auth']], function () {
//    Route::get('/user', function () {
//        return Auth::user();
//    });
    
    Route::get('user', 'UserController@index');
    Route::put('user', 'UserController@update');

    Route::resource('friends', 'FriendsController');
});

