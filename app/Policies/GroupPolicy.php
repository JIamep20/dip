<?php

namespace App\Policies;

use App\Models\Group;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class GroupPolicy
{
    use HandlesAuthorization;

    public function getGroup(User $user, Group $group){
        return !!$group->users()->find($user->id);
    }

    public function updateGroup(User $user, Group $group){
        return !!$group->users()->find($user->id);
    }

    public function deleteGroup(User $user, Group $group){
        return !!$group->users()->find($user->id);
    }
}
