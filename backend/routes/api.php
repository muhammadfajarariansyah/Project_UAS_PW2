<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ParticipantController;
use App\Http\Controllers\KelasController;

Route::apiResource('participants', ParticipantController::class);
Route::apiResource('kelas', KelasController::class);

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
