<?php

namespace App\Http\Controllers\Admin;

use App\Entity\Tag\Tag;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class TagController extends Controller
{
    public function __construct()
    {
        $this->middleware('can:manage-courses');
    }

    public function index()
    {
        $tags = Tag::orderBy('name_en')->paginate(20);

        return view('admin.tags.index', compact('tags'));
    }

    public function create()
    {
        return view('admin.tags.create');
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'name_uk' => 'required|string|max:255',
            'name_en' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:tags,slug',
        ]);

        $tag = Tag::create([
            'name_uk' => $request->name_uk,
            'name_en' => $request->name_en,
            'slug' => $request->slug,
        ]);

        return redirect()->route('admin.tags.index')
            ->with('success', 'Tag created successfully');
    }

    public function edit(Tag $tag)
    {
        return view('admin.tags.edit', compact('tag'));
    }

    public function update(Request $request, Tag $tag)
    {
        $this->validate($request, [
            'name_uk' => 'required|string|max:255',
            'name_en' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:tags,slug,' . $tag->id,
        ]);

        $tag->update([
            'name_uk' => $request->name_uk,
            'name_en' => $request->name_en,
            'slug' => $request->slug,
        ]);

        return redirect()->route('admin.tags.index')
            ->with('success', 'Tag updated successfully');
    }

    public function destroy(Tag $tag)
    {
        $tag->delete();

        return redirect()->route('admin.tags.index')
            ->with('success', 'Tag deleted successfully');
    }
}