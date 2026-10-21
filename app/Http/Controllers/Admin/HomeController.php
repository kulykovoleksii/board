<?php

namespace App\Http\Controllers\Admin;

use App\Entity\Adverts\Advert\Advert;
use App\Entity\Course\Course;
use App\Entity\User\User;
use App\Http\Controllers\Controller;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $stats = [
            'users' => User::count(),
            'adverts' => Advert::count(),
            'active_adverts' => Advert::where('status', Advert::STATUS_ACTIVE)->count(),
            'moderation_adverts' => Advert::where('status', Advert::STATUS_MODERATION)->count(),
            'banners' => 0,
            'tickets' => 0,
            'courses' => Course::count(),
        ];

        return Inertia::render('Admin/Home', [
            'stats' => $stats,
        ]);
    }
}
