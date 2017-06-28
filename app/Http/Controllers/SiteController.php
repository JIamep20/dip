<?php

namespace App\Http\Controllers;

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
        $users = User::join('messages', function ($j) {
            $j->on('users.id', '=', 'messages.user_id');
        })->get();
        echo 1;
    }
}
