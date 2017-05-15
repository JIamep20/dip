<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Query\Builder;

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
 * @property int $sender_id
 * @property string $sender_type
 * @property int $recepient_id
 * @property string $recepient_type
 * @property string $deleted_at
 * @property-read \Illuminate\Database\Eloquent\Model|\Eloquent $sender
 * @property-read \Illuminate\Database\Eloquent\Model|\Eloquent $recipient
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Friend whereSenderId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Friend whereSenderType($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Friend whereRecepientId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Friend whereRecepientType($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Friend whereDeletedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Friend whereRecepient($model)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Friend whereSender($model)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Friend whereStatus($status = 1)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Friend betweenModels($sender, $recipient)
 * @property int $recipient_id
 * @property bool $status
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Message[] $messages
 * @property-read mixed $users
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Friend whereRecipientId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Friend whereRecipient($model)
 */
class Friend extends Model
{
    use SoftDeletes;
    protected $table = 'friends';

    protected $guarded = ['id', 'created_at', 'updated_at', 'deleted_at'];


    /**
     * Friendship statuses
     */
    const PENDING = 1;
    const ACCEPTED = 2;
    const DENIED = 3;
    const BLOCKED = 4;

    /**
     * @return \Illuminate\Database\Eloquent\Relations\MorphMany
     */
    public function room()
    {
        return $this->morphOne(Room::class, 'roomable');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\MorphMany
     */
    public function messages(){
        return $this->morphMany(Message::class, 'messagable');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function sender()
    {
        return $this->belongsTo(User::class, 'sender_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function recipient() {
        return $this->belongsTo(User::class, 'recipient_id');
    }

    /**
     * @param $query
     * @param $model
     * @return mixed
     */
    public function scopeWhereRecipient($query, $model) {
        return $query->where('recipient_id', $model->getKey());
    }

    public function scopeOrWhereRecipient($query, $model) {
        return $query->orWhere('recipient_id', $model->getKey());
    }

    /**
     * @param $query
     * @param $model
     * @return mixed
     */
    public function scopeWhereSender($query, $model) {
        return $query->where('sender_id', $model->getKey());
    }

    public function scopeOrWhereSender($query, $model) {
        return $query->orWhere('sender_id', $model->getKey());
    }

    /**
     * @param Builder $query
     * @param int $status
     * @return mixed
     */
    public function scopeWhereStatus($query, $status = self::PENDING){
        return $query->where('status', $status);
    }

    /**
     * @param $query
     * @param $sender
     * @param $recipient
     * @return mixed
     */
    public function scopeBetweenModels($query, $sender, $recipient) {
        return $query->where(function ($queryIn) use ($sender, $recipient){
            $queryIn->where(function($q) use ($sender, $recipient) {
                $q->whereSender($sender)->whereRecipient($recipient);
            })
            ->orWhere(function($q) use ($sender, $recipient) {
                $q->whereSender($recipient)->whereRecipient($sender);
            });
        });
    }

    public function getUsersAttribute(){
        return User::where('id', $this->sender_id)->orWhere('id', $this->recipient_id)->get();
    }
}
