<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PasswordResetTokens extends Model
{
    use HasFactory;


    protected $table = "password_reset_tokens";

    protected $fillable = [
        'email',
        'password_reset_token',
        'password_reset_token_expiration',
    ];
}
