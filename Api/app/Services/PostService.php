<?php

namespace App\Services;

use App\Exceptions\PostException;
use App\Http\Resources\GeneralResource;
use App\Http\Resources\PostResource;
use App\Http\Resources\PostResource2;
use App\Models\Posts;
use Exception;
use Illuminate\Support\Facades\Storage;

class PostService
{

    public function index()
    {
        $post = Posts::with('comments')->join('users','users.idUser','=','posts.user_idUser')->whereNull("posts.deleted_at")->get();
        return PostResource::collection($post);
    }

    public function store(array $data)
    {
        try {
            if ($data['imageUrlOne']) {
                $image = $data['imageUrlOne'];
                $newName_image = date("H_i_s-d_m_Y.") . $image->getClientOriginalExtension();
                Storage::disk('public')->put('img/' . $newName_image, file_get_contents($image));
                $data['imageUrlOne'] = $newName_image;
            }
            if (isset($data['imageUrlTwo'])) {
                $image = $data['imageUrlTwo'];
                $newName_image = date("H_i_s-d_m_Y.") . $image->getClientOriginalExtension();
                Storage::disk('public')->put('img/' . $newName_image, file_get_contents($image));
                $data['imageUrlTwo'] = $newName_image;
            }
            if (isset($data['imageUrlThree'])) {
                $image = $data['imageUrlThree'];
                $newName_image = date("H_i_s-d_m_Y.") . $image->getClientOriginalExtension();
                Storage::disk('public')->put('img/' . $newName_image, file_get_contents($image));
                $data['imageUrlThree'] = $newName_image;
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
            $show = auth()->user()->posts();
            return new PostResource2($show->get());
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
            if (isset($data['imageUrlTwo'])) {
                $image = $data['imageUrlTwo'];
                $newName_image = date("H_i_s-d_m_Y.") . $image->getClientOriginalExtension();
                Storage::disk('public')->put('img/' . $newName_image, file_get_contents($image));
                $data['imageUrlTwo'] = $newName_image;
            }
            if (isset($data['imageUrlThree'])) {
                $image = $data['imageUrlThree'];
                $newName_image = date("H_i_s-d_m_Y.") . $image->getClientOriginalExtension();
                Storage::disk('public')->put('img/' . $newName_image, file_get_contents($image));
                $data['imageUrlThree'] = $newName_image;
            }

            $user = auth()->user()->idUser;
            
            $post = Posts::where('idPost', $idPost)->where('user_idUser', $user)->first();
            
            if (!$post) {
                return new GeneralResource(["message" => "Not found."]);
            }
            
            $post->update($data);

            return new GeneralResource(['message' => 'success']);
        } catch (Exception $th) {
            throw new PostException('Error update post');
        }
    }
}
