<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CommentResource extends JsonResource
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
            "idComment" => $this->idComment,
            "user_idUser" => $this->user_idUser,
            "post_idPost" => $this->post_idPost,
            "comment" => $this->comment,
            "created_at" => $this->created_at
        ];
    }
}
