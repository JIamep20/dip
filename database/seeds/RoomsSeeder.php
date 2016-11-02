<?php

use Illuminate\Database\Seeder;

class RoomsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\Group::all()->each(function($item){
            $room = factory(\App\Models\Room::class)->make();
            $item->room()->save($room);
        });
    }
}
