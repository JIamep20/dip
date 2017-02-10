<?php

namespace App\Models;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

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
 * @property string $artya
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
 * @method static \Illuminate\Database\Query\Builder|\App\Models\User whereArtya($value)
 * @mixin \Eloquent
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
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    public static function findByEmail($email)
    {
        $_this = new self;
        try {
            $user = $_this->withTrashed()->where('email',$email)->firstOrFail();
        }
        catch  (ModelNotFoundException $e){
            return null;
        }
        return $user;
    }

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
        return $this->hasMany(Friend::class)->with('room', 'invited');
    }
    
    public function friendOf()
    {
        return $this->hasMany(Friend::class, 'friend_id')->with('room', 'initiator');
    }

//    public function friends()
//    {
//        return $this->belongsToMany(User::class, 'friends', 'user_id', 'friend_id')
//            // if you want to rely on accepted field, then add this:
//            ->wherePivot('accepted', '=', 1);
//    }

//    public function friendsOfMine()
//    {
//        return $this->belongsToMany(User::class, 'friends', 'user_id', 'friend_id')
//            ->wherePivot('accepted', '=', 1) // to filter only accepted
//            ->withPivot('accepted', 'id'); // or to fetch accepted value
//    }
//
//    public function friendOf()
//    {
//        return $this->belongsToMany(User::class, 'friends', 'friend_id', 'user_id')
//        ->wherePivot('accepted', '=', 1)
//        ->withPivot('accepted', 'id');
//    }
//
//    // accessor allowing you call $user->friends
    public function getFriendsAttribute()
    {
        if ( ! array_key_exists('friends', $this->relations)) $this->loadFriends();

        return $this->getRelation('friends');
    }
//
    protected function loadFriends()
    {
        if ( ! array_key_exists('friends', $this->relations))
        {
            $friends = $this->mergeFriends();

            $this->setRelation('friends', $friends);
        }
    }

    protected function mergeFriends()
    {
        return $this->friendsOfMine->merge($this->friendOf);
    }

    /**
     * // access all friends
    $user->friends; // collection of unique User model instances

    // access friends a user invited
    $user->friendsOfMine; // collection

    // access friends that a user was invited by
    $user->friendOf; // collection

    // and eager load all friends with 2 queries
    $usersWithFriends = User::with('friendsOfMine', 'friendOf')->get();

    // then
    $users->first()->friends; // collection

    // Check the accepted value:
    $user->friends->first()->pivot->accepted;
     */
}
