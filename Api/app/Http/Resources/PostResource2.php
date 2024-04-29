<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PostResource2 extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return parent::toArray($request);
        // return [
        //     'imageUrlOne' => $this->imageUrlOne,
        //     'imageUrlTwo' => $this->imageUrlTwo,
        //     'imageUrlThree' => $this->imageUrlThree,
        //     'description' => $this->description,
        //     'created_at' => $this->created_at,
        //     'updated_at' => $this->update_at,
        // ];
    }
}
