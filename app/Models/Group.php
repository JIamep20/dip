<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Group
 *
 * @property int $id
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\User[] $users
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Room[] $room
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Group whereId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Group whereCreatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Group whereUpdatedAt($value)
 * @mixin \Eloquent
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Message[] $messages
 */
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

    public function messages(){
        return $this->morphMany(Message::class, 'messagable');
    }
}
