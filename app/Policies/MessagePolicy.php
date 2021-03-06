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
    
    public function getFriendshipMessage(User $user, Friend $friend, Message $message){
        return $user->findFriendships(null)->where('sender_id', $friend->id)->orWhere('recipient_id', $friend->id)->exists() && $friend->messages()->where('id', $message->id)->exists();
    }
    
    public function updateFriendshipMessage(User $user, Friend $friend, Message $message)
    {
        return $friend->messages()->where('id', $message->id)->exists() && $user->owns($message);
    }

    public function destroyFriendshipMessage(User $user, Friend $friend, Message $message)
    {
        return $friend->messages()->where('id', $message->id)->exists() && $user->owns($message);
    }
    
    public function getGroupMessages(User $user, Group $group){
        return !!$group->users()->find($user->id);
    }

    public function getGroupMessage(User $user, Group $group, Message $message)
    {
        return !!$group->users()->find($user->id) && $group->messages()->where('id', $message->id)->exists();
    }

    public function createGroupMessage(User $user, Group $group){
        return !!$group->users()->find($user->id);
    }

    public function updateGroupMessage(User $user, Group $group, Message $message){
        return $user->owns($message) && $group->messages()->where('id', $message->id)->exists();
    }
}
