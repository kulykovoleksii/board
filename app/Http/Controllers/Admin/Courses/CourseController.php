<?php

namespace App\Http\Controllers\Admin\Courses;

use App\Entity\Course\Course;
use App\Entity\Course\CourseCategory;
use App\Entity\Tag\Tag;
use App\Entity\User\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CourseController extends Controller
{
    public function __construct()
    {
        $this->middleware('can:manage-courses');
    }

    public function index(Request $request)
    {
        $query = Course::with(['instructor', 'category', 'tags']);

        // Filter by status
        if ($request->filled('status')) {
            if ($request->status === 'published') {
                $query->published();
            } elseif ($request->status === 'draft') {
                $query->where('is_published', false);
            }
        }

        // Filter by category
        if ($request->filled('category_id')) {
            $query->byCategory($request->category_id);
        }

        // Filter by level
        if ($request->filled('level')) {
            $query->byLevel($request->level);
        }

        // Filter by instructor
        if ($request->filled('instructor_id')) {
            $query->byInstructor($request->instructor_id);
        }

        // Search by title
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('title_uk', 'like', "%{$search}%")
                  ->orWhere('title_en', 'like', "%{$search}%");
            });
        }

        $courses = $query->latest()->paginate(20);

        $categories = CourseCategory::defaultOrder()->get();
        $instructors = User::where('role', User::ROLE_INSTRUCTOR)->get();

        return view('admin.courses.index', compact('courses', 'categories', 'instructors'));
    }

    public function create()
    {
        $categories = CourseCategory::defaultOrder()->get();
        $instructors = User::where('role', User::ROLE_INSTRUCTOR)->get();
        $tags = Tag::orderBy('name_en')->get();

        return view('admin.courses.create', compact('categories', 'instructors', 'tags'));
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'instructor_id' => 'required|integer|exists:users,id',
            'category_id' => 'nullable|integer|exists:course_categories,id',
            'title_uk' => 'required|string|max:255',
            'title_en' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:courses,slug',
            'short_description_uk' => 'nullable|string',
            'short_description_en' => 'nullable|string',
            'description_uk' => 'nullable|string',
            'description_en' => 'nullable|string',
            'level' => 'required|in:' . implode(',', array_keys(Course::levelsList())),
            'language' => 'required|in:' . implode(',', array_keys(Course::languagesList())),
            'price' => 'nullable|numeric|min:0',
            'duration_minutes' => 'nullable|integer|min:0',
            'thumbnail' => 'nullable|string',
            'trailer_video_url' => 'nullable|url',
            'tags' => 'nullable|array',
            'tags.*' => 'integer|exists:tags,id',
        ]);

        $course = Course::create([
            'instructor_id' => $request->instructor_id,
            'category_id' => $request->category_id,
            'title_uk' => $request->title_uk,
            'title_en' => $request->title_en,
            'slug' => $request->slug,
            'short_description_uk' => $request->short_description_uk,
            'short_description_en' => $request->short_description_en,
            'description_uk' => $request->description_uk,
            'description_en' => $request->description_en,
            'level' => $request->level,
            'language' => $request->language,
            'price' => $request->price,
            'duration_minutes' => $request->duration_minutes ?? 0,
            'thumbnail' => $request->thumbnail,
            'trailer_video_url' => $request->trailer_video_url,
        ]);

        if ($request->filled('tags')) {
            $course->syncTags($request->tags);
        }

        return redirect()->route('admin.courses.show', $course)
            ->with('success', 'Course created successfully');
    }

    public function show(Course $course)
    {
        $course->load(['instructor', 'category', 'tags', 'enrollments.student']);

        return view('admin.courses.show', compact('course'));
    }

    public function edit(Course $course)
    {
        $categories = CourseCategory::defaultOrder()->get();
        $instructors = User::where('role', User::ROLE_INSTRUCTOR)->get();
        $tags = Tag::orderBy('name_en')->get();

        return view('admin.courses.edit', compact('course', 'categories', 'instructors', 'tags'));
    }

    public function update(Request $request, Course $course)
    {
        $this->validate($request, [
            'instructor_id' => 'required|integer|exists:users,id',
            'category_id' => 'nullable|integer|exists:course_categories,id',
            'title_uk' => 'required|string|max:255',
            'title_en' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:courses,slug,' . $course->id,
            'short_description_uk' => 'nullable|string',
            'short_description_en' => 'nullable|string',
            'description_uk' => 'nullable|string',
            'description_en' => 'nullable|string',
            'level' => 'required|in:' . implode(',', array_keys(Course::levelsList())),
            'language' => 'required|in:' . implode(',', array_keys(Course::languagesList())),
            'price' => 'nullable|numeric|min:0',
            'duration_minutes' => 'nullable|integer|min:0',
            'thumbnail' => 'nullable|string',
            'trailer_video_url' => 'nullable|url',
            'tags' => 'nullable|array',
            'tags.*' => 'integer|exists:tags,id',
        ]);

        $course->update([
            'instructor_id' => $request->instructor_id,
            'category_id' => $request->category_id,
            'title_uk' => $request->title_uk,
            'title_en' => $request->title_en,
            'slug' => $request->slug,
            'short_description_uk' => $request->short_description_uk,
            'short_description_en' => $request->short_description_en,
            'description_uk' => $request->description_uk,
            'description_en' => $request->description_en,
            'level' => $request->level,
            'language' => $request->language,
            'price' => $request->price,
            'duration_minutes' => $request->duration_minutes ?? 0,
            'thumbnail' => $request->thumbnail,
            'trailer_video_url' => $request->trailer_video_url,
        ]);

        if ($request->has('tags')) {
            $course->syncTags($request->tags ?? []);
        }

        return redirect()->route('admin.courses.show', $course)
            ->with('success', 'Course updated successfully');
    }

    public function destroy(Course $course)
    {
        $course->delete();

        return redirect()->route('admin.courses.index')
            ->with('success', 'Course deleted successfully');
    }

    public function publish(Course $course)
    {
        $course->publish();

        return redirect()->back()
            ->with('success', 'Course published successfully');
    }

    public function unpublish(Course $course)
    {
        $course->unpublish();

        return redirect()->back()
            ->with('success', 'Course unpublished successfully');
    }
}