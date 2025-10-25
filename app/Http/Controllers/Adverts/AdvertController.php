<?php

namespace App\Http\Controllers\Adverts;

use App\Entity\Adverts\Advert\Advert;
use App\Entity\Adverts\Category;
use App\Entity\Region;
use App\Http\Controllers\Controller;
use App\Http\Requests\Adverts\SearchRequest;
use App\Http\Router\AdvertsPath;
use App\ReadModel\AdvertReadRepository;
use App\UseCases\Adverts\SearchService;
use Illuminate\Contracts\Auth\Guard;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class AdvertController extends Controller
{
    private $search;

    public function __construct(SearchService $search)
    {
        $this->search = $search;
    }

    public function index(SearchRequest $request, AdvertsPath $path)
    {
        $region = $path->region;
        $category = $path->category;

        $result = $this->search->search($category, $region, $request, 20, $request->get('page', 1));

        $adverts = $result->adverts;
        $regionsCounts = $result->regionsCounts;
        $categoriesCounts = $result->categoriesCounts;

        $query = $region ? $region->children() : Region::roots();
        $regions = $query->orderBy('name')->getModels();

        $query = $category ? $category->children() : Category::whereIsRoot();
        $categories = $query->defaultOrder()->getModels();

        $regions = array_filter($regions, function (Region $region) use ($regionsCounts) {
            return isset($regionsCounts[$region->id]) && $regionsCounts[$region->id] > 0;
        });

        $categories = array_filter($categories, function (Category $category) use ($categoriesCounts) {
            return isset($categoriesCounts[$category->id]) && $categoriesCounts[$category->id] > 0;
        });

        return Inertia::render('Adverts/Index', [
            'category' => $category,
            'region' => $region,
            'categories' => array_values($categories),
            'regions' => array_values($regions),
            'regionsCounts' => $regionsCounts,
            'categoriesCounts' => $categoriesCounts,
            'adverts' => $adverts,
        ]);
    }

    public function show(Advert $advert)
    {
        if (!($advert->isActive() || Gate::allows('show-advert', $advert))) {
            abort(403);
        }

        $advert->load('user', 'category', 'region', 'values.attribute', 'photos');

        // Check if in favorites
        $isFavorite = false;
        if ($user = Auth::user()) {
            $isFavorite = $user->favorites()->where('advert_id', $advert->id)->exists();
        }

        return Inertia::render('Adverts/Show', [
            'advert' => array_merge($advert->toArray(), [
                'is_favorite' => $isFavorite,
            ]),
        ]);
    }

    public function phone(Advert $advert): string
    {
        if (!($advert->isActive() || Gate::allows('show-advert', $advert))) {
            abort(403);
        }

        return $advert->user->phone;
    }
}
