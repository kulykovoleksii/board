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
        $course->load([
            'category',
            'instructor',
            'publishedModules.publishedLessons.contents' => function ($query) {
                $query->orderBy('position');
            }
        ]);

        // Get user enrollment if logged in
        $enrollment = null;
        if (auth()->check()) {
            $enrollment = $course->enrollments()
                ->where('student_id', auth()->id())
                ->with('lessonProgress')
                ->first();
        }

        return Inertia::render('Courses/Show', [
            'course' => $course,
            'enrollment' => $enrollment,
            'isEnrolled' => $enrollment !== null,
        ]);
    }
}