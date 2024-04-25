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
        'user_id',
        'post_id',
        'comment',
    ];

    public function BelongUser()
    {
        return $this->belongsTo(User::class);
    }

    public function BelongPost()
    {
        return $this->belongsTo(Posts::class);
    }
}
