<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of the routes that are handled
| by your application. Just tell Laravel the URIs it should respond
| to using a Closure or controller method. Build something great!
|
*/

Route::get('aa', function(){

    event(new \App\Events\SomeEvent());
    //\Illuminate\Support\Facades\Redis::publish('asd', 1);
    return 'event fired';
});

Route::get('aaa', function() {
    return view('aaa');
});

Auth::routes();
Route::get('logout', 'Auth\\LoginController@logout');

Route::get('auth/{service}', 'Auth\\SocialAuth@redirectToProvider')->middleware('guest');
Route::get('auth/{service}/callback', 'Auth\\SocialAuth@handleProviderCallback')->middleware('guest');

Route::group(['middleware' => 'auth'], function () {
    Route::get('', ['as' => 'base', function (Request $request) {
        return Cookie::get('x-access-token') . '<br>' .Auth::user();
    }]);
});



