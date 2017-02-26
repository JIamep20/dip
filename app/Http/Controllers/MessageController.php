<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\Room;
use Illuminate\Http\Request;

class MessageController extends ApiController
{
    public function index(Room $room)
    {
        $messages = $room->messages()->get();
        return $this->setStatusCode(200)->respond($messages);
    }

    public function get(Room $room, Message $message){
        if($this->doesMessageBelongsToRoom($room, $message)) {
            return $this->setStatusCode(200)->respond($message);
        }
        return $this->setStatusCode(404)->respond();
    }

    public function doesMessageBelongsToRoom($room, $message){
        return !!$room->messages()->find($message->id);
    }

}
