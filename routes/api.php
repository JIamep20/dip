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

    /* UserController */

    Route::get('user', 'UserController@index');
    Route::put('user', 'UserController@update');
    
    /* FriendsController */
    
    // Get list of all frinds for current user
    Route::get('friends', 'FriendController@index');
    // Search users by query string
    Route::get('friends/{query}', 'FriendController@search');
    // Add user to friends by id param
    Route::post('friends/{userId}', 'FriendController@addUser');
    // Delete user from friends by if param
    Route::delete('friends/{userId}', 'FriendController@delete');

    /* Groups Controller */
    Route::get('groups', 'GroupController@index');
    Route::post('groups', 'GroupController@post');
    Route::get('groups/{group}', 'GroupController@get');
    Route::put('groups/{group}', 'GroupController@put');
    Route::delete('groups/{group}', 'GroupController@delete');

    /* Messages controller */

     Route::get('room/{room}/message', 'MessageController@index');
     Route::get('room/{room}/message/{message}', 'MessageController@get');
     Route::post('room/{room}/message', 'MessageController@post');
     Route::put('room/{room}/message/{message}', 'MessageController@post');
     Route::delete('room/{room}/message/{message}', 'MessageController@delete');

    
});

