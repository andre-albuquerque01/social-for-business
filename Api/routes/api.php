<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    Route::post('login', [AuthController::class, 'login']);

    Route::prefix('user')->group(function () {
        Route::post('store', [UserController::class, 'store']);
        Route::get('show', [UserController::class, 'show']);
        Route::put('update', [UserController::class, 'update']);
        Route::get('', [UserController::class, 'delete']);
    });
});
