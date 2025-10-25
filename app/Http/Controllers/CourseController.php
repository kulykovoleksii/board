<?php

namespace App\Http\Controllers;

use App\Entity\Course\Course;
use Inertia\Inertia;

class CourseController extends Controller
{
    public function index()
    {
        $courses = Course::with('category')
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Courses/Index', [
            'courses' => $courses,
        ]);
    }

    public function show(Course $course)
    {
        $course->load('category', 'enrollments');

        return Inertia::render('Courses/Show', [
            'course' => $course,
        ]);
    }
}