<?php

namespace App\Providers;

use App\Guards\JwtGuard;
use App\Models\Friend;
use App\Models\Group;
use App\Models\Message;
use App\Policies\FriendPolicy;
use App\Policies\GroupPolicy;
use App\Policies\MessagePolicy;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        Friend::class => FriendPolicy::class,
        Message::class => MessagePolicy::class,
        Group::class => GroupPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        Auth::extend('jwt', function ($app, $name, array $config){
            return new JwtGuard(Auth::createUserProvider($config['provider']));
        });
    }
}
