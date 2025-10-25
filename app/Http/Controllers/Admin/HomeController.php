<?php

namespace App\Http\Controllers\Admin;

use App\Entity\Adverts\Advert\Advert;
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
            'banners' => 0, // Placeholder
            'tickets' => 0, // Placeholder
        ];

        return Inertia::render('Admin/Home', [
            'stats' => $stats,
        ]);
    }
}
