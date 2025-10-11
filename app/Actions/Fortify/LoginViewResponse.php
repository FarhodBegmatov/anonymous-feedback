<?php

namespace App\Actions\Fortify;

use Laravel\Fortify\Contracts\LoginViewResponse as LoginViewResponseContract;
use Inertia\Inertia;
use Inertia\Response;

class LoginViewResponse implements LoginViewResponseContract
{
    public function toResponse($request): Response
    {
        return Inertia::render('auth/login');
    }
}
