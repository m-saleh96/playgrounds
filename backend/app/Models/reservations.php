<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class reservations extends Model
{
    use HasFactory;
    protected $fillable = [
        'playground_id',
        'day',
        'start_time',
        'end_time',
        'status',
        'user_id'
    ];
}
