<?php
/**
 * Created by PhpStorm.
 * User: admin
 * Date: 19.03.2017
 * Time: 1:18
 */

namespace App\Events;


class FriendshipMessageEvent extends BaseEvent
{
    protected $message;

    /**
     * NewFriendshipMessageEvent constructor.
     * @param array|null $channel
     * @param $message
     */
    public function __construct($channel, $message){
        $this->message = $message;
        parent::__construct($channel);
    }
}