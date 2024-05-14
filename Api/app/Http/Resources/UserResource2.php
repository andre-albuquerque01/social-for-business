<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource2 extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // return parent::toArray($request);
        return [
            'idUser' => $this->idUser,
            'firstName' => $this->firstName,
            'lastName' => $this->lastName,
            'email' => $this->email,
        ];
    }
}
