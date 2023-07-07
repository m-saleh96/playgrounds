<?php

namespace App\Models;
use App\Events\MessageCreated;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    protected $dispatchesEvents = [
        'created' => MessageCreated::class,
    ];
}
