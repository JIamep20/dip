<?php

namespace App\Http\Controllers;

use App\Events\AddedToGroupNotificationEvent;
use App\Events\UserAddedToGroupEvent;
use App\Events\UserLeavesGroupEvent;
use App\Exceptions\CustomMessageException;
use App\Models\Group;
use App\Models\User;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

class GroupController extends ApiController
{
    public function index(){
        $groups = $this->user()->groups()->with('users')->get();
        return $this->setStatusCode(200)->respond($groups);
    }

    public function store(Request $request) {
        $group = $this->user()->groups()->create([]);
        return $this->setStatusCode(200)->respond($group);
    }

    public function show(Group $group){
        $this->authorize('getGroup', [Group::class, $group]);
        $group->load('users');
        return $this->setStatusCode(200)->respond($group);
    }

    public function update(Request $request, Group $group) {
        $this->authorize('updateGroup', [$group]);
        $group->update($request->all());
        return $this->setStatusCode(200)->respond($group);
    }

    public function destroy(Group $group) {
        $this->authorize('deleteGroup', [$group]);
        $group->delete();
        return $this->setStatusCode(200)->respond();
    }

    public function addUserToGroup(Group $group, User $user){
        $this->authorize('addUserToGroup', [$group]);
        if(!!$group->users()->find($user->id)) {
            throw new CustomMessageException('This user in already in group');
        }
        $group->users()->attach($user->id);
        event(new UserAddedToGroupEvent($group->users()->where('users.id', '!=', $user->id)->get(['users.id']), $user, $group));
        event(new AddedToGroupNotificationEvent([$user->id], $group));
        return $this->setStatusCode(200)->respond($user);
    }

    public function userLeavesGroup(Group $group){
        if(!!$group->users()->find($this->user()->id)) {
            $group->users()->detach($this->user()->id);
            event(new UserLeavesGroupEvent($group->users()->get(['users.id']), $group, $this->user()));
            return $this->setStatusCode(200)->respond($group);
        } else {
            throw (new ModelNotFoundException())->setModel(User::class);
        }
    }
}
