<?php

namespace App\Http\Controllers\Cabinet\Banners;

use App\Entity\Adverts\Category;
use App\Entity\Banner\Banner;
use App\Entity\Region;
use App\Http\Controllers\Controller;
use App\Http\Requests\Banner\CreateRequest;
use App\UseCases\Banners\BannerService;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CreateController extends Controller
{
    private $service;

    public function __construct(BannerService $service)
    {
        $this->service = $service;
    }

    public function category()
    {
        $categories = Category::defaultOrder()->withDepth()->get()->toTree();

        return Inertia::render('Cabinet/Banners/Create/Category', [
            'categories' => $categories,
        ]);
    }

    public function region(Category $category, Region $region = null)
    {
        $regions = Region::where('parent_id', $region ? $region->id : null)->orderBy('name')->get();

        return Inertia::render('Cabinet/Banners/Create/Region', [
            'category' => $category,
            'region' => $region,
            'regions' => $regions,
        ]);
    }

    public function banner(Category $category, Region $region = null)
    {
        $formats = Banner::formatsList();

        return Inertia::render('Cabinet/Banners/Create/Banner', [
            'category' => $category,
            'region' => $region,
            'formats' => $formats,
        ]);
    }

    public function store(CreateRequest $request, Category $category, Region $region = null)
    {
        try {
            $banner = $this->service->create(
                Auth::user(),
                $category,
                $region,
                $request
            );
        } catch (\DomainException $e) {
            return back()->with('error', $e->getMessage());
        }

        return to_route('cabinet.banners.show', $banner);
    }
}
