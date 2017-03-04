<?php

namespace App\Policies;

use App\Models\Message;
use App\Models\Room;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class MessagePolicy
{
    use HandlesAuthorization;

    public function retrieveRoomMessages(User $user, Room $room) {
        return !!$room->roomable()->users->where('id', $user->id)->first();
    }
    
    public function retrieveOneRoomMessage(User $user, Room $room) {
        return !!$room->roomable()->users->where('id', $user->id)->first();
    }

    public function postMessage(User $user, Room $room) {
        return !!$room->roomable()->users->where('id', $user->id)->first();
    }

    public function putMessage(User $user, Room $room) {
        return !!$room->roomable()->users->where('id', $user->id)->first();
    }

    public function deleteMessage(User $user, Message $message) {
        return $message->user()->first()->id == $user->id;
    }
}
