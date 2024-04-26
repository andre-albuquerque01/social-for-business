<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserStoreRequest;
use App\Http\Resources\UserResource;
use App\Services\UserService;
use Illuminate\Http\Request;

class UserController extends Controller
{
    private $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function store(UserStoreRequest $data)
    {
        return $this->userService->store($data->validated());
    }

    public function show()
    {
        return new UserResource(auth()->user());
    }

    public function update(UserStoreRequest $data)
    {
        return $this->userService->update($data->validated());
    }

    public function delete()
    {
        return $this->userService->delete();
    }

    public function verifyEmail(string $email)
    {
        return $this->userService->verifyEmail($email);
    }

    public function reSendEmail(Request $data)
    {
        $input = $data->validate([
            'email' => 'required|email',
        ]);
        return $this->userService->reSendEmail($input);
    }
}
