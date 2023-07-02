<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ImagePlayGround extends Model
{
    use HasFactory;

    protected $fillable = [
        'playgrounds_id',
        'subImage'
    ];


    public function playground()
    {
        return $this->belongsTo(Playground::class);
    }
}
