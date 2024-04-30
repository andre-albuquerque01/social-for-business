<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PostRequest extends FormRequest
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
            'imageUrlOne' => 'nullable',
            'description' => 'required|string|regex:/^[^<>]*$/|min:10|max:255',
        ];

        if ($this->method() === 'PUT' || $this->method() === 'PATCH') {
            $rules['imageUrlOne'] = 'nullable';
            $rules['description'] = 'nullable|string';
        }

        return $rules;
    }
}
