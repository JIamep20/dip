<?php

namespace App\Models;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Facades\Auth;

/**
 * App\Models\User
 *
 * @property int $id
 * @property string $name
 * @property string $email
 * @property string $password
 * @property string $deleted_at
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Group[] $groups
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Message[] $messages
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Friend[] $friendsOfMine
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Friend[] $friendOf
 * @property-read mixed $friends
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection|\Illuminate\Notifications\DatabaseNotification[] $notifications
 * @method static \Illuminate\Database\Query\Builder|\App\Models\User whereId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\User whereName($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\User whereEmail($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\User wherePassword($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\User whereDeletedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\User whereCreatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\User whereUpdatedAt($value)
 * @mixin \Eloquent
 * @method static \Illuminate\Database\Query\Builder|\App\Models\User searchUser($name)
 */
class User extends Authenticatable
{
    use Notifiable;
    use SoftDeletes;
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = ['id', 'created_at', 'updated_at', 'deleted_at'];
    
    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /* Static class methods */
    public static function findByEmail($email)
    {
        $_this = new self;
        try {
            $user = $_this->withTrashed()->where('email', $email)->firstOrFail();
        } catch (ModelNotFoundException $e) {
            return null;
        }
        return $user;
    }

    public function owns($model) {
        return $this->getKey() == $model->user_id;
    }

    /* Model relations */
    public function groups()
    {
        return $this->belongsToMany(Group::class);
    }

    public function messages()
    {
        return $this->hasMany(Message::class);
    }

    public function friendsOfMine()
    {
        return $this->hasMany(Friend::class, 'sender_id');
    }

    public function friendOf()
    {
        return $this->hasMany(Friend::class, 'recipient_id');
    }

    public function friends()
    {
        return $this->hasMany(Friend::class, 'sender_id');
    }

    /* Friendship methods */
    public function beFriend($recipient)
    {
        if (!$this->canBeFriend($recipient)) {
            return false;
        }

        $friendship = new Friend();
        $friendship->recipient_id = $recipient->id;
        $this->friends()->save($friendship);

        return $friendship;
    }

    public function canBeFriend($recipient)
    {
        if ($this->hasBlocked($recipient)) {
            $this->unblockFriend($recipient);
            return true;
        }

        if ($this->isBlockedBy($recipient)) {
            return false;
        }

        if ($this->areFriends($recipient)) {
            return false;
        }

        if ($friendship = $this->getFriendship($recipient)) {
            if ($friendship->status != Friend::DENIED) {
                return false;
            }
        }

        return true;
    }

    /**
     * @param $recipient
     * @return mixed
     */
    public function hasBlocked(User $recipient)
    {
        return $this->friends()->whereRecipient($recipient)->whereStatus(Friend::BLOCKED)->exists();
    }

    public function unblockFriend($recipient)
    {
        return $this->findFriendship($recipient)->update(['status' => Friend::PENDING]);
    }

    /**
     * @param User $recipient
     * @return Friend|\Illuminate\Database\Query\Builder
     */
    private function findFriendship(User $recipient)
    {
        return Friend::betweenModels($this, $recipient);
    }

    public function isBlockedBy(User $recipient)
    {
        return $recipient->hasBlocked($this);
    }

    public function areFriends($recipient)
    {
        return $this->findFriendship($recipient)->exists();
    }

    public function getFriendship($recipient)
    {
        return $this->findFriendship($recipient)->first();
    }

    public function unFriend(User $recipient)
    {
        return $this->findFriendship($recipient)->delete();
    }

    public function hasFriendRequestFrom($recipient)
    {
        return $this->findFriendship($recipient)->whereSender($recipient)->whereStatus(Friend::PENDING)->exists();
    }

    public function hasSendFriendRequestTo($recipient)
    {
        return $this->findFriendship($recipient)->whereSender($this)->whereStatus(Friend::PENDING)->exists();
    }

    public function isFriendWith($recipient)
    {
        return $this->findFriendship($recipient)->whereStatus(Friend::ACCEPTED)->exists();
    }

    public function acceptFriendRequest(User $recipient)
    {
        return $this->findFriendship($recipient)->whereRecipient($this)->update(['status' => Friend::ACCEPTED]);
    }

    public function denyFriendRequest($recipient)
    {
        return $this->findFriendship($recipient)->whereRecipient($this)->update(['status' => Friend::DENIED]);
    }

    public function blockFriend($recipient)
    {
        return $this->findFriendship($recipient)->update(['status' => Friend::BLOCKED]);
    }

    public function getAllFriendships()
    {
        return $this->findFriendships(null)->get();
    }

    public function findFriendships($status = null)
    {
        /*$query = Friend::where(function ($q) {
            $q->whereSender($this);

        })->orWhere(function ($q) {
            $q->whereRecipient($this);
        });*/

        $query = Friend::where(function($q) {
            $q->whereSender($this)
                ->orWhereRecipient($this);
        });

        if (!is_null($status)) {
            $query->whereStatus($status);
        }

        return $query;
    }

    public function getPendingFriendships()
    {
        return $this->findFriendships(Friend::PENDING)->get();
    }

    public function getAcceptedFriendships()
    {
        return $this->findFriendships(Friend::ACCEPTED)->get();
    }

    public function getDeniedFriendships()
    {
        return $this->findFriendships(Friend::DENIED)->get();
    }

    public function getBlockedFriendships()
    {
        return $this->findFriendships(Friend::BLOCKED)->get();
    }

    public function getFriendRequests()
    {
        return Friend::whereRecipient($this)->whereStatus(Friend::PENDING)->get();
    }

    /**
     * @param int $status
     * @return \Illuminate\Database\Eloquent\Collection|static[]
     */
    public function getFriends($status = Friend::ACCEPTED)
    {
        return $this->getFriendsQueryBuilder($status)->get();
    }

    private function getFriendsQueryBuilder($status = Friend::ACCEPTED)
    {
        $friendships = $this->findFriendships($status)->get(['sender_id', 'recipient_id']);
        $recipients = $friendships->pluck('recipient_id')->all();
        $senders = $friendships->pluck('sender_id')->all();
        return $this->where('id', '<>', $this->getKey())->whereIn('id', array_merge($recipients, $senders));
    }

    public function getFriendsCount()
    {
        return $this->findFriendships(Friend::ACCEPTED)->count();
    }

    public function scopeSearchUser($query, $name){
        $user = Auth::user();
        return $query->where('name', 'like', "%$name%")
            ->whereDoesntHave('friendOf', function ($q) use($user) {
                $q->where('sender_id', $user->id)->orWhere('recipient_id', $user->id);
            })
            ->whereDoesntHave('friendsOfMine', function ($q) use ($user) {
                $q->where('sender_id', $user->id)->orWhere('recipient_id', $user->id);
            });
    }
}
