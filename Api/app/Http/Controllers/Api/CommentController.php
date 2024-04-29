<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CommentRequest;
use App\Services\CommentService;
use Illuminate\Http\Request;

class CommentController extends Controller
{

    public $commentService;
    public function __construct(CommentService $commentService)
    {
        $this->commentService = $commentService;
    }

    public function show(string $id)
    {
        return $this->commentService->show($id);
    }

    public function store(CommentRequest $request)
    {
        return $this->commentService->store($request->validated());
    }

    public function update(CommentRequest $data, string $id)
    {
        return $this->commentService->update($data->validated(), $id);
    }

    public function destroy(string $id)
    {
        return $this->commentService->destroy($id);
    }
}
