<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\RecoverPasswordRequest;
use App\Http\Requests\UserStoreRequest;
use App\Http\Resources\UserResource;
use App\Http\Resources\UserResource2;
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
        $user = auth()->user();
        return new UserResource2($user);
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

    public function recoverEmail(Request $data)
    {
        $input = $data->validate([
            'email' => 'required|email',
        ]);
        return $this->userService->recoverEmail($input['email']);
    }
    public function verifyToken(Request $data)
    {
        $input = $data->validate([
            'token' => 'required|min:7|max:9',
        ]);
        return $this->userService->verifyToken($input['token']);
    }

    public function recoverPassword(RecoverPasswordRequest $data)
    {
        return $this->userService->recoverPassword($data->validated());
    }
}
