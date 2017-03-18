<?php
/**
 * Created by PhpStorm.
 * User: admin
 * Date: 19.03.2017
 * Time: 1:20
 */

namespace App\Events;



use App\Models\Friend;

class FriendshipUpdateEvent extends BaseEvent
{
    public $friendship;
    /**
     * FriendshipUpdateEvent constructor.
     *
     * @param array $channel
     * @param Friend $friendship
     */
    public function __construct($channel, $friendship)
    {
        $this->friendship = $friendship;
        parent::__construct($channel);
    }

}