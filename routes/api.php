<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\HomeController;
use App\Http\Controllers\Api\Auth\RegisterController;
use App\Http\Controllers\Api\User\ProfileController;
use App\Http\Controllers\Api\PostalCodeController;

Route::group(['as' => 'api.'],
    function () {
        Route::get('/', [HomeController::class, 'home']);
        Route::post('/register', [RegisterController::class, 'register']);

        Route::get('/postal-codes/{postalCode}', [PostalCodeController::class, 'show']);
        Route::post('/geocode', [PostalCodeController::class, 'geocode']);
        Route::post('/reverse-geocode', [PostalCodeController::class, 'reverseGeocode']);

        Route::middleware('auth:api')->group(function () {
            Route::group(
                [
                    'prefix' => 'user',
                    'as' => 'user.',
                ],
                function () {
                    Route::get('/', [ProfileController::class, 'show']);
                    Route::put('/', [ProfileController::class, 'update']);
                }
            );
        });
    }
);
