<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\BannerController as PublicBannerController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\Auth\ResetPasswordController;
use App\Http\Controllers\Auth\VerificationController;
use App\Http\Controllers\Auth\NetworkController;
use App\Http\Controllers\Cabinet\HomeController as CabinetHomeController;
use App\Http\Controllers\Cabinet\ProfileController;
use App\Http\Controllers\Cabinet\PhoneController;
use App\Http\Controllers\Cabinet\FavoriteController;
use App\Http\Controllers\Cabinet\TicketController;
use App\Http\Controllers\Adverts\AdvertController;
use App\Http\Controllers\Adverts\FavoriteController as AdvertFavoriteController;
use App\Http\Controllers\Cabinet\Adverts\AdvertController as CabinetAdvertController;
use App\Http\Controllers\Cabinet\Adverts\CreateController as CabinetAdvertCreateController;
use App\Http\Controllers\Cabinet\Adverts\ManageController;
use App\Http\Controllers\Cabinet\Banners\BannerController;
use App\Http\Controllers\Cabinet\Banners\CreateController as BannerCreateController;
use App\Http\Controllers\Admin\UploadController;
use App\Http\Controllers\Admin\HomeController as AdminHomeController;
use App\Http\Controllers\Admin\UsersController;
use App\Http\Controllers\Admin\RegionController;
use App\Http\Controllers\Admin\PageController as AdminPageController;
use App\Http\Controllers\Admin\Adverts\CategoryController;
use App\Http\Controllers\Admin\Adverts\AttributeController;
use App\Http\Controllers\Admin\Adverts\AdvertController as AdminAdvertController;
use App\Http\Controllers\Admin\BannerController as AdminBannerController;
use App\Http\Controllers\Admin\TicketController as AdminTicketController;

Route::get('/', [HomeController::class, 'index'])->name('home');

// Authentication Routes
Route::get('login', [LoginController::class, 'showLoginForm'])->name('login');
Route::post('login', [LoginController::class, 'login']);
Route::post('logout', [LoginController::class, 'logout'])->name('logout');

// Registration Routes
Route::get('register', [RegisterController::class, 'showRegistrationForm'])->name('register');
Route::post('register', [RegisterController::class, 'register']);

// Password Reset Routes
Route::get('password/reset', [ForgotPasswordController::class, 'showLinkRequestForm'])->name('password.request');
Route::post('password/email', [ForgotPasswordController::class, 'sendResetLinkEmail'])->name('password.email');
Route::get('password/reset/{token}', [ResetPasswordController::class, 'showResetForm'])->name('password.reset');
Route::post('password/reset', [ResetPasswordController::class, 'reset'])->name('password.update');

// Email Verification Routes
Route::get('email/verify', [VerificationController::class, 'show'])->name('verification.notice');
Route::get('email/verify/{id}/{hash}', [VerificationController::class, 'verify'])->name('verification.verify');
Route::post('email/resend', [VerificationController::class, 'resend'])->name('verification.resend');

Route::get('register/verify/{token}', [RegisterController::class, 'verify'])->name('register.verify');

// Phone Login
Route::get('/login/phone', [LoginController::class, 'phone'])->name('login.phone');
Route::post('/login/phone', [LoginController::class, 'verify']);

// Social Login
Route::get('/login/{network}', [NetworkController::class, 'redirect'])->name('login.network');
Route::get('/login/{network}/callback', [NetworkController::class, 'callback']);

// Public Banner Routes
Route::get('/banner/get', [PublicBannerController::class, 'get'])->name('banner.get');
Route::get('/banner/{banner}/click', [PublicBannerController::class, 'click'])->name('banner.click');

Route::group([
    'prefix' => 'adverts',
    'as' => 'adverts.',
], function () {
    Route::get('/show/{advert}', [AdvertController::class, 'show'])->name('show');
    Route::post('/show/{advert}/phone', [AdvertController::class, 'phone'])->name('phone');
    Route::post('/show/{advert}/favorites', [AdvertFavoriteController::class, 'add'])->name('favorites');
    Route::delete('/show/{advert}/favorites', [AdvertFavoriteController::class, 'remove']);

    Route::get('/{adverts_path?}', [AdvertController::class, 'index'])->name('index')->where('adverts_path', '.+');
});

