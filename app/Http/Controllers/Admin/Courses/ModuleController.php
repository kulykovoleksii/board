<?php

namespace App\Http\Controllers\Admin\Courses;

use App\Entity\Course\Course;
use App\Entity\Course\CourseModule;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ModuleController extends Controller
{
    public function store(Request $request, Course $course)
    {
        $validated = $request->validate([
            'title_uk' => 'required|string|max:255',
            'title_en' => 'required|string|max:255',
            'description_uk' => 'nullable|string',
            'description_en' => 'nullable|string',
            'position' => 'nullable|integer|min:0',
            'is_published' => 'nullable|boolean',
        ]);

        $validated['is_published'] = $validated['is_published'] ?? true;

        // Auto-set position if not provided
        if (!isset($validated['position'])) {
            $validated['position'] = $course->modules()->max('position') + 1;
        }

        $course->modules()->create($validated);

        return back();
    }

    public function update(Request $request, Course $course, CourseModule $module)
    {
        $validated = $request->validate([
            'title_uk' => 'required|string|max:255',
            'title_en' => 'required|string|max:255',
            'description_uk' => 'nullable|string',
            'description_en' => 'nullable|string',
            'position' => 'nullable|integer|min:0',
            'is_published' => 'nullable|boolean',
        ]);

        $module->update($validated);

        return back();
    }

    public function destroy(Course $course, CourseModule $module)
    {
        $module->delete();

        return back();
    }

    public function reorder(Request $request, Course $course, CourseModule $module)
    {
        $validated = $request->validate([
            'position' => 'required|integer|min:0',
        ]);

        $module->update(['position' => $validated['position']]);

        return back();
    }
}
