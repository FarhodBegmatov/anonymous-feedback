<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Department\StoreDepartmentRequest;
use App\Http\Requests\Department\UpdateDepartmentRequest;
use App\Models\Department;
use App\Services\DepartmentService;
use App\Services\FacultyService;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\JsonResponse;

class DepartmentController extends Controller
{
    public function __construct(
        private DepartmentService $departmentService,
        private FacultyService $facultyService
    ) {}

    public function index(): Response
    {
        return Inertia::render('Admin/Departments/Index', [
            'departments' => $this->departmentService->getAllDepartments(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Departments/Create', [
            'faculties' => $this->facultyService->getAllFaculties(),
        ]);
    }

    public function store(StoreDepartmentRequest $request): RedirectResponse
    {
        try {
            $this->departmentService->createDepartment($request->validated());

            return redirect()->route('admin.departments.index')
                ->with('success', 'Department created successfully');
        } catch (\Exception $e) {
            return redirect()->back()
                ->with('error', 'Error creating department: ' . $e->getMessage());
        }
    }

    public function edit(Department $department): Response
    {
        return Inertia::render('Admin/Departments/Edit', [
            'department' => $department,
            'faculties' => $this->facultyService->getAllFaculties(),
        ]);
    }

    public function update(UpdateDepartmentRequest $request, Department $department): RedirectResponse
    {
        try {
            $this->departmentService->updateDepartment($department, $request->validated());

            return redirect()->route('admin.departments.index')
                ->with('success', 'Department updated successfully');
        } catch (\Exception $e) {
            return redirect()->back()
                ->with('error', 'Error updating department: ' . $e->getMessage());
        }
    }

    public function destroy(Department $department): JsonResponse|RedirectResponse
    {
        try {
            $this->departmentService->deleteDepartment($department);

            // JSON response for AJAX requests
            if (request()->expectsJson()) {
                return response()->json([
                    'success' => true,
                    'message' => 'Department deleted successfully'
                ]);
            }

            // Redirect for regular requests
            return redirect()->route('admin.departments.index')
                ->with('success', 'Department deleted successfully');
        } catch (\Exception $e) {
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
