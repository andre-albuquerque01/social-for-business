<?php

namespace App\Exceptions;

use Exception;

class PostException extends Exception
{
    protected $message = 'Error while posting';
    public function render()
    {
        return response()->json([
            'error' => class_basename($this),,
            'message' => $this->message,
        ], 401);
    }
}
