<?php

namespace App\Policies;

use App\Models\Friend;
use App\Models\Group;
use App\Models\Message;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class MessagePolicy
{
    use HandlesAuthorization;


    public function getFriendshipMessages(User $user, Friend $friend){
        return $user->findFriendships(Friend::ACCEPTED)->where('id', $friend->id)->exists();
    }
    
    public function getFriendshipMessage(User $user, Friend $friend, Message $message){
        return $user->findFriendships(Friend::ACCEPTED)->where('id', $friend->id)->exists();
    }

    public function createFriendshipMessage(User $user, Friend $friend){
        return $user->findFriendships(Friend::ACCEPTED)->where('id', $friend->id)->exists();
    }
    
    public function updateFriendshipMessage(User $user, Friend $friend, Message $message)
    {
        return $friend->messages()->where('id', $message->id)->exists() && $user->owns($message);
    }

    public function destroyFriendshipMessage(User $user, Friend $friend, Message $message)
    {
        return $friend->messages()->where('id', $message->id)->exists() && $user->owns($message);
    }
}
