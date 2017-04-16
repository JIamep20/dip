<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call(UsersSeeder::class);
        $this->call(FriendsSeeder::class);
        $this->call(GroupsSeeder::class);
        $this->call(MessagesSeeder::class);
        $this->call(AttachmentsSeeder::class);
        $this->call(FeedsSeeder::class);
    }
}
