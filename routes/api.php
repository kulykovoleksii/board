<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\HomeController;
use App\Http\Controllers\Api\Auth\RegisterController;
use App\Http\Controllers\Api\Adverts\AdvertController;
use App\Http\Controllers\Api\Adverts\FavoriteController;
use App\Http\Controllers\Api\User\ProfileController;
use App\Http\Controllers\Api\User\FavoriteController as UserFavoriteController;
use App\Http\Controllers\Api\User\AdvertController as UserAdvertController;
use App\Http\Controllers\Api\PostalCodeController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['as' => 'api.'],
    function () {
        Route::get('/', [HomeController::class, 'home']);
        Route::post('/register', [RegisterController::class, 'register']);

        Route::get('/postal-codes/{postalCode}', [PostalCodeController::class, 'show']);
        Route::post('/geocode', [PostalCodeController::class, 'geocode']);
        Route::post('/reverse-geocode', [PostalCodeController::class, 'reverseGeocode']);

        Route::middleware('auth:api')->group(function () {
            Route::resource('adverts', AdvertController::class)->only('index', 'show');
            Route::post('/adverts/{advert}/favorite', [FavoriteController::class, 'add']);
            Route::delete('/adverts/{advert}/favorite', [FavoriteController::class, 'remove']);

            Route::group(
                [
                    'prefix' => 'user',
                    'as' => 'user.',
                ],
                function () {
                    Route::get('/', [ProfileController::class, 'show']);
                    Route::put('/', [ProfileController::class, 'update']);
                    Route::get('/favorites', [UserFavoriteController::class, 'index']);
                    Route::delete('/favorites/{advert}', [UserFavoriteController::class, 'remove']);

                    Route::resource('adverts', UserAdvertController::class)->only('index', 'show', 'update', 'destroy');
                    Route::post('/adverts/create/{category}/{region?}', [UserAdvertController::class, 'store']);

                    Route::put('/adverts/{advert}/photos', [UserAdvertController::class, 'photos']);
                    Route::put('/adverts/{advert}/attributes', [UserAdvertController::class, 'attributes']);
                    Route::post('/adverts/{advert}/send', [UserAdvertController::class, 'send']);
                    Route::post('/adverts/{advert}/close', [UserAdvertController::class, 'close']);
                }
            );
        });
});