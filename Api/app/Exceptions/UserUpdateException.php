<?php

namespace App\Exceptions;

use Exception;

class UserUpdateException extends Exception
{
    protected $message = 'Password incorrect.';
    public function render()
    {
        return response()->json([
            'error' => class_basename($this),
            'message' => $this->message,
        ], 401);
    }
}
