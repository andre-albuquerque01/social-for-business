<?php

namespace App\Services;

use App\Exceptions\CommentException;
use App\Http\Resources\CommentResource;

class CommentService
{
    public function show(string $id)
    {
        try {
            $exist = auth()->user()->comments()->where('post_idPost', $id)->get();
            
            if (!$exist) {
                return new CommentResource(["message" => "Not found."]);
            }

            return new CommentResource($exist);
        } catch (\Throwable $e) {
            throw new CommentException($e->getMessage());
        }
    }
    public function store(array $data)
    {
        try {
            auth()->user()->comments()->create($data);

            return new CommentResource(['message' => 'success']);
        } catch (\Throwable $e) {
            throw new CommentException($e->getMessage());
        }
    }
    public function update(array $data, string $id)
    {
        try {
            $var = auth()->user()->comments()->where("post_idPost", $id);
            if (!$var) {
                return new CommentResource(["message" => "Not found."]);
            }

            $var = $var->update($data);
            return new CommentResource(['message' => 'success']);
        } catch (\Throwable $e) {
            throw new CommentException($e->getMessage());
        }
    }
    public function destroy(string $id)
    {
        try {
            $var = auth()->user()->comments()->findOrFail($id, "idComment");
            if (!$var) {
                return new CommentResource(["message" => "Not found."]);
            }

            $var = $var->delete();
            return new CommentResource(['message' => 'success']);
        } catch (\Throwable $e) {
            throw new CommentException($e->getMessage());
        }
    }
}
