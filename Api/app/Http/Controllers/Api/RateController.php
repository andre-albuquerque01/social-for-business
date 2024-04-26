<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\RateRequest;
use App\Services\RateService;
use Illuminate\Http\Request;

class RateController extends Controller
{
    private $rateService;
    public function __construct(RateService $rateService)
    {
        $this->rateService = $rateService;
    }

    public function index(string $id)
    {
        return $this->rateService->index($id);
    }
    public function store(RateRequest $request)
    {
        return $this->rateService->store($request->validated());
    }
    public function showPost(string $id)
    {
        return $this->rateService->showPost($id);
    }
    public function destroy(string $id)
    {
        return $this->rateService->destroy($id);
    }
}
