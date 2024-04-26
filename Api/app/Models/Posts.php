<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Posts extends Model
{
    use HasFactory, HasUuids;

    protected $primaryKey = "idPost";

    protected $table = "posts";

    protected $fillable = [
        'imageUrlOne',
        'imageUrlTwo',
        'imageUrlThree',
        'description',
        // 'user_idUser',
    ];

    public function user(): BelongsToMany
    {
        return $this->belongsToMany(User::class);
    }

    public function comments(): HasMany
    {
        return $this->hasMany(Comments::class);
    }
    public function rates(): HasMany
    {
        return $this->hasMany(Rate::class);
    }
}
