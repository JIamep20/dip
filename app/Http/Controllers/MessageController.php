<?php

namespace App\Http\Controllers;

use App\Events\FriendshipMessageEvent;
use App\Events\GroupMessageEvent;
use App\Models\Friend;
use App\Models\Group;
use App\Models\Message;
use App\Models\User;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

class MessageController extends ApiController
{
    public function friendIndex(User $friend)
    {
        if($friendship = $this->user()->getFriendship($friend)) {
            return $this->setStatusCode(200)->respond($friendship->messages()->with('user')->get());
        }
        throw (new ModelNotFoundException())->setModel(Friend::class);
    }

    public function friendShow(User $friend, Message $message)
    {
        $this->authorize('getFriendshipMessage', [Message::class, $friend, $message]);
        if($this->doesMessageBelongsToModel($friend, $message)) {
            return $this->setStatusCode(200)->respond($message);
        }
        return $this->setStatusCode(404)->respond();
    }

    public function friendStore(User $friend, Request $request)
    {
        if($friendship = $this->user()->getFriendship($friend)) {
            $message = new Message();
            $message->fill($request->all());
            $message->user()->associate($this->user());
            $message->messagable()->associate($friendship);
            $message->save();
            event(new FriendshipMessageEvent([$friend->id], $message, $this->user()));
            return $this->setStatusCode(201)->respond($message);
        }
        throw (new ModelNotFoundException())->setModel(Friend::class);
    }

    public function friendUpdate(Friend $friend, Message $message, Request $request)
    {
        $this->authorize('updateFriendshipMessage', [Message::class, $friend, $message]);
        $message->update($request->all());
        event(new FriendshipMessageEvent([$friend->id, $this->user()->id], $message));
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
        return $this->setStatusCode(200)->respond($group->messages()->with('user')->get());
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
        event(new GroupMessageEvent($group->users()->where('users.id', '<>', $this->user()->id)->get(['users.id']), $message, $group));
        return $this->setStatusCode(200)->respond($message);
    }

    public function groupUpdate(Group $group, Message $message, Request $request)
    {
        $this->authorize('updateGroupMessage', [Message::class, $group, $message]);
        $message->update($request->all());
        event(new GroupMessageEvent($group->users()->get(['users.id']), $message));
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
