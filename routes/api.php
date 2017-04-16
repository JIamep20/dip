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

    /* FeedsController */
    Route::get('feed', 'FeedController@index');
    
    /* UserController */

    Route::get('user', 'UserController@index');
    Route::put('user', 'UserController@update');
    // Search users by query string
    Route::get('user/{query}', 'UserController@search');

    /* FriendController */
    
    Route::get('friend', 'FriendController@index');
    Route::get('friend/{friend}', 'FriendController@show');
    Route::post('friend/{friend}', 'FriendController@store');
    Route::put('friend/{friend}', 'FriendController@update');
    Route::delete('friend/{friend}', 'FriendController@destroy');

    /* Group Controller */
    Route::resource('group', 'GroupController', [
        'except' => ['create', 'edit']
    ]);
    Route::get('group/{group}/adduser/{user}', 'GroupController@addUserToGroup');
    Route::get('group/{group}/leave', 'GroupController@userLeavesGroup');

    /* Group messages controller */

    Route::get('group/{group}/message', 'MessageController@groupIndex');
    Route::get('group/{group}/message/{message}', 'MessageController@groupShow');
    Route::post('group/{group}/message', 'MessageController@groupStore');
    Route::put('group/{group}/message/{message}', 'MessageController@groupUpdate');
    Route::delete('group/{group}/message/{message}', 'MessageController@groupDestroy');

    /* Friendship message controller */

     Route::get('friend/{friend}/message', 'MessageController@friendIndex');
     Route::get('friend/{friend}/message/{message}', 'MessageController@friendShow');
     Route::post('friend/{friend}/message', 'MessageController@friendStore');
     Route::put('friend/{friend}/message/{message}', 'MessageController@friendUpdate');
     Route::delete('friend/{friend}/message/{message}', 'MessageController@friendDestroy');
});

