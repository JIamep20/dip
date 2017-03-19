<?php

namespace App\Events;

class FriendshipDeletedEvent extends BaseEvent
{
    public $friendship;

    /**
     * FriendshipDeletedEvent constructor.
     * @param array|null $channel
     * @param $friendship
     */
    public function __construct($channel, $friendship){
        $this->friendship = $friendship;
        parent::__construct($channel);
    }
}
