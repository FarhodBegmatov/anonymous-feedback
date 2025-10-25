<?php

namespace App\Http\Controllers\Manager;

use App\Http\Controllers\Controller;
use App\Services\DashboardService;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __construct(
        private DashboardService $dashboardService
    ) {}

    public function index(): Response
    {
        $user = auth()->user();
        $dashboardData = $this->dashboardService->getDashboardData($user);

        return Inertia::render('Admin/Managers/Dashboard', $dashboardData);
    }
}