Route::group(
    [
        'prefix' => 'cabinet',
        'as' => 'cabinet.',
        'middleware' => ['auth'],
    ],
    function () {
        Route::get('/', [CabinetHomeController::class, 'index'])->name('home');

        Route::get('/profile', [ProfileController::class, 'index'])->name('profile.home');
        Route::get('/profile/edit', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::put('/profile/edit', [ProfileController::class, 'update'])->name('profile.update');

        Route::post('/phone/verify', [PhoneController::class, 'verify'])->name('phone.verify');
        Route::post('/phone/auth', [PhoneController::class, 'auth'])->name('phone.auth');

        Route::get('favorites', [FavoriteController::class, 'index'])->name('favorites.index');
        Route::delete('favorites/{advert}', [FavoriteController::class, 'remove'])->name('favorites.remove');

        Route::resource('tickets', TicketController::class)->only(['index', 'show', 'create', 'store', 'destroy']);
        Route::post('tickets/{ticket}/message', [TicketController::class, 'message'])->name('tickets.message');

        Route::group([
            'prefix' => 'adverts',
            'as' => 'adverts.',
            'middleware' => [App\Http\Middleware\FilledProfile::class],
        ], function () {
            Route::get('/', [CabinetAdvertController::class, 'index'])->name('index');
            Route::get('/create', [CabinetAdvertCreateController::class, 'category'])->name('create');
            Route::get('/create/region/{category}/{region?}', [CabinetAdvertCreateController::class, 'region'])->name('create.region');
            Route::get('/create/advert/{category}/{region?}', [CabinetAdvertCreateController::class, 'advert'])->name('create.advert');
            Route::post('/create/advert/{category}/{region?}', [CabinetAdvertCreateController::class, 'store'])->name('create.advert.store');

            Route::get('/{advert}/edit', [ManageController::class, 'editForm'])->name('edit');
            Route::put('/{advert}/edit', [ManageController::class, 'edit']);
            Route::get('/{advert}/photos', [ManageController::class, 'photosForm'])->name('photos');
            Route::post('/{advert}/photos', [ManageController::class, 'photos']);
            Route::get('/{advert}/attributes', [ManageController::class, 'attributesForm'])->name('attributes');
            Route::post('/{advert}/attributes', [ManageController::class, 'attributes']);
            Route::post('/{advert}/send', [ManageController::class, 'send'])->name('send');
            Route::post('/{advert}/close', [ManageController::class, 'close'])->name('close');
            Route::delete('/{advert}/destroy', [ManageController::class, 'destroy'])->name('destroy');
        });

        Route::group([
            'prefix' => 'banners',
            'as' => 'banners.',
            'middleware' => [App\Http\Middleware\FilledProfile::class],
        ], function () {
            Route::get('/', [BannerController::class, 'index'])->name('index');
            Route::get('/create', [BannerCreateController::class, 'category'])->name('create');
            Route::get('/create/region/{category}/{region?}', [BannerCreateController::class, 'region'])->name('create.region');
            Route::get('/create/banner/{category}/{region?}', [BannerCreateController::class, 'banner'])->name('create.banner');
            Route::post('/create/banner/{category}/{region?}', [BannerCreateController::class, 'store'])->name('create.banner.store');

            Route::get('/show/{banner}', [BannerController::class, 'show'])->name('show');
            Route::get('/{banner}/edit', [BannerController::class, 'editForm'])->name('edit');
            Route::put('/{banner}/edit', [BannerController::class, 'edit']);
            Route::get('/{banner}/file', [BannerController::class, 'fileForm'])->name('file');
            Route::put('/{banner}/file', [BannerController::class, 'file']);
            Route::post('/{banner}/send', [BannerController::class, 'send'])->name('send');
            Route::post('/{banner}/cancel', [BannerController::class, 'cancel'])->name('cancel');
            Route::post('/{banner}/order', [BannerController::class, 'order'])->name('order');
            Route::delete('/{banner}/destroy', [BannerController::class, 'destroy'])->name('destroy');
        });
    }
);

Route::group(
    [
        'prefix' => 'admin',
        'as' => 'admin.',
        'middleware' => ['auth', 'can:admin-panel'],
    ],
    function () {
        Route::post('/ajax/upload/image', [UploadController::class, 'image'])->name('ajax.upload.image');

        Route::get('/', [AdminHomeController::class, 'index'])->name('home');
        Route::resource('users', UsersController::class);
        Route::post('/users/{user}/verify', [UsersController::class, 'verify'])->name('users.verify');

        Route::resource('regions', RegionController::class);

        Route::resource('pages', AdminPageController::class);

        Route::group(['prefix' => 'pages/{page}', 'as' => 'pages.'], function () {
            Route::post('/first', [AdminPageController::class, 'first'])->name('first');
            Route::post('/up', [AdminPageController::class, 'up'])->name('up');
            Route::post('/down', [AdminPageController::class, 'down'])->name('down');
            Route::post('/last', [AdminPageController::class, 'last'])->name('last');
        });

        Route::group(['prefix' => 'adverts', 'as' => 'adverts.'], function () {

            Route::resource('categories', CategoryController::class);

            Route::group(['prefix' => 'categories/{category}', 'as' => 'categories.'], function () {
                Route::post('/first', [CategoryController::class, 'first'])->name('first');
                Route::post('/up', [CategoryController::class, 'up'])->name('up');
                Route::post('/down', [CategoryController::class, 'down'])->name('down');
                Route::post('/last', [CategoryController::class, 'last'])->name('last');
                Route::resource('attributes', AttributeController::class)->except('index');
            });

            Route::group(['prefix' => 'adverts', 'as' => 'adverts.'], function () {
                Route::get('/', [AdminAdvertController::class, 'index'])->name('index');
                Route::get('/{advert}/edit', [AdminAdvertController::class, 'editForm'])->name('edit');
                Route::put('/{advert}/edit', [AdminAdvertController::class, 'edit']);
                Route::get('/{advert}/photos', [AdminAdvertController::class, 'photosForm'])->name('photos');
                Route::post('/{advert}/photos', [AdminAdvertController::class, 'photos']);
                Route::get('/{advert}/attributes', [AdminAdvertController::class, 'attributesForm'])->name('attributes');
                Route::post('/{advert}/attributes', [AdminAdvertController::class, 'attributes']);
                Route::post('/{advert}/moderate', [AdminAdvertController::class, 'moderate'])->name('moderate');
                Route::get('/{advert}/reject', [AdminAdvertController::class, 'rejectForm'])->name('reject');
                Route::post('/{advert}/reject', [AdminAdvertController::class, 'reject']);
                Route::delete('/{advert}/destroy', [AdminAdvertController::class, 'destroy'])->name('destroy');
            });
        });

        Route::group(['prefix' => 'banners', 'as' => 'banners.'], function () {
            Route::get('/', [AdminBannerController::class, 'index'])->name('index');
            Route::get('/{banner}/show', [AdminBannerController::class, 'show'])->name('show');
            Route::get('/{banner}/edit', [AdminBannerController::class, 'editForm'])->name('edit');
            Route::put('/{banner}/edit', [AdminBannerController::class, 'edit']);
            Route::post('/{banner}/moderate', [AdminBannerController::class, 'moderate'])->name('moderate');
            Route::get('/{banner}/reject', [AdminBannerController::class, 'rejectForm'])->name('reject');
            Route::post('/{banner}/reject', [AdminBannerController::class, 'reject']);
            Route::post('/{banner}/pay', [AdminBannerController::class, 'pay'])->name('pay');
            Route::delete('/{banner}/destroy', [AdminBannerController::class, 'destroy'])->name('destroy');
        });

        Route::group(['prefix' => 'tickets', 'as' => 'tickets.'], function () {
            Route::get('/', [AdminTicketController::class, 'index'])->name('index');
            Route::get('/{ticket}/show', [AdminTicketController::class, 'show'])->name('show');
            Route::get('/{ticket}/edit', [AdminTicketController::class, 'editForm'])->name('edit');
            Route::put('/{ticket}/edit', [AdminTicketController::class, 'edit']);
            Route::post('{ticket}/message', [AdminTicketController::class, 'message'])->name('message');
            Route::post('/{ticket}/close', [AdminTicketController::class, 'close'])->name('close');
            Route::post('/{ticket}/approve', [AdminTicketController::class, 'approve'])->name('approve');
            Route::post('/{ticket}/reopen', [AdminTicketController::class, 'reopen'])->name('reopen');
            Route::delete('/{ticket}/destroy', [AdminTicketController::class, 'destroy'])->name('destroy');
        });
    }
);

Route::get('/{page_path}', [PageController::class, 'show'])->name('page')->where('page_path', '.+');