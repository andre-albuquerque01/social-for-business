<?php

namespace App\Services;

use App\Events\UserEmailVerification;
use App\Exceptions\AuthException;
use App\Exceptions\UserUpdateException;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Hash;

class UserService
{

    public function Auth(array $data)
    {
        if (!$token = auth()->attempt($data)) {
            throw new AuthException();
        }

        return [
            'access_token' => $token
        ];
    }

    public function store(array $data)
    {
        try {

            $data['password'] = Hash::make($data['password']);
            User::create($data);
            event(new UserEmailVerification($data['email']));
            return response()->json(['message' => "success"], 204);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 401);
        }
    }

    public function update(array $data)
    {
        try {
            $user = auth()->user();
            if (Hash::check($data['password'], $user->password)) {
                $data['password'] = Hash::make($data['password']);
                User::where('idUser', $user->idUser)->update($data);
                return response()->json(['message' => "success"], 200);
            }
            throw new UserUpdateException();
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 401);
        }
    }

    public function delete()
    {
        $id = auth()->user()->idUser;
        User::findOrFail($id)->touch("deleted_at");
        return response()->json(['message' => "success"], 204);
    }

    public function verifyEmail(string $email)
    {
        try {
            User::where('email', '=', Crypt::decryptString($email))->touch('email_verified_at');
            return response()->json(['message' => 'E-mail verificado'], 200);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }
    public function reSendEmail(array $data)
    {
        try {
            event(new UserEmailVerification($data['email']));
            return response()->json(['message' => 'E-mail enviado'], 200);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }
}
