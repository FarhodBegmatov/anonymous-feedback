<?php

namespace App\Http\Middleware;

use Inertia\Middleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Closure;

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

            // 🔐 Auth ma'lumotlarini global yuborish
            'auth' => [
                'user' => fn() => $request->user()
                    ? [
                        'id' => $request->user()->id,
                        'name' => $request->user()->name,
                        'email' => $request->user()->email,
                        'role' => $request->user()->role,
                        'faculty_id' => $request->user()->faculty_id,
                        'department_id' => $request->user()->department_id,
                    ]
                    : null,
            ],

            // 🌍 Joriy tilni yuborish
            'locale' => App::getLocale(),

            // 🔔 Flash xabarlar
            'flash' => [
                'success' => fn() => $request->session()->get('success'),
                'error' => fn() => $request->session()->get('error'),
            ],
        ];
    }

    /**
     * Tillarni boshqarish (locale)
     */
    public function handle(Request $request, Closure $next)
    {
        // URL orqali lang berilgan bo‘lsa, uni sessiyaga yozish
        if ($request->has('lang')) {
            session(['locale' => $request->get('lang')]);
            App::setLocale($request->get('lang'));
        } else {
            App::setLocale(session('locale', 'uz')); // default: uz
        }

        // ⚠️ Muhim: Asl `Inertia\Middleware` handle() ni chaqirish kerak
        return parent::handle($request, $next);
    }
}
