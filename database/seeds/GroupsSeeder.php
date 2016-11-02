<?php

use Illuminate\Database\Seeder;
use App\Models\Group;
use App\Models\User;

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
        $users = User::all();

        $groups->each(function ($item) use ($users) {
            foreach ($users as $user) {
                if(rand(0, 1)) {
                    $item->users()->attach($user);
                }
            }
        });
    }
}
