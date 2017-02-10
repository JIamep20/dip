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

Auth::routes();
Route::get('logout', 'Auth\\LoginController@logout');

Route::get('auth/{service}', 'Auth\\SocialAuth@redirectToProvider')->middleware('guest');
Route::get('auth/{service}/callback', 'Auth\\SocialAuth@handleProviderCallback')->middleware('guest');

Route::group(['middleware' => ['auth']], function () {
    Route::get('/', ['as' => 'base', function (Request $request) {
        return view('main');
    }]);
    Route::get('d', function(){
        return view('webpackView');
    });

    Route::get('ajax', function() {
        return \Illuminate\Support\Facades\Auth::user()->friends;
//    if(Request::ajax()){
//        return "AJAX";
//    }
//    return "HTTP";
    });
});

Route::get('fire', function() {
    return event(new \App\Events\SomeEvent());
});

Route::get('dd', function(){
    return view('webpackView');
});

Route::get('s', function() {
    return view('sockets');
})->middleware('auth-dev');