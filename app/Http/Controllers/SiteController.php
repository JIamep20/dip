<?php

namespace App\Http\Controllers;

use Illuminate\Auth\Access\AuthorizationException;

class SiteController extends Controller
{
    public function main()
    {
        return view('main');
    }

    public function webpackView()
    {
        if (env('APP_DEBUG')) {
            return view('webpackView');
        } else {
            throw new AuthorizationException('', 403);
        }
    }
}
