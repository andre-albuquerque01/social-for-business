<?php

namespace App\Services;

use App\Events\RecoverPassword;
use App\Events\UserEmailVerification;
use App\Exceptions\AuthException;
use App\Exceptions\UserUpdateException;
use App\Http\Resources\GeneralResource;
use App\Http\Resources\UserResource;
use App\Models\PasswordResetTokens;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserService
{

    public string $criptToken;

    public function Auth(array $data)
    {
        try {

            if (!$token = auth()->attempt($data)) {
                throw new AuthException();
            }

            return [
                'access_token' => $token
            ];
        } catch (UserUpdateException $e) {
            throw new AuthException();
        }
    }

    public function store(array $data)
    {
        try {
            $data['password'] = Hash::make($data['password']);
            User::create($data);
            event(new UserEmailVerification($data['email']));
            return new GeneralResource(['message' => 'success']);
        } catch (Exception $e) {
            throw new UserUpdateException("Error creating user");
        }
    }

    public function update(array $data)
    {
        try {
            $user = auth()->user();
            if (Hash::check($data['password'], $user->password)) {
                $data['password'] = Hash::make($data['password']);
                User::where('idUser', $user->idUser)->update($data);
                return new GeneralResource(['message' => 'success']);
            }
            throw new UserUpdateException();
        } catch (Exception $e) {
            throw new UserUpdateException("Error updating");
        }
    }

    public function delete()
    {
        try {
            $id = auth()->user()->idUser;
            User::findOrFail($id)->touch("deleted_at");
            return new GeneralResource(['message' => 'success']);
        } catch (UserUpdateException $e) {
            throw new UserUpdateException("Error deleting");
        }
    }

    public function verifyEmail(string $email)
    {
        try {
            User::where('email', '=', Crypt::decryptString($email))->touch('email_verified_at');
            return new GeneralResource(['message' => 'E-mail verificado']);
        } catch (Exception $e) {
            throw new UserUpdateException("Error to verify email");
        }
    }
    public function reSendEmail(array $data)
    {
        try {
            event(new UserEmailVerification($data['email']));
            return new GeneralResource(['message' => 'Send email']);
        } catch (Exception $e) {
            throw new UserUpdateException("Error to resend email");
        }
    }

    public function recoverEmail(string $email)
    {
        try {
            $user = User::where('email', $email)->first();
            $token = strtoupper(Str::random(8));

            if (!$user) {
                return new GeneralResource(['message' => 'User not found']);
            }

            $passwordResetToken = PasswordResetTokens::where('email', $email)->first();

            if ($passwordResetToken) {
                $data = [
                    'password_reset_token' => $token,
                    'password_reset_token_expiration' => now()->addMinutes(10),
                ];
                $passwordResetToken->where('email', $email)->update($data);
            } else {
                $data = [
                    'email' => $user->email,
                    'password_reset_token' => $token,
                    'password_reset_token_expiration' => now()->addMinutes(10),
                ];
                PasswordResetTokens::create($data);
            }


            event(new RecoverPassword($email, $token));

            return new GeneralResource(['message' => 'Send email']);
        } catch (\Exception $e) {
            throw new UserUpdateException("Error recovering password");
        }
    }

    private function verifyTokenValidity(string $token)
    {
        $user = PasswordResetTokens::where('password_reset_token', $token)->where("used_at", 0)->first();

        if (!$user) {
            return ['message' => 'Token invalid or expired'];
        }

        if (now()->greaterThanOrEqualTo($user->password_reset_token_expiration)) {
            return ['message' => 'Token expired'];
        }

        return ['message' => 'Token valid'];
    }

    public function verifyToken(string $token)
    {
        try {
            return new GeneralResource($this->verifyTokenValidity($token));
        } catch (\Exception $e) {
            throw new UserUpdateException("Error verifying token");
        }
    }

    public function recoverPassword(array $data)
    {
        try {
            $tokenValidity = $this->verifyTokenValidity($data['token']);

            if ($tokenValidity['message'] !== 'Token valid') {
                return new GeneralResource($tokenValidity);
            }

            $user = PasswordResetTokens::where('password_reset_token', $data['token'])->first();

            if (!$user) {
                return new GeneralResource(['message' => 'Token not found']);
            }
            $dataReset = [
                'used_at' => 1,
            ];
            PasswordResetTokens::where("email", $user->email)->update($dataReset);
            User::where('email', $user->email)->update([
                'password' => Hash::make($data['password']),
            ]);

            return new GeneralResource(['message' => 'Password successfully updated']);
        } catch (\Exception $e) {
            throw new UserUpdateException("Error recovering password");
        }
    }
}
