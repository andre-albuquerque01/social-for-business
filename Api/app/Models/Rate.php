<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

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

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_idUser');
    }

    public function post()
    {
        return $this->belongsTo(Posts::class, 'post_idPost');
    }
}
