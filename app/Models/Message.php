<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    public function users()
    {
        return $this->belongsToMany(User::class);
    }

    public function attachments()
    {
        return $this->hasMany(Attachment::class);
    }
}
