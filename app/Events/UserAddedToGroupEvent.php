<?php

namespace App\Events;

use Illuminate\Support\Collection;

class UserAddedToGroupEvent extends BaseEvent
{
    public $user, $group;
    /**
     * UserAddedToGroupEvent constructor.
     * @param array|Collection $channel
     * @param $user
     * @param $group
     */
    public function __construct($channel, $user, $group){
        $this->user = $user;
        $this->group = $group;
        parent::__construct($channel->pluck('id'));
    }
}
