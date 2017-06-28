<?php

use Illuminate\Http\Request;

Route::group(['middleware' => ['auth']], function () {

    /* FeedsController */
    Route::get('feed', 'FeedController@index');
    
    /* UserController */

    Route::get('user', 'UserController@index');
    Route::put('user', 'UserController@update');
    // Пошук користувачів
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

    /* Контролер групових повідомлень */

    Route::get('group/{group}/message', 'MessageController@groupIndex');
    Route::get('group/{group}/message/{message}', 'MessageController@groupShow');
    Route::post('group/{group}/message', 'MessageController@groupStore');
    Route::put('group/{group}/message/{message}', 'MessageController@groupUpdate');
    Route::delete('group/{group}/message/{message}', 'MessageController@groupDestroy');

    /* Контролер повідомлень товаришу */

     Route::get('friend/{friend}/message', 'MessageController@friendIndex');
     Route::get('friend/{friend}/message/{message}', 'MessageController@friendShow');
     Route::post('friend/{friend}/message', 'MessageController@friendStore');
     Route::put('friend/{friend}/message/{message}', 'MessageController@friendUpdate');
     Route::delete('friend/{friend}/message/{message}', 'MessageController@friendDestroy');
});

