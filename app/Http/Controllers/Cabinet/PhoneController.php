<?php

namespace App\Http\Controllers\Cabinet;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\PhoneVerifyRequest;
use App\UseCases\Profile\PhoneService;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PhoneController extends Controller
{
    private $service;

    public function __construct(PhoneService $service)
    {
        $this->service = $service;
    }

    public function request()
    {
        try {
            $this->service->request(Auth::id());
        } catch (\DomainException $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }

        return redirect()->route('cabinet.profile.phone');
    }

    public function form()
    {
        return Inertia::render('Cabinet/Profile/Phone');
    }

    public function verify(PhoneVerifyRequest $request)
    {
        try {
            $this->service->verify(Auth::id(), $request);
        } catch (\DomainException $e) {
            return redirect()->route('cabinet.profile.phone')->with('error', $e->getMessage());
        }

        return redirect()->route('cabinet.profile.home');
    }

    public function auth()
    {
        $this->service->toggleAuth(Auth::id());

        return redirect()->route('cabinet.profile.home');
    }
}
