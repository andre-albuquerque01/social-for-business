<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Rate extends Model
{
    use HasFactory, HasUuids;

    protected $primaryKey = "idRate";

    protected $table = "rates";

    protected $foreignKeys = [
        'user_idUser',
        'post_idPost',
    ];

    protected $fillable = [
        'user_idUser',
        'post_idPost',
    ];

    public function BelongUser(): BelongsToMany
    {
        return $this->belongsToMany(User::class);
    }

    public function BelongPost()
    {
        return $this->belongsTo(Posts::class);
    }
}
