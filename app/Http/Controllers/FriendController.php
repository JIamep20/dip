<?php

namespace App\Http\Controllers;

use App\Models\Friend;
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
        return $this->setStatusCode(200)->respond($this->user()->friends);
    }

    public function search($query)
    {
        $result = User::searchUser($query)->get();

        return $this->setStatusCode(200)->respond($result);
    }

    public function addUser($id)
    {
        if($id == $this->user()->id) {
            throw (new ModelNotFoundException)->setModel(User::class);
        }
        $user = \App\Models\User::findOrFail($id);

        $friends = Friend::findByTwoUsers($this->user()->id, $user->id);

        $friends->room()->save(\App\Models\Room::create(['name' => 'Private: ' . $this->user()->name . ', ' . $user->name]));
        $friends->load('initiator', 'invited', 'room');

        return $this->setStatusCode(200)->respond($friends);
    }

    public function delete($id){
        $friend = Friend::findOrFail($id);
        $this->authorize('deleteFriendship', [$friend]);
        $friend->delete();
        return $this->setStatusCode(200)->respond();
    }
}
