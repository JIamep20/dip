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

Route::get('', function (Request $request) {
    //return Cookie::get('access-token') . ' + ' . (new \Lcobucci\JWT\Parser())->parse((string) Cookie::get('access-token'))->getClaim('email');
});

Auth::routes();
Route::get('logout', 'Auth\\LoginController@logout');
Route::get('asd', function() {return Auth::user();});

//Route::get('', function() {
//    dd($_COOKIE);
//    return view('home');
//});
