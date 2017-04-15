<?php

namespace App\Events;

class FriendshipDeletedEvent extends BaseEvent
{
    public $friend;

    /**
     * FriendshipDeletedEvent constructor.
     * @param array|null $channel
     * @param $friend
     */
    public function __construct($channel, $friend){
        $this->friend = $friend;
        parent::__construct($channel);
    }
}
