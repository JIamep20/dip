<?php

use Illuminate\Database\Seeder;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach (range('a', 'z') as $i) {
            factory(\App\Models\User::class)->create([
                'email' => 'tester' . $i . '@example.com',
                'password' => bcrypt('tester' . $i)
            ]);
        }
        factory(\App\Models\User::class, 3)->create();
    }
}
