<?php

use Illuminate\Database\Seeder;
use App\Models\Group;
class GroupsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(Group::class, 20)->create();
        $groups = Group::all();
        $users = \App\Models\User::all();

        $groups->map(function ($item) use ($users) {
            foreach ($users as $user) {
                if(rand(0, 1)) {
                    $item->users()->attach($user);
                }
            }

            $room = \App\Models\Room::create(['name' => '123']);
            $item->room()->save($room);
        });
    }
}
