<?php
/**
 * Created by PhpStorm.
 * User: admin
 * Date: 19.03.2017
 * Time: 1:20
 */

namespace App\Events;


use App\Models\Group;

class GroupUpdateEvent extends BaseEvent
{
    public $group;

    /**
     * GroupUpdateEvent constructor.
     * @param array|null $channel
     * @param Group $group
     */
    public function __construct($channel, $group){
        $this->group = $group;
        parent::__construct($channel);
    }
}