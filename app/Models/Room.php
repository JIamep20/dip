<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Room extends Model
{
    use SoftDeletes;

    protected $fillable = ['name', 'friends_room'];

    public function messages()
    {
        return $this->hasMany(Message::class);
    }

    public function roomable()
    {
        return $this->morphTo();
    }
}
