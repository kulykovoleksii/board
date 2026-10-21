<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\Auth\ResetPasswordController;
use App\Http\Controllers\Auth\VerificationController;
use App\Http\Controllers\Auth\NetworkController;
use App\Http\Controllers\Cabinet\HomeController as CabinetHomeController;
use App\Http\Controllers\Cabinet\ProfileController;
use App\Http\Controllers\Cabinet\PhoneController;
use App\Http\Controllers\Cabinet\SupportController;
use App\Http\Controllers\Admin\UploadController;
use App\Http\Controllers\Admin\HomeController as AdminHomeController;
use App\Http\Controllers\Admin\UsersController;
use App\Http\Controllers\Admin\RegionController;
use App\Http\Controllers\Admin\PageController as AdminPageController;
use App\Http\Controllers\Admin\SupportController as AdminSupportController;
use App\Http\Controllers\Admin\Courses\CourseController as AdminCourseController;
use App\Http\Controllers\Admin\Courses\ModuleController;
use App\Http\Controllers\Admin\Courses\LessonController;
use App\Http\Controllers\Admin\Courses\ContentController;

Route::get('/', [HomeController::class, 'index'])->name('home');

// Courses Routes
Route::get('courses', [CourseController::class, 'index'])->name('courses.index');
Route::get('courses/{course}', [CourseController::class, 'show'])->name('courses.show');

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

Route::group(
    [
        'prefix' => 'cabinet',
        'as' => 'cabinet.',
        'middleware' => ['auth'],
    ],
    function () {
        Route::get('/', [CabinetHomeController::class, 'index'])->name('home');

        Route::group(['prefix' => 'profile', 'as' => 'profile.'], function () {
            Route::get('/', [ProfileController::class, 'index'])->name('home');
            Route::get('/edit', [ProfileController::class, 'edit'])->name('edit');
            Route::put('/update', [ProfileController::class, 'update'])->name('update');

            Route::post('/phone', [PhoneController::class, 'request']);
            Route::get('/phone', [PhoneController::class, 'form'])->name('phone');
            Route::put('/phone', [PhoneController::class, 'verify'])->name('phone.verify');
            Route::post('/phone/auth', [PhoneController::class, 'auth'])->name('phone.auth');
        });

        Route::resource('support', SupportController::class)->only(['index', 'show', 'create', 'store', 'destroy']);
        Route::post('support/{ticket}/message', [SupportController::class, 'message'])->name('support.message');
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

        Route::group(['prefix' => 'courses', 'as' => 'courses.'], function () {
            Route::get('/', [AdminCourseController::class, 'index'])->name('index');
            Route::get('/create', [AdminCourseController::class, 'create'])->name('create');
            Route::post('/', [AdminCourseController::class, 'store'])->name('store');
            Route::get('/{course}', [AdminCourseController::class, 'show'])->name('show');
            Route::get('/{course}/edit', [AdminCourseController::class, 'edit'])->name('edit');
            Route::put('/{course}', [AdminCourseController::class, 'update'])->name('update');
            Route::delete('/{course}', [AdminCourseController::class, 'destroy'])->name('destroy');
            Route::post('/{course}/publish', [AdminCourseController::class, 'publish'])->name('publish');
            Route::post('/{course}/unpublish', [AdminCourseController::class, 'unpublish'])->name('unpublish');

            Route::post('/{course}/modules', [ModuleController::class, 'store'])->name('modules.store');
            Route::put('/{course}/modules/{module}', [ModuleController::class, 'update'])->name('modules.update');
            Route::delete('/{course}/modules/{module}', [ModuleController::class, 'destroy'])->name('modules.destroy');
            Route::post('/{course}/modules/{module}/reorder', [ModuleController::class, 'reorder'])->name('modules.reorder');

            Route::post('/{course}/modules/{module}/lessons', [LessonController::class, 'store'])->name('lessons.store');
            Route::put('/{course}/modules/{module}/lessons/{lesson}', [LessonController::class, 'update'])->name('lessons.update');
            Route::delete('/{course}/modules/{module}/lessons/{lesson}', [LessonController::class, 'destroy'])->name('lessons.destroy');
            Route::post('/{course}/modules/{module}/lessons/{lesson}/reorder', [LessonController::class, 'reorder'])->name('lessons.reorder');

            Route::get('/{course}/lessons/{lesson}/contents', [ContentController::class, 'index'])->name('contents.index');
            Route::post('/{course}/lessons/{lesson}/contents', [ContentController::class, 'store'])->name('contents.store');
            Route::put('/{course}/lessons/{lesson}/contents/{content}', [ContentController::class, 'update'])->name('contents.update');
            Route::delete('/{course}/lessons/{lesson}/contents/{content}', [ContentController::class, 'destroy'])->name('contents.destroy');
            Route::post('/{course}/lessons/{lesson}/contents/{content}/reorder', [ContentController::class, 'reorder'])->name('contents.reorder');
        });

        Route::group(['prefix' => 'support', 'as' => 'support.'], function () {
            Route::get('/', [AdminSupportController::class, 'index'])->name('index');
            Route::get('/{ticket}/show', [AdminSupportController::class, 'show'])->name('show');
            Route::get('/{ticket}/edit', [AdminSupportController::class, 'editForm'])->name('edit');
            Route::put('/{ticket}/edit', [AdminSupportController::class, 'edit']);
            Route::post('{ticket}/message', [AdminSupportController::class, 'message'])->name('message');
            Route::post('/{ticket}/close', [AdminSupportController::class, 'close'])->name('close');
            Route::post('/{ticket}/approve', [AdminSupportController::class, 'approve'])->name('approve');
            Route::post('/{ticket}/reopen', [AdminSupportController::class, 'reopen'])->name('reopen');
            Route::delete('/{ticket}/destroy', [AdminSupportController::class, 'destroy'])->name('destroy');
        });
    }
);

Route::get('/{page_path}', [PageController::class, 'show'])->name('page')->where('page_path', '.+');
