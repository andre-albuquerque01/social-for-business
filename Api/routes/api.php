<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CommentController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\RateController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {

    Route::prefix('user')->group(function () {
        Route::post('login', [AuthController::class, 'login']);
        Route::post('store', [UserController::class, 'store']);
        Route::get('/{email}', [UserController::class, 'verifyEmail']);
        Route::post('/reSendEmail', [UserController::class, 'reSendEmail']);

        Route::middleware('auth:api')->group(function () {
            Route::get('show', [UserController::class, 'show']);
            Route::put('update', [UserController::class, 'update']);
            Route::get('', [UserController::class, 'delete']);
        });
    });


    Route::middleware('auth:api')->prefix('post')->group(function () {
        Route::apiResource('', PostController::class);
    });
    
    Route::middleware('auth:api')->prefix('comment')->group(function () {
        // Route::apiResource('', CommentController::class);
        Route::post('', [CommentController::class, 'store']);
        Route::put('/{id}', [CommentController::class, 'update']);
        Route::delete('/{id}', [CommentController::class, 'destroy']);
        Route::get('/{id}', [CommentController::class, 'show']);
    });

    Route::middleware('auth:api')->prefix('rate')->group(function () {
        // Route::apiResource('', RateController::class);
        Route::post('', [RateController::class, 'store']);
        Route::delete('/{id}', [RateController::class, 'destroy']);
        Route::get('/{id}', [RateController::class, 'index']);
        Route::get('/s/{id}', [RateController::class, 'showPost']);
    });
});
