<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Posts extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'imageUrlOne',
        'imageUrlTwo',
        'imageUrlThree',
        'description',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function comments()
    {
        return $this->hasMany(Comments::class);
    }
    public function rates()
    {
        return $this->hasMany(Rate::class);
    }
}
