<?php

namespace App\Providers;

use App\Policies\ManagerPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;
use App\Models\User;

class AuthServiceProvider extends ServiceProvider
{
    protected $policies = [
        User::class => ManagerPolicy::class,
    ];
    public function boot(): void
    {
        $this->registerPolicies();

        Gate::define('isAdmin', fn(User $user) => $user->role === 'admin');
        Gate::define('isManager', fn(User $user) => $user->role === 'manager');
    }
}
