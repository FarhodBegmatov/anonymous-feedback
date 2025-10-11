<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;
use Laravel\Fortify\Fortify;
use App\Actions\Fortify\LoginViewResponse;

class FortifyServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->singleton(
            \Laravel\Fortify\Contracts\LoginViewResponse::class,
            LoginViewResponse::class
        );
    }

    public function boot(): void
    {
        // Login sahifasi
        Fortify::loginView(fn () => Inertia::render('auth/login'));

        // Login tekshiruv
        Fortify::authenticateUsing(function (Request $request) {
            $credentials = $request->only('name', 'password');

            if (Auth::attempt($credentials)) {
                return Auth::user();
            }

            return null;
        });

        // Login rate limit
        RateLimiter::for('login', function (Request $request) {
            $name = (string) $request->input('name');
            return Limit::perMinute(5)->by($name . $request->ip());
        });
    }
}
