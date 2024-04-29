<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\PostRequest;
use App\Http\Resources\PostResource;
use App\Models\Posts;
use App\Services\PostService;
use Illuminate\Support\Facades\Gate;
class PostController extends Controller
{
    private $postService;
    public function __construct(PostService $postService)
    {
        $this->postService = $postService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return PostResource::collection(Posts::whereNotNull("deleted_at")->paginate());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PostRequest $request)
    {
        return $this->postService->store($request->validated());
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return new PostResource(Posts::findOrFail($id));
    }
    public function showUser()
    {
        return $this->postService->showUser();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PostRequest $request, string $id)
    {
        return $this->postService->update($request->validated(), $id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Posts::findOrfail($id)->touch("deleted_at");
        return response()->json(['message' => 'success'], 200);
    }
}
