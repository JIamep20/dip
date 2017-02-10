<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Friend
 *
 * @property int $id
 * @property int $user_id
 * @property int $friend_id
 * @property bool $accepted
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Room[] $room
 * @property-read \App\Models\User $initiator
 * @property-read \App\Models\User $invited
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Friend whereId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Friend whereUserId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Friend whereFriendId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Friend whereAccepted($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Friend whereCreatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Friend whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Friend extends Model
{
    protected $table = 'friends';

    protected $fillable = ['user_id', 'friend_id', 'room_id'];

    public function room()
    {
        return $this->morphMany(Room::class, 'roomable');
    }

    public function initiator()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function invited() {
        return $this->belongsTo(User::class, 'friend_id');
    }
}
