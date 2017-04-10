<?php
/**
 * Created by PhpStorm.
 * User: admin
 * Date: 19.03.2017
 * Time: 1:19
 */

namespace App\Events;


use App\Models\Group;
use App\Models\Message;
use Illuminate\Support\Collection;

class GroupMessageEvent extends BaseEvent
{
    protected
        $message,
        $group
    ;

    /**
     * NewGroupMessageEvent constructor.
     * @param Collection $channel
     * @param Message $message
     * @param Group $group
     */
    public function __construct($channel, $message, $group){
        $this->message = $message;
        $this->group = $group;
        parent::__construct($channel->pluck('id')->toArray());
    }

    public function broadcastWith() {
        return [
            'message' => $this->message->load('user'),
            'group' => $this->group
        ];
    }
}