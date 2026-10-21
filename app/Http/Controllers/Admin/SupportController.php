<?php

namespace App\Http\Controllers\Admin;

use App\Entity\Support\Status;
use App\Entity\Support\Support;
use App\Http\Controllers\Controller;
use App\Http\Requests\Ticket\EditRequest;
use App\Http\Requests\Ticket\MessageRequest;
use App\UseCases\Tickets\SupportService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SupportController extends Controller
{
    private $service;

    public function __construct(SupportService $service)
    {
        $this->service = $service;
        $this->middleware('can:manage-tickets');
    }

    public function index(Request $request)
    {
        $query = Support::with('user')->orderByDesc('updated_at');

        if (!empty($value = $request->get('id'))) {
            $query->where('id', $value);
        }

        if (!empty($value = $request->get('user'))) {
            $query->where('user_id', $value);
        }

        if (!empty($value = $request->get('status'))) {
            $query->where('status', $value);
        }

        $tickets = $query->paginate(20);

        $statuses = Status::statusesList();

        return Inertia::render('Admin/Support/Index', [
            'tickets' => $tickets,
            'statuses' => $statuses,
            'filters' => [
                'id' => $request->get('id'),
                'user' => $request->get('user'),
                'status' => $request->get('status'),
            ],
        ]);
    }

    public function show(Support $ticket)
    {
        $ticket->load('user', 'messages.user', 'statuses.user');

        return Inertia::render('Admin/Support/Show', [
            'ticket' => $ticket,
        ]);
    }

    public function editForm(Support $ticket)
    {
        return Inertia::render('Admin/Support/Edit', [
            'ticket' => $ticket,
        ]);
    }

    public function edit(EditRequest $request, Support $ticket)
    {
        try {
            $this->service->edit($ticket->id, $request);
        } catch (\DomainException $e) {
            return back()->with('error', $e->getMessage());
        }

        return to_route('admin.support.show', $ticket);
    }

    public function message(MessageRequest $request, Support $ticket)
    {
        try {
            $this->service->message(Auth::id(), $ticket->id, $request);
        } catch (\DomainException $e) {
            return back()->with('error', $e->getMessage());
        }

        return to_route('admin.support.show', $ticket);
    }

    public function approve(Support $ticket)
    {
        try {
            $this->service->approve(Auth::id(), $ticket->id);
        } catch (\DomainException $e) {
            return back()->with('error', $e->getMessage());
        }

        return to_route('admin.support.show', $ticket);
    }

    public function close(Support $ticket)
    {
        try {
            $this->service->close(Auth::id(), $ticket->id);
        } catch (\DomainException $e) {
            return back()->with('error', $e->getMessage());
        }

        return to_route('admin.support.show', $ticket);
    }

    public function reopen(Support $ticket)
    {
        try {
            $this->service->reopen(Auth::id(), $ticket->id);
        } catch (\DomainException $e) {
            return back()->with('error', $e->getMessage());
        }

        return to_route('admin.support.show', $ticket);
    }

    public function destroy(Support $ticket)
    {
        try {
            $this->service->removeByAdmin($ticket->id);
        } catch (\DomainException $e) {
            return back()->with('error', $e->getMessage());
        }

        return to_route('admin.support.index');
    }
}
