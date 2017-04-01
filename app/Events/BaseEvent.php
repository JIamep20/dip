<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class BaseEvent implements ShouldBroadcast
{
    use InteractsWithSockets, SerializesModels;

    protected $channels;
    /**
     * Create a new event instance.
     *
     * @param array $channels Array of channels to send on
     * @return void
     */
    public function __construct($channels = null)
    {
        $this->channels = $channels ?? ['general'];
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return Channel|array
     */
    public function broadcastOn()
    {
        return $this->channels;
    }
}
