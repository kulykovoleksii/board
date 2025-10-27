<?php

namespace App\Http\Controllers\Admin\Courses;

use App\Entity\Course\Course;
use App\Entity\Course\CourseLesson;
use App\Entity\Course\CourseLessonContent;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContentController extends Controller
{
    public function index(Course $course, CourseLesson $lesson)
    {
        $lesson->load(['contents' => function ($query) {
            $query->orderBy('position');
        }]);

        // Load markdown content for each markdown file
        $lesson->contents->each(function ($content) {
            if ($content->isMarkdownFile()) {
                $content->markdown_uk = $content->getMarkdownContent('uk');
                $content->markdown_en = $content->getMarkdownContent('en');
            }
        });

        return Inertia::render('Admin/Courses/LessonContent', [
            'course' => $course,
            'lesson' => $lesson,
            'contentTypes' => CourseLessonContent::typesList(),
        ]);
    }

    public function store(Request $request, Course $course, CourseLesson $lesson)
    {
        $validated = $request->validate([
            'type' => 'required|in:' . implode(',', array_keys(CourseLessonContent::typesList())),
            'content_uk' => 'nullable|string',
            'content_en' => 'nullable|string',
            'markdown_uk' => 'nullable|string',
            'markdown_en' => 'nullable|string',
            'file_path' => 'nullable|string',
            'file_url' => 'nullable|url',
            'thumbnail' => 'nullable|string',
            'duration_seconds' => 'nullable|integer|min:0',
            'file_name' => 'nullable|string',
            'file_size' => 'nullable|integer|min:0',
            'mime_type' => 'nullable|string',
            'position' => 'nullable|integer|min:0',
        ]);

        // Auto-set position if not provided
        if (!isset($validated['position'])) {
            $validated['position'] = $lesson->contents()->max('position') + 1;
        }

        // Remove markdown from validated data (it's not a DB column)
        $markdownUk = $validated['markdown_uk'] ?? null;
        $markdownEn = $validated['markdown_en'] ?? null;
        unset($validated['markdown_uk'], $validated['markdown_en']);

        $content = $lesson->contents()->create($validated);

        // Save markdown files if type is markdown_file
        if ($content->isMarkdownFile()) {
            if ($markdownUk) {
                $content->saveMarkdownContent($markdownUk, 'uk');
            }
            if ($markdownEn) {
                $content->saveMarkdownContent($markdownEn, 'en');
            }
        }

        return back();
    }

    public function update(Request $request, Course $course, CourseLesson $lesson, CourseLessonContent $content)
    {
        $validated = $request->validate([
            'type' => 'required|in:' . implode(',', array_keys(CourseLessonContent::typesList())),
            'content_uk' => 'nullable|string',
            'content_en' => 'nullable|string',
            'markdown_uk' => 'nullable|string',
            'markdown_en' => 'nullable|string',
            'file_path' => 'nullable|string',
            'file_url' => 'nullable|url',
            'thumbnail' => 'nullable|string',
            'duration_seconds' => 'nullable|integer|min:0',
            'file_name' => 'nullable|string',
            'file_size' => 'nullable|integer|min:0',
            'mime_type' => 'nullable|string',
            'position' => 'nullable|integer|min:0',
        ]);

        // Remove markdown from validated data (it's not a DB column)
        $markdownUk = $validated['markdown_uk'] ?? null;
        $markdownEn = $validated['markdown_en'] ?? null;
        unset($validated['markdown_uk'], $validated['markdown_en']);

        $content->update($validated);

        // Save markdown files if type is markdown_file
        if ($content->isMarkdownFile()) {
            if ($markdownUk !== null) {
                $content->saveMarkdownContent($markdownUk, 'uk');
            }
            if ($markdownEn !== null) {
                $content->saveMarkdownContent($markdownEn, 'en');
            }
        }

        return back();
    }

    public function destroy(Course $course, CourseLesson $lesson, CourseLessonContent $content)
    {
        $content->delete();

        return back();
    }

    public function reorder(Request $request, Course $course, CourseLesson $lesson, CourseLessonContent $content)
    {
        $validated = $request->validate([
            'position' => 'required|integer|min:0',
        ]);

        $content->update(['position' => $validated['position']]);

        return back();
    }
}