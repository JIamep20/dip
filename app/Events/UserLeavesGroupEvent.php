<?php

namespace App\Events;

use App\Models\Group;
use App\Models\User;

class UserLeavesGroupEvent extends BaseEvent
{
    public $group;
    public $user;
    /**
     * UserLeavesGroupEvent constructor.
     * @param array|null $channel Channel to send event
     * @param User $user User that left group
     * @param Group $group
     */
    public function __construct($channel, $user, $group){
        $this->user = $user;
        $this->group = $group;
        parent::__construct($channel);
    }
}
