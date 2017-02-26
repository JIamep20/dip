<?php

namespace App\Http\Controllers;

use App\Models\Group;
use App\Models\User;
use Illuminate\Http\Request;

class GroupController extends ApiController
{
    public function index(){
        $groups = $this->user()->groups()->get();
        return $this->setStatusCode(200)->respond($groups);
    }

    public function post(Request $request) {
        $group = $this->user()->groups()->create([]);
        return $this->setStatusCode(200)->respond($group);
    }

    public function get(Group $group){
        $group->load('users');
        return $this->setStatusCode(200)->respond($group);
    }

    public function put(Request $request, Group $group) {
        $group->update($request->all());
        return $this->setStatusCode(200)->respond($group);
    }

    public function delete(Group $group) {
        $group->delete();
        return $this->setStatusCode(200)->respond();
    }
}
