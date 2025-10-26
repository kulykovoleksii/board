<?php

namespace App\Http\Controllers;

use App\Http\Router\PagePath;
use Inertia\Inertia;

class PageController extends Controller
{
    public function show(PagePath $path)
    {
        $page = $path->page;
        $page->load('children');

        return Inertia::render('Page', [
            'page' => $page,
        ]);
    }
}
