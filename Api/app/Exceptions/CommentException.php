<?php

namespace App\Exceptions;

use Exception;

class CommentException extends Exception
{
    protected $message = 'Error while creating comment';
    public function render()
    {
        return response()->json([
            'error' => class_basename($this),
            'message' => $this->message,
        ], 401);
    }
}
