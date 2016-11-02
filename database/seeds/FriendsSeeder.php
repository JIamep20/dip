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
        \App\Models\User::all()->each(function($item){
            $friend = factory(\App\Models\Friend::class)->create([
                'user_id' => factory(\App\Models\User::class)->create()->id,
                'friend_id' => $item->id
            ]);

            $friend->room()->save(factory(\App\Models\Room::class)->create());
        });
    }
}
