<?php

namespace App\Http\Controllers;

use App\Entity\Adverts\Category;
use Kulykovoleksii\Geocoding\Models\Region;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $regions = Region::roots()->orderBy('name')->getModels();

        $categories = Category::whereIsRoot()->defaultOrder()->getModels();

        return Inertia::render('Welcome', [
            'regions' => $regions,
            'categories' => $categories,
        ]);
    }
}
