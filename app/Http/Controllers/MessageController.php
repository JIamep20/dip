<?php

namespace App\Http\Controllers;

use App\Models\Friend;
use App\Models\Message;
use Illuminate\Http\Request;

class MessageController extends ApiController
{
    public function friendIndex(Friend $friend)
    {
        $this->authorize('getFriendshipMessages', [Message::class, $friend]);
        return $this->setStatusCode(200)->respond($friend->messages()->get());
    }

    public function friendShow(Friend $friend, Message $message)
    {
        $this->authorize('getFriendshipMessage', [Message::class, $friend, $message]);
        if($this->doesMessageBelongsToModel($friend, $message)) {
            return $this->setStatusCode(200)->respond($message);
        }
        return $this->setStatusCode(404)->respond();
    }

    public function friendStore(Friend $friend, Request $request)
    {
        $this->authorize('createFriendshipMessage', [Message::class, $friend]);
        $message = new Message();
        $message->fill($request->all());
        $message->user()->associate($this->user());
        $message->messagable()->associate($friend);
        $message->save();
        return $this->setStatusCode(201)->respond($message);
    }

    public function friendUpdate(Friend $friend, Message $message, Request $request)
    {
        $this->authorize('updateFriendshipMessage', [Message::class, $friend, $message]);
        $message->update($request->all());

        return $this->setStatusCode(200)->respond($message);
    }

    public function friendDestroy(Friend $friend, Message $message)
    {
        $this->authorize('destroyFriendshipMessage', [Message::class, $friend, $message]);
        $message->delete();
        return $this->setStatusCode(200)->respond();
    }

    public function groupIndex()
    {

    }

    public function groupShow()
    {

    }

    public function groupStore()
    {

    }

    public function groupUpdate()
    {

    }

    public function groupDestroy()
    {

    }

    public function index(Room $room)
    {
        //$this->authorize('retrieveRoomMessages', [$room]);
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

    public function doesMessageBelongsToModel($model, $message){
        return !!$model->messages()->find($message->id);
    }
}
