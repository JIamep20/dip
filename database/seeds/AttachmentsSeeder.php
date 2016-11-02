<?php

use Illuminate\Database\Seeder;

class AttachmentsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\Message::all()->each(function($item){
            if(rand(0, 1)) {
                $item->attachments()->save(factory(\App\Models\Attachment::class)->make());
            }
        });
    }
}
