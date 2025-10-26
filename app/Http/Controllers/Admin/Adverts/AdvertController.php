<?php

namespace App\Http\Controllers\Admin\Adverts;

use App\Entity\Adverts\Advert\Advert;
use App\Entity\User\User;
use App\Http\Controllers\Controller;
use App\Http\Requests\Adverts\AttributesRequest;
use App\Http\Requests\Adverts\EditRequest;
use App\Http\Requests\Adverts\PhotosRequest;
use App\Http\Requests\Adverts\RejectRequest;
use App\UseCases\Adverts\AdvertService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdvertController extends Controller
{
    private $service;

    public function __construct(AdvertService $service)
    {
        $this->service = $service;
        $this->middleware('can:manage-adverts');
    }

    public function index(Request $request)
    {
        $query = Advert::orderByDesc('updated_at');

        if (!empty($value = $request->get('id'))) {
            $query->where('id', $value);
        }

        if (!empty($value = $request->get('title'))) {
            $query->where('title', 'like', '%' . $value . '%');
        }

        if (!empty($value = $request->get('user'))) {
            $query->where('user_id', $value);
        }

        if (!empty($value = $request->get('region'))) {
            $query->where('region_id', $value);
        }

        if (!empty($value = $request->get('category'))) {
            $query->where('category_id', $value);
        }

        if (!empty($value = $request->get('status'))) {
            $query->where('status', $value);
        }

        $adverts = $query->with(['user', 'category', 'region'])->paginate(20);

        return Inertia::render('Admin/Adverts/Index', [
            'adverts' => $adverts,
        ]);
    }

    public function editForm(Advert $advert)
    {
        return Inertia::render('Cabinet/Adverts/Edit/Advert', [
            'advert' => $advert,
        ]);
    }

    public function edit(EditRequest $request, Advert $advert)
    {
        try {
            $this->service->edit($advert->id, $request);
        } catch (\DomainException $e) {
            return back()->with('error', $e->getMessage());
        }

        return to_route('adverts.show', $advert);
    }

    public function attributesForm(Advert $advert)
    {
        $advert->load('category.attributes', 'values');
        return Inertia::render('Cabinet/Adverts/Edit/Attributes', [
            'advert' => $advert,
        ]);
    }

    public function attributes(AttributesRequest $request, Advert $advert)
    {
        try {
            $this->service->editAttributes($advert->id, $request);
        } catch (\DomainException $e) {
            return back()->with('error', $e->getMessage());
        }

        return to_route('adverts.show', $advert);
    }

    public function photosForm(Advert $advert)
    {
        $advert->load('photos');
        return Inertia::render('Cabinet/Adverts/Edit/Photos', [
            'advert' => $advert,
        ]);
    }

    public function photos(PhotosRequest $request, Advert $advert)
    {
        try {
            $this->service->addPhotos($advert->id, $request);
        } catch (\DomainException $e) {
            return back()->with('error', $e->getMessage());
        }

        return to_route('adverts.show', $advert);
    }

    public function moderate(Advert $advert)
    {
        try {
            $this->service->moderate($advert->id);
        } catch (\DomainException $e) {
            return back()->with('error', $e->getMessage());
        }

        return to_route('adverts.show', $advert);
    }

    public function rejectForm(Advert $advert)
    {
        return Inertia::render('Admin/Adverts/Reject', [
            'advert' => $advert,
        ]);
    }

    public function reject(RejectRequest $request, Advert $advert)
    {
        try {
            $this->service->reject($advert->id, $request);
        } catch (\DomainException $e) {
            return back()->with('error', $e->getMessage());
        }

        return to_route('adverts.show', $advert);
    }

    public function destroy(Advert $advert)
    {
        try {
            $this->service->remove($advert->id);
        } catch (\DomainException $e) {
            return back()->with('error', $e->getMessage());
        }

        return to_route('admin.adverts.adverts.index');
    }
}
