<?php

namespace App\Http\Controllers;

use App\Events\FriendshipCreatedEvent;
use App\Events\FriendshipDeletedEvent;
use App\Exceptions\CustomMessageException;
use App\Models\Friend;
use App\Models\Room;
use App\Models\User;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FriendController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return $this->setStatusCode(200)->respond($this->user()->getFriends(null));
    }

    public function show(User $friend)
    {
        if($res = $this->user()->getFriendship($friend))
        {
            return $this->setStatusCode(200)->respond($res);
        }

        throw (new ModelNotFoundException())->setModel(User::class);
    }

    public function store(User $friend)
    {
        if ($friend->id == $this->user()->id) {
            throw (new ModelNotFoundException)->setModel(User::class);
        }
        $result = null;

        if ($friendship = $this->user()->getFriendship($friend, true)) {
            if ($friendship->trashed()) {
                $friendship->restore();
            } else {
                throw new CustomMessageException('You have already this user in friends list');
            }
        } else {
            $result = new Friend([
                'sender_id' => $this->user()->id,
                'recipient_id' => $friend->id
            ]);
            $result->save();
        }

        event(new FriendshipCreatedEvent([$friend->id], $this->user()));
        return $this->setStatusCode(200)->respond($friend);
    }

    public function update(User $friend, Request $request)
    {
        if($model = $this->user()->getFriendship($friend)){
            $model->update($request->all());
            //event(new FriendshipUpdateEvent([$this->user()->id, $friend->id], $model));
            return $this->setStatusCode(200)->respond($model);
        }

        throw (new ModelNotFoundException())->setModel(User::class);
    }

    public function destroy(User $friend)
    {
        if($res = $this->user()->getFriendship($friend)) {
            $res->delete();
            event(new FriendshipDeletedEvent([$friend->id], $res));
            return $this->setStatusCode(200)->respond($friend);
        }

        throw (new ModelNotFoundException())->setModel(User::class);
    }
}
