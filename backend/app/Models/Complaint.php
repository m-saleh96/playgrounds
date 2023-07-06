<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Complaint extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'playground_id',
        'message',
    ];


    public function player()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function playground()
    {
        return $this->belongsTo(Playground::class, 'playground_id');
    }
}
