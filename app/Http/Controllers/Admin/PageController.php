<?php

namespace App\Http\Controllers\Admin;

use App\Entity\Page;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Pages\PageRequest;
use Inertia\Inertia;

class PageController extends Controller
{
    public function __construct()
    {
        $this->middleware('can:manage-pages');
    }

    public function index()
    {
        $pages = Page::defaultOrder()->withDepth()->get();

        return Inertia::render('Admin/Pages/Index', [
            'pages' => $pages,
        ]);
    }

    public function create()
    {
        $parents = Page::defaultOrder()->withDepth()->get();

        return Inertia::render('Admin/Pages/Create', [
            'parents' => $parents,
        ]);
    }

    public function store(PageRequest $request)
    {
        $page = Page::create([
            'title' => $request['title'],
            'slug' => $request['slug'],
            'menu_title' => $request['menu_title'],
            'parent_id' => $request['parent'],
            'content' => $request['content'],
            'description' => $request['description'],
        ]);

        return to_route('admin.pages.show', $page);
    }

    public function show(Page $page)
    {
        return Inertia::render('Admin/Pages/Show', [
            'page' => $page,
        ]);
    }

    public function edit(Page $page)
    {
        $parents = Page::defaultOrder()->withDepth()->get();

        return Inertia::render('Admin/Pages/Edit', [
            'page' => $page,
            'parents' => $parents,
        ]);
    }

    public function update(PageRequest $request, Page $page)
    {
        $page->update([
            'title' => $request['title'],
            'slug' => $request['slug'],
            'menu_title' => $request['menu_title'],
            'parent_id' => $request['parent'],
            'content' => $request['content'],
            'description' => $request['description'],
        ]);

        return to_route('admin.pages.show', $page);
    }

    public function first(Page $page)
    {
        if ($first = $page->siblings()->defaultOrder()->first()) {
            $page->insertBeforeNode($first);
        }

        return to_route('admin.pages.index');
    }

    public function up(Page $page)
    {
        $page->up();

        return to_route('admin.pages.index');
    }

    public function down(Page $page)
    {
        $page->down();

        return to_route('admin.pages.index');
    }

    public function last(Page $page)
    {
        if ($last = $page->siblings()->defaultOrder('desc')->first()) {
            $page->insertAfterNode($last);
        }

        return to_route('admin.pages.index');
    }

    public function destroy(Page $page)
    {
        $page->delete();

        return to_route('admin.pages.index');
    }
}
