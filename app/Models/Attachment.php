<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Attachment
 *
 * @property int $id
 * @property int $message_id
 * @property string $url
 * @property string $type
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property string $deleted_at
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Attachment whereId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Attachment whereMessageId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Attachment whereUrl($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Attachment whereType($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Attachment whereCreatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Attachment whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Attachment whereDeletedAt($value)
 * @mixin \Eloquent
 */
class Attachment extends Model
{
    //
}
