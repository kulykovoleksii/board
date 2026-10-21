<?php

namespace App\Http\Controllers\Admin;

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
            'tickets' => 0,
            'courses' => Course::count(),
        ];

        return Inertia::render('Admin/Home', [
            'stats' => $stats,
        ]);
    }
}
