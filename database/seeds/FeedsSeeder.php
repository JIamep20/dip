<?php

use Illuminate\Database\Seeder;

class FeedsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = \App\Models\User::all();
        $users->each(function ($item) {
            factory(\App\Models\Feed::class, rand(3, 5))->create(['user_id' => $item->id]);
        });
    }
}
