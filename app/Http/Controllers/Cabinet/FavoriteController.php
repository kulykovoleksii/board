<?php

namespace App\Http\Controllers\Cabinet;

use App\Entity\Adverts\Advert\Advert;
use App\Http\Controllers\Controller;
use App\UseCases\Adverts\FavoriteService;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class FavoriteController extends Controller
{
    private $service;

    public function __construct(FavoriteService $service)
    {
        $this->service = $service;
        $this->middleware('auth');
    }

    public function index()
    {
        $adverts = Advert::favoredByUser(Auth::user())
            ->with(['category', 'region', 'photos'])
            ->orderByDesc('id')
            ->paginate(20);

        return Inertia::render('Cabinet/Favorites/Index', [
            'adverts' => $adverts,
        ]);
    }

    public function remove(Advert $advert)
    {
        try {
            $this->service->remove(Auth::id(), $advert->id);
        } catch (\DomainException $e) {
            return back()->with('error', $e->getMessage());
        }

        return to_route('cabinet.favorites.index');
    }
}
