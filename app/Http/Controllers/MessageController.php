<?php

namespace App\Http\Controllers;

use App\Models\Friend;
use App\Models\Group;
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
        // TODO updated friendship message here
        return $this->setStatusCode(201)->respond($message);
    }

    public function friendUpdate(Friend $friend, Message $message, Request $request)
    {
        $this->authorize('updateFriendshipMessage', [Message::class, $friend, $message]);
        $message->update($request->all());
        // TODO updated friendship message here
        return $this->setStatusCode(200)->respond($message);
    }

    public function friendDestroy(Friend $friend, Message $message)
    {
        $this->authorize('destroyFriendshipMessage', [Message::class, $friend, $message]);
        $message->delete();
        return $this->setStatusCode(200)->respond();
    }

    public function groupIndex(Group $group)
    {
        $this->authorize('getGroupMessages', [Message::class, $group]);
        return $this->setStatusCode(200)->respond($group->messages()->get());
    }

    public function groupShow(Group $group, Message $message)
    {
        $this->authorize('getGroupMessage', [Message::class, $group, $message]);
        return $this->setStatusCode(200)->respond($message);
    }

    public function groupStore(Group $group, Request $request)
    {
        $this->authorize('createGroupMessage', [Message::class, $group]);
        $message = new Message($request->all());
        $message->user()->associate($this->user());
        $message->messagable()->associate($group);
        $message->save();
        // TODO stored ghoup message
        return $this->setStatusCode(200)->respond($message);
    }

    public function groupUpdate(Group $group, Message $message, Request $request)
    {
        $this->authorize('updateGroupMessage', [Message::class, $group, $message]);
        $message->update($request->all());
        // TODO updated group message
        return $this->setStatusCode(200)->respond($message);
    }

    public function groupDestroy(Group $group, Message $message)
    {
        $this->authorize('destroyGroupMessage', [Message::class, $group, $message]);
        $message->delete();
        return $this->setStatusCode(200)->respond();
    }

    public function doesMessageBelongsToModel($model, $message){
        return !!$model->messages()->find($message->id);
    }
}
