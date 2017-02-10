<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * App\Models\Room
 *
 * @property int $id
 * @property string $name
 * @property int $roomable_id
 * @property string $roomable_type
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property string $deleted_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Message[] $messages
 * @property-read \Illuminate\Database\Eloquent\Model|\Eloquent $roomable
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Room whereId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Room whereName($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Room whereRoomableId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Room whereRoomableType($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Room whereCreatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Room whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Room whereDeletedAt($value)
 * @mixin \Eloquent
 */
class Room extends Model
{
    use SoftDeletes;

    protected $fillable = ['name'];

    public function messages()
    {
        return $this->hasMany(Message::class);
    }

    public function roomable()
    {
        return $this->morphTo();
    }
}
