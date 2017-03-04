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

            factory(\App\Models\User::class, rand(3, 7))->create()->each(function ($f) use ($item) {
//                $friendRelation = factory(\App\Models\Friend::class)->create([
//                    'user_id' => $f->id,
//                    'friend_id' => $item->id
//                ]);
//
//                $friendRelation->room()->save(factory(\App\Models\Room::class)->create());
                //echo $item;
                $item->beFriend($f);
            });

//            $friend = factory(\App\Models\Friend::class)->create([
//                'user_id' => factory(\App\Models\User::class)->create()->id,
//                'friend_id' => $item->id
//            ]);
//
//            $friend->room()->save(factory(\App\Models\Room::class)->create());
        });
    }
}
