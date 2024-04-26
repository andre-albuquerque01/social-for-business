<?php

namespace App\Services;

use App\Exceptions\PostException;
use App\Models\Posts;
use Exception;
use Illuminate\Support\Facades\Storage;

class PostService
{
    public function store(array $data): string
    {
        try {
            $image = $data['imageUrlOne'];
            $newName_image = date("H_i_s-d_m_Y.") . $image->getClientOriginalExtension();
            Storage::disk('public')->put('img/' . $newName_image, file_get_contents($image));
            $data['imageUrlOne'] = $newName_image;

            if (isset($data['imageUrlTwo'])) {
                $image = $data['imageUrlTwo'];
                $newName_image = date("H_i_s-d_m_Y.") . $image->getClientOriginalExtension();
                Storage::disk('public')->put('img/' . $newName_image, file_get_contents($image));
                $data['imageUrlOne'] = $newName_image;
            }
            if (isset($data['imageUrlThree'])) {
                $image = $data['imageUrlThree'];
                $newName_image = date("H_i_s-d_m_Y.") . $image->getClientOriginalExtension();
                Storage::disk('public')->put('img/' . $newName_image, file_get_contents($image));
                $data['imageUrlOne'] = $newName_image;
            }
            
            auth()->user()->posts()->create($data);

            return response()->json(['message' => 'success'], 200);
        } catch (Exception $th) {
            throw new PostException('Error creating post');
        }
    }

    public function update(array $data, $idPost): string
    {
        try {
            $post = Posts::findOrFail($idPost);

            $image = $data['imageUrlOne'];
            $newName_image = date("H_i_s-d_m_Y.") . $image->getClientOriginalExtension();
            Storage::disk('public')->put('img/' . $newName_image, file_get_contents($image));
            $data['imageUrlOne'] = $newName_image;

            if (isset($data['imageUrlTwo'])) {
                $image = $data['imageUrlTwo'];
                $newName_image = date("H_i_s-d_m_Y.") . $image->getClientOriginalExtension();
                Storage::disk('public')->put('img/' . $newName_image, file_get_contents($image));
                $data['imageUrlOne'] = $newName_image;
            }
            if (isset($data['imageUrlThree'])) {
                $image = $data['imageUrlThree'];
                $newName_image = date("H_i_s-d_m_Y.") . $image->getClientOriginalExtension();
                Storage::disk('public')->put('img/' . $newName_image, file_get_contents($image));
                $data['imageUrlOne'] = $newName_image;
            }
            
            $post->update($data);
            
            return response()->json(['message' => 'success'], 200);
        } catch (Exception $th) {
            throw new PostException('Error creating post');
        }
    }
}
