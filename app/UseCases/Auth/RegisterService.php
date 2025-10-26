<?php

namespace App\UseCases\Auth;

use App\Entity\User\User;
use App\Http\Requests\Auth\RegisterRequest;
use App\Jobs\SendVerificationEmail;
use Illuminate\Auth\Events\Registered;
use Illuminate\Contracts\Events\Dispatcher;

class RegisterService
{
    private $dispatcher;

    public function __construct(Dispatcher $dispatcher)
    {
        $this->dispatcher = $dispatcher;
    }

    public function register(RegisterRequest $request): void
    {
        $user = User::register(
            $request['name'],
            $request['email'],
            $request['password']
        );

        SendVerificationEmail::dispatch($user);
        $this->dispatcher->dispatch(new Registered($user));
    }

    public function verify($id): void
    {
        /** @var User $user */
        $user = User::findOrFail($id);
        $user->verify();
    }
}
