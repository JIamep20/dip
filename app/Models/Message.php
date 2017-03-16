<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

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
 * @property-read \App\Models\User $user
 * @property int $messagable_id
 * @property string $messagable_type
 * @property-read \Illuminate\Database\Eloquent\Model|\Eloquent $messagable
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Message whereMessagableId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Message whereMessagableType($value)
 */
class Message extends Model
{
    use SoftDeletes;
    
    protected $fillable = ['text'];
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function attachments()
    {
        return $this->hasMany(Attachment::class);
    }

    public function messagable()
    {
        return $this->morphTo();
    }
}
