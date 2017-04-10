<?php
/**
 * Created by PhpStorm.
 * User: admin
 * Date: 19.03.2017
 * Time: 1:18
 */

namespace App\Events;


use App\Models\Message;
use App\Models\User;

class FriendshipMessageEvent extends BaseEvent
{
    protected
        $message,
        $friend
    ;

    /**
     * NewFriendshipMessageEvent constructor.
     * @param array|null $channel
     * @param Message $message
     * @param User $friend
     */
    public function __construct($channel, $message, $friend){
        $this->message = $message;
        $this->friend = $friend;
        parent::__construct($channel);
    }

    public function broadcastWith() {
        return [
            'friend' => $this->friend,
            'message' => $this->message
        ];
    }
}