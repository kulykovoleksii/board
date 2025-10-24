<?php

namespace App\Http\Controllers\Admin\Courses;

use App\Entity\Course\CourseCategory;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    public function __construct()
    {
        $this->middleware('can:manage-courses');
    }

    public function index()
    {
        $categories = CourseCategory::defaultOrder()->withDepth()->get();

        return view('admin.courses.categories.index', compact('categories'));
    }

    public function create()
    {
        $parents = CourseCategory::defaultOrder()->withDepth()->get();

        return view('admin.courses.categories.create', compact('parents'));
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'name_uk' => 'required|string|max:255',
            'name_en' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:course_categories,slug',
            'description_uk' => 'nullable|string',
            'description_en' => 'nullable|string',
            'icon' => 'nullable|string|max:255',
            'sort_order' => 'nullable|integer',
            'parent_id' => 'nullable|integer|exists:course_categories,id',
        ]);

        $category = CourseCategory::create([
            'name_uk' => $request->name_uk,
            'name_en' => $request->name_en,
            'slug' => $request->slug,
            'description_uk' => $request->description_uk,
            'description_en' => $request->description_en,
            'icon' => $request->icon,
            'sort_order' => $request->sort_order ?? 0,
            'parent_id' => $request->parent_id,
        ]);

        return redirect()->route('admin.courses.categories.show', $category)
            ->with('success', 'Category created successfully');
    }

    public function show(CourseCategory $category)
    {
        $category->load(['courses', 'children']);

        return view('admin.courses.categories.show', compact('category'));
    }

    public function edit(CourseCategory $category)
    {
        $parents = CourseCategory::defaultOrder()->withDepth()->where('id', '!=', $category->id)->get();

        return view('admin.courses.categories.edit', compact('category', 'parents'));
    }

    public function update(Request $request, CourseCategory $category)
    {
        $this->validate($request, [
            'name_uk' => 'required|string|max:255',
            'name_en' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:course_categories,slug,' . $category->id,
            'description_uk' => 'nullable|string',
            'description_en' => 'nullable|string',
            'icon' => 'nullable|string|max:255',
            'sort_order' => 'nullable|integer',
            'parent_id' => 'nullable|integer|exists:course_categories,id',
        ]);

        $category->update([
            'name_uk' => $request->name_uk,
            'name_en' => $request->name_en,
            'slug' => $request->slug,
            'description_uk' => $request->description_uk,
            'description_en' => $request->description_en,
            'icon' => $request->icon,
            'sort_order' => $request->sort_order ?? 0,
            'parent_id' => $request->parent_id,
        ]);

        return redirect()->route('admin.courses.categories.show', $category)
            ->with('success', 'Category updated successfully');
    }

    public function destroy(CourseCategory $category)
    {
        $category->delete();

        return redirect()->route('admin.courses.categories.index')
            ->with('success', 'Category deleted successfully');
    }
}