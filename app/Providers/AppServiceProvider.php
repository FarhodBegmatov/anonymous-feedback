<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot()
    {
        Inertia::share([
            'locale' => function () {
                return session('locale', 'uz'); // default uz
            },
            'translations' => function () {
                $locale = session('locale', 'uz'); // default uz
                return [
                    'faculties' => __('Faculties', [], $locale),
                    'departments_count' => __('Departments Count', [], $locale),
                    'feedback_count' => __('Feedback Count', [], $locale),
                    'average_score' => __('Average Score', [], $locale),
                    'no_feedback' => __('No feedback yet', [], $locale),
                    'no_faculties' => __('No faculties found', [], $locale),
                ];
            },
        ]);
    }
}
