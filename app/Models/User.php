<?php

namespace App\Models;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

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

    public function rooms()
    {
        return $this->belongsToMany(Room::class);
    }

    public function messages()
    {
        return $this->hasMany(Message::class);
    }
    
    public function friends()
    {
        return $this->hasMany(Friend::class);
    }

    public function friendsOfMine()
    {
        return $this->belongsToMany(User::class, 'friends', 'user_id', 'friend_id')
            ->wherePivot('accepted', '=', 1) // to filter only accepted
            ->withPivot('accepted'); // or to fetch accepted value
    }

    public function friendOf()
    {
        return $this->belongsToMany(User::class, 'friends', 'friend_id', 'user_id')
        ->wherePivot('accepted', '=', 1)
        ->withPivot('accepted');
    }

    // accessor allowing you call $user->friends
    public function getFriendsAttribute()
    {
        if ( ! array_key_exists('friends', $this->relations)) $this->loadFriends();

        return $this->getRelation('friends');
    }

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
