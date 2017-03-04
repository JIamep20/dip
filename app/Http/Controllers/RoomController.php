<?php

namespace App\Http\Controllers;

use App\Models\Room;
use Illuminate\Http\Request;

class RoomController extends ApiController
{
    public function index(){
        $rooms = Room::whereHas('roomable', function($q) {
            $q->users->where('id', $this->user()->id);
        })->get();

        return $this->setStatusCode(200)->get();
    }

    public function get(Room $room){

    }

    public function post(Request $request){

    }

    public function put(Request $request, Room $room){

    }

    public function delete(Room $room){

    }
}
