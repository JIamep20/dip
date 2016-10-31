<?php

namespace App\Http\Controllers\Auth;

use App\User;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Socialite;

class SocialAuth extends Controller
{
    public function redirectToProvider($service)
    {
        try {
            return Socialite::driver($service)->redirect();
        } catch (\InvalidArgumentException $ex) {
            return redirect()->guest('login');
        }
    }

    public function handleProviderCallback($service)
    {
        $user = Socialite::driver($service)->user();
        if(!$systemUser = User::findByEmail($user->getEmail())) {
            $systemUser = User::create(['name' => $user->getName() . '('.$user->getNickname().')', 'email' => $user->getEmail(), 'password' => bcrypt(Str::random(10))]);
        }
        Auth::login($systemUser);
        return redirect()->route('base');
    }
}
