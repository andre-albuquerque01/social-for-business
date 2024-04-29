<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comments extends Model
{
    use HasFactory, HasUuids;

    protected $primaryKey = "idComment";

    protected $table = "comments";

    protected $fillable = [
        'user_idUser',
        'post_idPost',
        'comment',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function post()
    {
        return $this->belongsTo(Posts::class, 'idPost');
    }
}
