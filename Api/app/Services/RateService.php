<?php

namespace App\Services;

use App\Exceptions\RateException;
use App\Http\Resources\RateResource;
use App\Models\Rate;
use Exception;
use Illuminate\Support\Facades\DB;

class RateService
{

    public function index(string $id)
    {
        try {
            $rate = Rate::select('post_idPost', DB::raw('COUNT(*) as count'))->groupBy('post_idPost')->where('post_idPost', $id)->get();
            return new RateResource($rate);
        } catch (Exception $th) {
            throw new RateException('Error: ' . $th->getMessage());
        }
    }

    public function store(array $data)
    {
        try {
            $user = auth()->user()->idUser;
            $exist = Rate::where('user_idUser', $user)->where('post_idPost', $data['post_idPost'])->first();

            if ($exist) {
                return new RateResource(['message' => 'Already registered']);
            }

            auth()->user()->rates()->create($data);

            return new RateResource(['message' => 'success']);
        } catch (Exception $th) {
            throw new RateException('Error: ' . $th->getMessage());
        }
    }

    public function showPost(string $id)
    {
        try {
            // $exist = Rate::where('user_idUser', auth()->user()->idUser)->where('post_idPost', $id)->first();
            $exist = auth()->user()->rates()->where('post_idPost', $id)->first();
            
            if (isset($exist)) {
                return new RateResource(['message' => 'true']);
            }
            return new RateResource(['message' => 'false']);
        } catch (Exception $th) {
            throw new RateException('Error: ' . $th->getMessage());
        }
    }
    public function destroy(string $id)
    {
        try {
            Rate::whereExists('post_idPost', $id)->delete();
            return new RateResource(['message' => 'success']);
        } catch (Exception $th) {
            throw new RateException('Error: ' . $th->getMessage());
        }
    }
}
