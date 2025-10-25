<?php

namespace App\Http\Controllers\Cabinet\Banners;

use App\Entity\Banner\Banner;
use App\Http\Controllers\Controller;
use App\Http\Requests\Banner\EditRequest;
use App\Http\Requests\Banner\FileRequest;
use App\UseCases\Banners\BannerService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class BannerController extends Controller
{
    private $service;

    public function __construct(BannerService $service)
    {
        $this->service = $service;
    }
    
    public function index()
    {
        $banners = Banner::forUser(Auth::user())
            ->with(['category', 'region'])
            ->orderByDesc('id')
            ->paginate(20);

        return Inertia::render('Cabinet/Banners/Index', [
            'banners' => $banners,
        ]);
    }

    public function show(Banner $banner)
    {
        $this->checkAccess($banner);
        $banner->load(['category', 'region']);

        return Inertia::render('Cabinet/Banners/Show', [
            'banner' => $banner,
        ]);
    }

    public function editForm(Banner $banner)
    {
        $this->checkAccess($banner);
        if (!$banner->canBeChanged()) {
            return to_route('cabinet.banners.show', $banner)->with('error', 'Unable to edit.');
        }

        return Inertia::render('Cabinet/Banners/Edit', [
            'banner' => $banner,
        ]);
    }

    public function edit(EditRequest $request, Banner $banner)
    {
        $this->checkAccess($banner);
        try {
            $this->service->editByOwner($banner->id, $request);
        } catch (\DomainException $e) {
            return back()->with('error', $e->getMessage());
        }

        return to_route('cabinet.banners.show', $banner);
    }

    public function fileForm(Banner $banner)
    {
        $this->checkAccess($banner);
        if (!$banner->canBeChanged()) {
            return to_route('cabinet.banners.show', $banner)->with('error', 'Unable to edit.');
        }
        $formats = Banner::formatsList();

        return Inertia::render('Cabinet/Banners/File', [
            'banner' => $banner,
            'formats' => $formats,
        ]);
    }

    public function file(FileRequest $request, Banner $banner)
    {
        $this->checkAccess($banner);
        try {
            $this->service->changeFile($banner->id, $request);
        } catch (\DomainException $e) {
            return back()->with('error', $e->getMessage());
        }

        return to_route('cabinet.banners.show', $banner);
    }

    public function send(Banner $banner)
    {
        $this->checkAccess($banner);
        try {
            $this->service->sendToModeration($banner->id);
        } catch (\DomainException $e) {
            return back()->with('error', $e->getMessage());
        }

        return to_route('cabinet.banners.show', $banner);
    }

    public function cancel(Banner $banner)
    {
        $this->checkAccess($banner);
        try {
            $this->service->cancelModeration($banner->id);
        } catch (\DomainException $e) {
            return back()->with('error', $e->getMessage());
        }

        return to_route('cabinet.banners.show', $banner);
    }

    public function order(Banner $banner)
    {
        $this->checkAccess($banner);
        try {
            $banner = $this->service->order($banner->id);
            $url = $this->robokassa->generateRedirectUrl($banner->id, $banner->cost, 'banner');
            return redirect($url);
        } catch (\DomainException $e) {
            return back()->with('error', $e->getMessage());
        }

        return redirect()->route('cabinet.banners.show', $banner);
    }

    public function destroy(Banner $banner)
    {
        $this->checkAccess($banner);
        try {
            $this->service->removeByOwner($banner->id);
        } catch (\DomainException $e) {
            return back()->with('error', $e->getMessage());
        }

        return to_route('cabinet.banners.index');
    }

    private function checkAccess(Banner $banner): void
    {
        if (!Gate::allows('manage-own-banner', $banner)) {
            abort(403);
        }
    }
}
