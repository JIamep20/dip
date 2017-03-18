<?php

namespace App\Http\Controllers;

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

    public function store(User $user)
    {
        if ($user->id == $this->user()->id) {
            throw (new ModelNotFoundException)->setModel(User::class);
        }

        if($friendship = $this->user()->beFriend($user)) {
            // TODO new friendship created event
            return $this->setStatusCode(200)->respond($friendship);
        }

        throw (new ModelNotFoundException)->setModel(User::class);
    }

    public function update(User $friend, Request $request)
    {
        if($model = $this->user()->getFriendship($friend)){
            $model->update($request->all());
            // TODO friendship status updated event
            return $this->setStatusCode(200)->respond($model);
        }

        throw (new ModelNotFoundException())->setModel(User::class);
    }

    public function destroy(User $friend)
    {
        if($res = $this->user()->getFriendship($friend)) {
            $res->delete();
            // TODO friendship deleted here
            return $this->setStatusCode(200)->respond();
        }

        throw (new ModelNotFoundException())->setModel(User::class);
    }
}
