<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Stripe, Mailgun, SparkPost and others. This file provides a sane
    | default location for this type of information, allowing packages
    | to have a conventional place to find your various credentials.
    |
    */

    'mailgun' => [
        'domain' => env('MAILGUN_DOMAIN'),
        'secret' => env('MAILGUN_SECRET'),
    ],

    'ses' => [
        'key' => env('SES_KEY'),
        'secret' => env('SES_SECRET'),
        'region' => 'us-east-1',
    ],

    'sparkpost' => [
        'secret' => env('SPARKPOST_SECRET'),
    ],

    'stripe' => [
        'model' => App\User::class,
        'key' => env('STRIPE_KEY'),
        'secret' => env('STRIPE_SECRET'),
    ],

    'github' => [
        'client_id' => '9db686f02baadf75bc5f',
        'client_secret' => '9563448c2efc4b3b902aef4119387c69831da925',
        'redirect' => env('APP_URL') . 'auth/github/callback',
    ],
    
    'google' => [
        'client_id' => '173599767946-eja7jvbq9e42v2c8g7q4oph9r2a8ol7p.apps.googleusercontent.com',
        'client_secret' => 'JXihVmQ3qjRVt27Zk-KPArVC',
        'redirect' => env('APP_URL') . 'auth/google/callback',
    ],

];
