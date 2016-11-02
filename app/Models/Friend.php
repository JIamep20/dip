<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Friend extends Model
{
    protected $table = 'friends';

    protected $fillable = ['user_id', 'friend_id', 'room_id'];

    public function room()
    {
        return $this->morphMany(Room::class, 'roomable');
    }
}
