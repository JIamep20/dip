<?php

namespace App\Models;

use Lamer1\LaravelFriendships\Models\Friendship;

class Friend extends Friendship
{
    public function messages()
    {
        return $this->morphMany(Message::class, 'messagable');
    }
}
