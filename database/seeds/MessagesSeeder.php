<?php

use Illuminate\Database\Seeder;

class MessagesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = \App\Models\User::all();
        $rooms = \App\Models\Room::all();
        
        $users->map(function ($item) use ($rooms){
            factory(\App\Models\Message::class, rand(1, 6))->create(['user_id' => $item->id, 'room_id' => $rooms->random()->id]);
        });
    }
}
