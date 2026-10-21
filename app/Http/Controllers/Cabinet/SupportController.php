<?php

namespace App\Http\Controllers\Cabinet;

use App\Entity\Support\Support;
use App\Http\Controllers\Controller;
use App\Http\Requests\Ticket\CreateRequest;
use App\Http\Requests\Ticket\MessageRequest;
use App\UseCases\Tickets\SupportService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class SupportController extends Controller
{
    private $service;

    public function __construct(SupportService $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        $tickets = Support::forUser(Auth::user())
            ->with('messages')
            ->orderByDesc('updated_at')
            ->paginate(20);

        return Inertia::render('Cabinet/Support/Index', [
            'tickets' => $tickets,
        ]);
    }

    public function show(Support $ticket)
    {
        $ticket->load('user', 'messages');

        return Inertia::render('Cabinet/Support/Show', [
            'ticket' => $ticket,
        ]);
    }

    public function create()
    {
        return Inertia::render('Cabinet/Support/Create');
    }

    public function store(CreateRequest $request)
    {
        try {
            $ticket = $this->service->create(Auth::id(), $request);
        } catch (\DomainException $e) {
            return back()->with('error', $e->getMessage());
        }

        return to_route('cabinet.support.show', $ticket);
    }

    public function message(MessageRequest $request, Support $ticket)
    {
        try {
            $this->service->message(Auth::id(), $ticket->id, $request);
        } catch (\DomainException $e) {
            return back()->with('error', $e->getMessage());
        }

        return to_route('cabinet.support.show', $ticket);
    }

    public function destroy(Support $ticket)
    {
        $this->checkAccess($ticket);
        try {
            $this->service->removeByOwner($ticket->id);
        } catch (\DomainException $e) {
            return back()->with('error', $e->getMessage());
        }

        return to_route('cabinet.support.index');
    }

    private function checkAccess(Support $ticket): void
    {
        if (!Gate::allows('manage-own-ticket', $ticket)) {
            abort(403);
        }
    }
}
