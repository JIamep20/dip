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
        return $this->setStatusCode(200)->respond($this->user()->findFriendships()->with('sender', 'recipient', 'room')->get());
    }

    public function search($query)
    {
        $result = User::searchUser($query)->get();

        return $this->setStatusCode(200)->respond($result);
    }

    public function addUser(User $user)
    {
        if ($user->id == $this->user()->id) {
            throw (new ModelNotFoundException)->setModel(User::class);
        }


        if($friendship = $this->user()->beFriend($user)) {
            $friendship->room()->save(new Room(['name' => 'asd']));
            return $this->setStatusCode(200)->respond($friendship);
        }

        throw (new ModelNotFoundException)->setModel(User::class);
    }

    public function delete(User $user)
    {
        $this->user()->unFriend($user);
        return $this->setStatusCode(200)->respond();
    }
}
