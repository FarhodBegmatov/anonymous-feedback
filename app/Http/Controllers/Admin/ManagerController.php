<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Manager\StoreManagerRequest;
use App\Http\Requests\Manager\UpdateManagerRequest;
use App\Models\User;
use App\Services\ManagerService;
use App\Services\FacultyService;
use App\Services\DepartmentService;
use Exception as ExceptionAlias;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\JsonResponse;

class ManagerController extends Controller
{
    public function __construct(
        private readonly ManagerService $managerService,
        private readonly FacultyService $facultyService,
        private readonly DepartmentService $departmentService
    ) {}

    public function index(Request $request): Response
    {
        $filters = $request->only(['search', 'type']);
        $managers = $this->managerService->getPaginatedManagers(10, $filters);

        return Inertia::render('Admin/Managers/Index', [
            'managers' => $managers,
            'filters' => $filters,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Managers/Create', [
            'faculties' => $this->facultyService->getAllFaculties(),
            'departments' => $this->departmentService->getAllDepartments(),
        ]);
    }

    public function store(StoreManagerRequest $request): RedirectResponse
    {
        try {
            $this->managerService->createManager($request->validated());

            return redirect()->route('admin.managers.index')
                ->with('success', 'Manager created successfully');
        } catch (ExceptionAlias $e) {
            return redirect()->back()
                ->with('error', 'Error creating manager: ' . $e->getMessage())
                ->withInput();
        }
    }

    public function edit(User $manager): Response
    {
        $manager = $this->managerService->getManagerById($manager->id);

        // Get Uzbek name for display
        $manageableNameUz = $manager->manageable ? $manager->manageable->name->uz ?? null : null;

        return Inertia::render('Admin/Managers/Edit', [
            'manager' => $manager,
            'manageableNameUz' => $manageableNameUz,
            'faculties' => $this->facultyService->getAllFaculties(),
            'departments' => $this->departmentService->getAllDepartments(),
        ]);
    }

    public function update(UpdateManagerRequest $request, User $manager): RedirectResponse
    {
        try {
            $this->managerService->updateManager($manager, $request->validated());

            return redirect()->route('admin.managers.index')
                ->with('success', 'Manager updated successfully');
        } catch (ExceptionAlias $e) {
            return redirect()->back()
                ->with('error', 'Error updating manager: ' . $e->getMessage());
        }
    }

    public function destroy(User $manager): JsonResponse|RedirectResponse
    {
        try {
            $this->managerService->deleteManager($manager);

            // JSON response for AJAX requests
            if (request()->expectsJson()) {
                return response()->json([
                    'success' => true,
                    'message' => 'Manager deleted successfully'
                ]);
            }

            // Redirect for regular requests
            return redirect()->route('admin.managers.index')
                ->with('success', 'Manager deleted successfully');
        } catch (ExceptionAlias $e) {
            // JSON error response for AJAX requests
            if (request()->expectsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => $e->getMessage()
                ], 400);
            }

            return redirect()->back()
                ->with('error', $e->getMessage());
        }
    }
}
