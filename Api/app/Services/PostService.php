<?php

namespace App\Services;

use App\Exceptions\PostException;
use App\Http\Resources\GeneralResource;
use App\Http\Resources\PostResource;
use App\Models\Posts;
use Exception;
use Illuminate\Support\Facades\Storage;

class PostService
{

    public function index()
    {
        try {
            $post = Posts::with('comments')->with('rates')->whereNull("posts.deleted_at")->orderBy('posts.updated_at', 'DESC')->get();
            return PostResource::collection($post);
        } catch (Exception $th) {
            throw new PostException('Error to list post');
        }
    }

    public function store(array $data)
    {
        try {
            if (isset($data['imageUrlOne'])) {
                $image = $data['imageUrlOne'];
                if ($image->getClientOriginalExtension() != null) {
                    $newName_image = date("H_i_s-d_m_Y.") . $image->getClientOriginalExtension();
                    Storage::disk('public')->put('img/' . $newName_image, file_get_contents($image));
                    $data['imageUrlOne'] = $newName_image;
                } else {
                    $data['imageUrlOne'] = null;
                }
            } else {
                $data['imageUrlOne'] = null;
            }

            auth()->user()->posts()->create($data);

            return new GeneralResource(['message' => 'success']);
        } catch (Exception $th) {
            throw new PostException('Error creating post');
        }
    }

    public function showUser()
    {
        try {
            $show = auth()->user()->posts()->with('comments');
            return new PostResource($show->get());
        } catch (Exception $th) {
            throw new PostException('Error creating post');
        }
    }

    public function update(array $data, string $idPost)
    {
        try {
            if (isset($data['imageUrlOne'])) {
                $image = $data['imageUrlOne'];
                $newName_image = date("H_i_s-d_m_Y.") . $image->getClientOriginalExtension();
                Storage::disk('public')->put('img/' . $newName_image, file_get_contents($image));
                $data['imageUrlOne'] = $newName_image;
            }

            $user = auth()->user()->idUser;

            $post = Posts::where('idPost', $idPost)->where('user_idUser', $user)->first();

            if (!$post) {
                return new GeneralResource(["message" => "Unathorized"]);
            }

            $post->update($data);

            return new GeneralResource(['message' => 'success']);
        } catch (Exception $th) {
            throw new PostException('Error update post');
        }
    }

    public function destroy(string $idPost)
    {
        try {
            $user = auth()->user()->idUser;

            $post = Posts::where('idPost', $idPost)->where('user_idUser', $user)->first();

            if (!$post) {
                return new GeneralResource(["message" => "Unathorized"]);
            }

            $post->touch("deleted_at");
            return response()->json(['message' => 'success'], 200);
        } catch (Exception $th) {
            throw new PostException('Error destroy post');
        }
    }
}
