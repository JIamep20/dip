<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class AddedToGroupNotificationEvent extends BaseEvent
{
    public $group;
    public $users;

    public function __construct($channel, $group){
        $this->group = $group;
        $this->users = $group->users()->get();
        parent::__construct($channel);
    }
}
