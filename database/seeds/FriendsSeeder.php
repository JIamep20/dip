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
                $friendship = $item->beFriend($f);
                $friendship->room()->save(factory(\App\Models\Room::class)->create());
                $friendship->update(['status' => rand(\App\Models\Friend::PENDING, \App\Models\Friend::BLOCKED)]);
            });
        });
    }
}
