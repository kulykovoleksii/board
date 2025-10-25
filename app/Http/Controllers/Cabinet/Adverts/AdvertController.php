<?php

namespace App\Http\Controllers\Cabinet\Adverts;

use App\Entity\Adverts\Advert\Advert;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AdvertController extends Controller
{
    public function index()
    {
        $adverts = Advert::forUser(Auth::user())
            ->with(['category', 'region'])
            ->orderByDesc('id')
            ->paginate(20);

        return Inertia::render('Cabinet/Adverts/Index', [
            'adverts' => $adverts,
        ]);
    }
}
