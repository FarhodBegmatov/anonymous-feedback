<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Illuminate\Support\Facades\App;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'locale' => App::getLocale(),
        ];
    }

    public function handle(Request $request, Closure $next)
    {
        if ($request->has('lang')) {
            session(['locale' => $request->get('lang')]);
            app()->setLocale($request->get('lang'));
        } else {
            app()->setLocale(session('locale', 'uz')); // default: uz
        }

        return $next($request);
    }
}
