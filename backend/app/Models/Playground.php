<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Playground extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'location',
        'description',
        'image',
        'price',
        'size',
        'type',
        'status',
        'user_id',
        'city',
        'street'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function reviews(){
        return $this->hasMany(Review::class);
    }

    public function subimage(){
        return $this->hasMany(ImagePlayGround::class);
    }
}
