<?php

namespace App\Http\Controllers;

use App\Models\Feed;
use App\Models\Friend;
use App\Models\User;
use Illuminate\Http\Request;

class FeedController extends ApiController
{
    public function index() {
        $friends = $this->user()->getFriends(Friend::ACCEPTED, ['id'])->pluck('id');
        $feeds = Feed::whereIn('user_id', $friends)->orderBy('id', 'desc')->get();
        return $this->setStatusCode(200)->respond($feeds);
    }
}
