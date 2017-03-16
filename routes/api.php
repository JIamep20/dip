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

    /* UserController */

    Route::get('user', 'UserController@index');
    Route::put('user', 'UserController@update');
    
    /* FriendController */
    
    // Get list of all frinds for current user
    Route::get('friend', 'FriendController@index');
    // Search users by query string
    Route::get('friend/{query}', 'FriendController@search');
    // Add user to friends by users's id
    Route::post('friend/{user}', 'FriendController@addUser');
    // Delete user from friends by user's id
    Route::delete('friend/{user}', 'FriendController@delete');

    /* Group Controller */
    Route::resource('group', 'GroupController', [
        'except' => ['create', 'edit']
    ]);

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

