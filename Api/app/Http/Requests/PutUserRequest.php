<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class PutUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rules = [
            "firstName" => "nullable|min:3|max:60|regex:/^[^<>]*$/",
            "lastName" => "nullable|min:3|max:60|regex:/^[^<>]*$/",
            'profileUrl' => 'nullable|image|mimes:jpeg,png,gif,jpg|max:2048',
            'coverPhotoUrl' => 'nullable|image|mimes:jpeg,png,gif,jpg|max:2048',
            "email" => [
                "nullable",
                "email",
                "max:255",
                Rule::unique('users', 'email')->ignore($this->user()->idUser, 'idUser'),
            ],
            "password" => [
                "required",
                Password::min(8)
                    ->mixedCase()
                    ->letters()
                    ->numbers()
                    ->symbols()
                    ->uncompromised(),
            ],
        ];

        return $rules;
    }
}
