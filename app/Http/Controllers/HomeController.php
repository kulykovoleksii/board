<?php

namespace App\Http\Controllers;

use App\Entity\Course\Course;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $course = Course::published()->orderBy('published_at')->first();

        return Inertia::render('Welcome', [
            'course' => $course,
        ]);
    }
}
