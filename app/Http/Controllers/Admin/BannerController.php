<?php

namespace App\Http\Controllers\Admin;

use App\Entity\Banner\Banner;
use App\Entity\User\User;
use App\Http\Controllers\Controller;
use App\Http\Requests\Banner\EditRequest;
use App\Http\Requests\Banner\RejectRequest;
use App\UseCases\Banners\BannerService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BannerController extends Controller
{
    private $service;

    public function __construct(BannerService $service)
    {
        $this->service = $service;
        $this->middleware('can:manage-banners');
    }

    public function index(Request $request)
    {
        $query = Banner::with(['user', 'region', 'category'])->orderByDesc('updated_at');

        if (!empty($value = $request->get('id'))) {
            $query->where('id', $value);
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

        $banners = $query->paginate(20);

        $statuses = Banner::statusesList();

        return Inertia::render('Admin/Banners/Index', [
            'banners' => $banners,
            'statuses' => $statuses,
            'filters' => [
                'id' => $request->get('id'),
                'user' => $request->get('user'),
                'region' => $request->get('region'),
                'category' => $request->get('category'),
                'status' => $request->get('status'),
            ],
        ]);
    }

    public function show(Banner $banner)
    {
        $banner->load('category', 'region');

        return Inertia::render('Admin/Banners/Show', [
            'banner' => $banner,
        ]);
    }

    public function editForm(Banner $banner)
    {
        return Inertia::render('Admin/Banners/Edit', [
            'banner' => $banner,
        ]);
    }

    public function edit(EditRequest $request, Banner $banner)
    {
        try {
            $this->service->editByAdmin($banner->id, $request);
        } catch (\DomainException $e) {
            return back()->with('error', $e->getMessage());
        }

        return to_route('admin.banners.show', $banner);
    }

    public function moderate(Banner $banner)
    {
        try {
            $this->service->moderate($banner->id);
        } catch (\DomainException $e) {
            return back()->with('error', $e->getMessage());
        }

        return to_route('admin.banners.show', $banner);
    }

    public function rejectForm(Banner $banner)
    {
        return Inertia::render('Admin/Banners/Reject', [
            'banner' => $banner,
        ]);
    }

    public function reject(RejectRequest $request, Banner $banner)
    {
        try {
            $this->service->reject($banner->id, $request);
        } catch (\DomainException $e) {
            return back()->with('error', $e->getMessage());
        }

        return to_route('admin.banners.show', $banner);
    }

    public function pay(Banner $banner)
    {
        try {
            $this->service->pay($banner->id);
        } catch (\DomainException $e) {
            return back()->with('error', $e->getMessage());
        }

        return to_route('admin.banners.show', $banner);
    }

    public function destroy(Banner $banner)
    {
        try {
            $this->service->removeByAdmin($banner->id);
        } catch (\DomainException $e) {
            return back()->with('error', $e->getMessage());
        }

        return to_route('admin.banners.index');
    }
}
