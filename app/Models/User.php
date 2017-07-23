<?php

namespace App\Models;

use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Lamer1\LaravelFriendships\Traits\Friendshipable;


class User extends Authenticatable
{
    use Notifiable;
    use SoftDeletes;
    use Friendshipable;
    
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

    public function owns($model) {
        return $this->getKey() == $model->user_id;
    }
    
    public function groups()
    {
        return $this->belongsToMany(Group::class);
    }
    
    public function feeds()
    {
        return $this->hasMany(Feed::class);
    }

    public function messages()
    {
        return $this->hasMany(Message::class);
    }

    /**
     * @return mixed
     */
    public function getFriendshipClassName()
    {
        return Friend::class;
    }

    public static function findByEmail($email)
    {
        return static::where('email', $email)->first();
    }


}
