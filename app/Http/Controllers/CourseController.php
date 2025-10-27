<?php

namespace App\Http\Controllers;

use App\Entity\Course\Course;
use Inertia\Inertia;

class CourseController extends Controller
{
    public function index()
    {
        $query = Course::query()
            ->with('category')
            ->published();

        // Search filter
        if ($search = request('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('title_en', 'like', "%{$search}%")
                  ->orWhere('title_uk', 'like', "%{$search}%")
                  ->orWhere('description_en', 'like', "%{$search}%")
                  ->orWhere('description_uk', 'like', "%{$search}%");
            });
        }

        // Category filter
        if ($categoryId = request('category')) {
            $query->byCategory($categoryId);
        }

        // Level filter
        if ($level = request('level')) {
            $query->byLevel($level);
        }

        // Price filter
        if ($price = request('price')) {
            if ($price === 'free') {
                $query->free();
            } elseif ($price === 'paid') {
                $query->paid();
            }
        }

        $courses = $query->orderBy('created_at', 'desc')->get();

        // Get categories for filter dropdown
        $categories = \App\Entity\Course\CourseCategory::orderBy('name_en')->get();

        return Inertia::render('Courses/Index', [
            'courses' => $courses,
            'categories' => $categories,
            'filters' => [
                'search' => request('search'),
                'category' => request('category'),
                'level' => request('level'),
                'price' => request('price'),
            ],
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