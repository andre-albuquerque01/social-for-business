<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\AuthValidated;
use App\Services\UserService;

class AuthController extends Controller
{

    private $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function login(AuthValidated $data)
    {
        $input = $data->validated();
        return $this->userService->Auth($input);
    }
}
