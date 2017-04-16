<?php

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/

$factory->define(\App\Models\User::class, function (Faker\Generator $faker) {
    static $password;

    return [
        'name' => $faker->name,
        'email' => $faker->unique()->safeEmail,
        'password' => $password ?: $password = bcrypt('secret'),
    ];
});

$factory->define(\App\Models\Group::class, function (\Faker\Generator $faker) {
    return [
        'name' => $faker->name
    ];
});

$factory->define(\App\Models\Friend::class, function (\Faker\Generator $faker) {
    return [
        'accepted' => random_int(0, 1)
    ];
});

$factory->define(\App\Models\Message::class, function (\Faker\Generator $faker) {
    return [
        'text' => $faker->text(20)
    ];
});
$factory->define(\App\Models\Attachment::class, function (\Faker\Generator $faker) {
    return [
        'url' => $faker->text(10),
        'type' => $faker->text(10)
    ];
});

$factory->define(\App\Models\Feed::class, function (\Faker\Generator $faker) {
    return [
        'text' => $faker->text(25)
    ];
});
//$factory->define(\App\Models\Group::class, function (\Faker\Generator $faker){});