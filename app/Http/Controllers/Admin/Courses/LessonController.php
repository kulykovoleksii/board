<?php

namespace App\Http\Controllers\Admin\Courses;

use App\Entity\Course\Course;
use App\Entity\Course\CourseLesson;
use App\Entity\Course\CourseModule;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LessonController extends Controller
{
    public function store(Request $request, Course $course, CourseModule $module)
    {
        $validated = $request->validate([
            'title_uk' => 'required|string|max:255',
            'title_en' => 'required|string|max:255',
            'description_uk' => 'nullable|string',
            'description_en' => 'nullable|string',
            'position' => 'nullable|integer|min:0',
            'duration_minutes' => 'nullable|integer|min:0',
            'is_published' => 'nullable|boolean',
            'is_free' => 'nullable|boolean',
        ]);

        $validated['is_published'] = $validated['is_published'] ?? true;
        $validated['is_free'] = $validated['is_free'] ?? false;
        $validated['duration_minutes'] = $validated['duration_minutes'] ?? 0;

        // Auto-set position if not provided
        if (!isset($validated['position'])) {
            $validated['position'] = $module->lessons()->max('position') + 1;
        }

        $module->lessons()->create($validated);

        return back();
    }

    public function update(Request $request, Course $course, CourseModule $module, CourseLesson $lesson)
    {
        $validated = $request->validate([
            'title_uk' => 'required|string|max:255',
            'title_en' => 'required|string|max:255',
            'description_uk' => 'nullable|string',
            'description_en' => 'nullable|string',
            'position' => 'nullable|integer|min:0',
            'duration_minutes' => 'nullable|integer|min:0',
            'is_published' => 'nullable|boolean',
            'is_free' => 'nullable|boolean',
        ]);

        $lesson->update($validated);

        return back();
    }

    public function destroy(Course $course, CourseModule $module, CourseLesson $lesson)
    {
        $lesson->delete();

        return back();
    }

    public function reorder(Request $request, Course $course, CourseModule $module, CourseLesson $lesson)
    {
        $validated = $request->validate([
            'position' => 'required|integer|min:0',
        ]);

        $lesson->update(['position' => $validated['position']]);

        return back();
    }
}
