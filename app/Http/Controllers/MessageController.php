<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\Room;
use Illuminate\Http\Request;

class MessageController extends ApiController
{
    public function index(Room $room)
    {
        $this->authorize('retrieveRoomMessages', [$room]);
        $messages = $room->messages()->get();
        return $this->setStatusCode(200)->respond($messages);
    }

    public function get(Room $room, Message $message){
        $this->authorize('retrieveOneRoomMessage', [$room]);
        if($this->doesMessageBelongsToRoom($room, $message)) {
            return $this->setStatusCode(200)->respond($message);
        }
        return $this->setStatusCode(404)->respond();
    }
    
    public function post(Request $request, Room $room) {
        $this->authorize('postMessage', [$room]);
        $message = $room->messages()->create($request->all());

        return $this->setStatusCode(201)->respond($message);
    }
    
    public function put(Request $request, Room $room, Message $message) {
        $this->authorize('putMessage', [$room]);
        if(!$this->doesMessageBelongsToRoom($room, $message)) {
            return $this->setStatusCode(404)->respond();
        }
        $message->update($request->all());

        return $this->setStatusCode(200)->respond($message);
    }

    public function delete(Room $room, Message $message) {
        if(!$this->doesMessageBelongsToRoom($room, $message)) {
            return $this->setStatusCode(404)->respond();
        }

        $this->authorize('deleteMessage', [$message]);

        $message->delete();
        return $this->setStatusCode(200)->respond();
    }

    public function doesMessageBelongsToRoom($room, $message){
        return !!$room->messages()->find($message->id);
    }

}
