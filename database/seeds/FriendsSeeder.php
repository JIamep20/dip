<?php

use Illuminate\Database\Seeder;

class FriendsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\User::all()->each(function (\App\Models\User $item) {

            factory(\App\Models\User::class, rand(10, 15))->create()->each(function ($f) use ($item) {
                $item->makeFriendship($f, \App\Models\Friend::STATUS_ACCEPTED);
            });
        });
    }
}
