<?php

namespace App\Policies;

use App\Models\Friend;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class FriendPolicy
{
    use HandlesAuthorization;

    public function deleteFriendship(User $user, Friend $friend){
        return $user->id == $friend->user_id || $user->id == $friend->friend_id;
    }
}
