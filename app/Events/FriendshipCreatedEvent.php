<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class FriendshipCreatedEvent extends BaseEvent
{
    public $friend;

    public function __construct($channels, $friend){
        $this->friend = $friend;
        parent::__construct($channels);
    }
}
