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
    Route::get('friends', 'FriendsController@index');
    // Search users by query string
    Route::get('friends/{query}', 'FriendsController@search');
    // Add user to friends by id param
    Route::post('friends/{userId}', 'FriendsController@addUser');
    // Delete user from friends by if param
    //Route::delete('friends/{userId}', 'FriendsController@delete');

    /* Groups Controller */
    // Route::get('groups', 'GroupsController@index');
    // Route::post('groups', 'GroupsController@post');
    // Route::get('groups/{groupId}', 'GroupsController@get');
    // Route::put('groups/{groupid}', 'GroupsController@put');
    // Route::delete('groups/{groupId}', 'GroupsController@delete');

    /* Messages controller */

    /**
     * Route::get('room/{roomId}/messages', MessagesController@index);
     * Route::get('room/{roomId}/messages/{messageId}', MessagesController@get);
     * Route::post('room/{roomId}/messages', MessagesController@post);
     * Route::put('room/{roomId}/messages/{messageId}', MessagesController@post);
     * Route::delete('room/{roomId}/messages/{messageId}', MessagesController@delete);
     */
    
});

