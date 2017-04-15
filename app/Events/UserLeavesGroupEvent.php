<?php

namespace App\Events;

use App\Models\Group;
use App\Models\User;
use Illuminate\Support\Collection;

class UserLeavesGroupEvent extends BaseEvent
{
    public $group;
    public $user;
    /**
     * UserLeavesGroupEvent constructor.
     * @param array|Collection $channel Channel to send event
     * @param User $user User that left group
     * @param Group $group
     */
    public function __construct($channel, $group, $user){
        $this->user = $user;
        $this->group = $group;
        parent::__construct($channel->pluck('id')->toArray());
    }
}
