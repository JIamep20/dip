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
        $faker = Faker\Factory::create();
        $users = \App\Models\User::all();

        $users->each(function (\App\Models\User $user) use ($faker) {
            $user->getAcceptedFriendships()->each(function(\App\Models\Friend $friendship) use ($user, $faker) {
                foreach (range(0, rand(3, 10)) as $i) {
                    $friendship->messages()->create(['user_id' => $user->id, 'text' => $faker->text(10)]);
                }
            });

            /*$user->groups()->each(function ($group) use ($user, $faker) {
                foreach (range(0, rand(3, 10)) as $i) {
                    $group->messages()->create(['user_id' => $user->id, 'text' => $faker->text(10)]);
                }
            });*/
        });
    }
}
