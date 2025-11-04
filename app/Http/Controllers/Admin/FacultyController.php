<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Faculty\StoreFacultyRequest;
use App\Http\Requests\Faculty\UpdateFacultyRequest;
use App\Models\Faculty;
use App\Services\FacultyService;
use Exception as ExceptionAlias;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\JsonResponse;

class FacultyController extends Controller
{
    public function __construct(
        private readonly FacultyService $facultyService
    ) {}

    /**
     * Display a paginated list of faculties with search functionality
     */
    public function index(Request $request): Response
    {
        $filters = $request->only(['search', 'type']);
        $faculties = $this->facultyService->getPaginatedFaculties(10, $filters);

        return Inertia::render('Admin/Faculties/Index', [
            'faculties' => $faculties,
            'filters' => $filters,
        ]);
    }

    /**
     * Show the form for creating a new faculty
     */
    public function create(): Response
    {
        return Inertia::render('Admin/Faculties/Create', []);
    }

    /**
     * Store a newly created faculty in storage
     */
    public function store(StoreFacultyRequest $request): RedirectResponse
    {
        try {
            $this->facultyService->createFaculty($request->validated());

            return redirect()->route('admin.faculties.index')
                ->with('success', 'Faculty created successfully');
        } catch (ExceptionAlias $e) {
            return redirect()->back()
                ->with('error', 'Error creating faculty: ' . $e->getMessage())
                ->withInput();
        }
    }

    /**
     * Show the form for editing the specified faculty
     */
    public function edit(Faculty $faculty): Response
    {
        return Inertia::render('Admin/Faculties/Edit', [
            'faculty' => $faculty,
        ]);
    }

    /**
     * Update the specified faculty in storage
     */
    public function update(UpdateFacultyRequest $request, Faculty $faculty): RedirectResponse
    {
        try {
            $this->facultyService->updateFaculty($faculty, $request->validated());

            return redirect()->route('admin.faculties.index')
                ->with('success', 'Faculty updated successfully');
        } catch (ExceptionAlias $e) {
            return redirect()->back()
                ->with('error', 'Error updating faculty: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified faculty from storage
     */
    public function destroy(Faculty $faculty): JsonResponse|RedirectResponse
    {
        try {
            $this->facultyService->deleteFaculty($faculty);

            // If the request is AJAX
            if (request()->expectsJson()) {
                return response()->json([
                    'success' => true,
                    'message' => 'Faculty deleted successfully'
                ]);
            }

            // For regular redirect
            return redirect()->route('admin.faculties.index')
                ->with('success', 'Faculty deleted successfully');
        } catch (ExceptionAlias $e) {
            // AJAX error response
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
