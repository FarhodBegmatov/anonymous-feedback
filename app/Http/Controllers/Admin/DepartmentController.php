<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Department\StoreDepartmentRequest;
use App\Http\Requests\Department\UpdateDepartmentRequest;
use App\Models\Department;
use App\Services\DepartmentService;
use App\Services\FacultyService;
use Exception as ExceptionAlias;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\JsonResponse;

class DepartmentController extends Controller
{
    public function __construct(
        private readonly DepartmentService $departmentService,
        private readonly FacultyService $facultyService
    ) {}

    /**
     * Departments index with search and pagination
     */
    public function index(Request $request): Response
    {
        $filters = $request->only(['search', 'faculty_id']);
        $departments = $this->departmentService->getPaginatedDepartments(10, $filters);

        return Inertia::render('Admin/Departments/Index', [
            'departments' => $departments,
            'filters' => $filters,
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
        } catch (ExceptionAlias $e) {
            return redirect()->back()
                ->with('error', 'Error creating department: ' . $e->getMessage())
                ->withInput();
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
        } catch (ExceptionAlias $e) {
            return redirect()->back()
                ->with('error', 'Error updating department: ' . $e->getMessage());
        }
    }

    public function destroy(Department $department): JsonResponse|RedirectResponse
    {
        try {
            $this->departmentService->deleteDepartment($department);

            if (request()->expectsJson()) {
                return response()->json(['success' => true, 'message' => 'Department deleted successfully']);
            }

            return redirect()->route('admin.departments.index')
                ->with('success', 'Department deleted successfully');
        } catch (ExceptionAlias $e) {
            if (request()->expectsJson()) {
                return response()->json(['success' => false, 'message' => $e->getMessage()], 400);
            }

            return redirect()->back()->with('error', $e->getMessage());
        }
    }
}
