<?php

namespace App\Http\Controllers;

use App\Models\Friend;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FriendController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(User $user)
    {
        return $this->setStatusCode(200)->respond(Auth::user()->friends);
    }

    public function search($query)
    {
        $result = \App\Models\User::where('name', 'like', "%$query%")
            ->whereDoesntHave('friendOf', function ($q) {
                $q->where('user_id', Auth::user()->id)->orWhere('friend_id', Auth::user()->id);
            })
            ->whereDoesntHave('friendsOfMine', function ($q) {
                $q->where('user_id', Auth::user()->id)->orWhere('friend_id', Auth::user()->id);
            })
            ->get();

        return $this->setStatusCode(200)->respond($result);
    }

    public function addUser($id)
    {
        $user = \App\Models\User::findOrFail($id);
        $friends = new \App\Models\Friend([
            'user_id' => Auth::user()->id,
            'friend_id' => $user->id
        ]);

        $friends->save();
        $friends->room()->save(\App\Models\Room::create(['name' => 'Private: ' . Auth::user()->name . ', ' . $user->name]));
        $friends->load('initiator', 'invited', 'room');

        return $this->setStatusCode(200)->respond($friends);
    }

    public function delete($id){
        $friend = Friend::findOrFail($id);
        $friend->delete();
        return $this->setStatusCode(200)->respond();
    }
}
