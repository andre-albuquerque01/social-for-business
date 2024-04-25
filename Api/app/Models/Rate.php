<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rate extends Model
{
    use HasFactory, HasUuids;

    protected $primaryKey = "idRate";

    protected $table = "rates";

    protected $fillable = [
        'user_id',
        'post_id',
        'qtdRate',
        'isRating',
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
