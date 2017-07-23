<?php

namespace App\Http\Controllers;

use App\Models\Friend;
use App\Models\User;
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

    public function asd()
    {
        dd(factory(Friend::class, 5)->make()->each(function ($item) {$item->sender_id = 1;}));
    }
}
