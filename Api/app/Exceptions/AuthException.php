<?php

namespace App\Exceptions;

use Exception;

class AuthException extends Exception
{
    protected $message = 'Email and password invalid.';
    public function render()
    {
        return response()->json([
            'error' => class_basename($this),
            'message' => $this->message,
        ], 401);
    }
}
