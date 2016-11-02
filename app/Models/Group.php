<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    public function users()
    {
        return $this->belongsToMany(User::class);
    }

    public function room()
    {
        return $this->morphMany(Room::class, 'roomable');
    }
}
