<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Message
 *
 * @property int $id
 * @property int $user_id
 * @property int $room_id
 * @property string $text
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property string $deleted_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\User[] $users
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Attachment[] $attachments
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Message whereId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Message whereUserId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Message whereRoomId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Message whereText($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Message whereCreatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Message whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Message whereDeletedAt($value)
 * @mixin \Eloquent
 */
class Message extends Model
{
    public function users()
    {
        return $this->belongsToMany(User::class);
    }

    public function attachments()
    {
        return $this->hasMany(Attachment::class);
    }
}
