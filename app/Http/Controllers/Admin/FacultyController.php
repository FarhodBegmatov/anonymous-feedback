<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Faculty\StoreFacultyRequest;
use App\Http\Requests\Faculty\UpdateFacultyRequest;
use App\Models\Faculty;
use App\Services\FacultyService;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\JsonResponse;

class FacultyController extends Controller
{
    public function __construct(
        private FacultyService $facultyService
    ) {}

    public function index(): Response
    {
        return Inertia::render('Admin/Faculties/Index', [
            'faculties' => $this->facultyService->getAllFaculties(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Faculties/Create');
    }

    public function store(StoreFacultyRequest $request): RedirectResponse
    {
        try {
            $this->facultyService->createFaculty($request->validated());

            return redirect()->route('admin.faculties.index')
                ->with('success', 'Faculty created successfully');
        } catch (\Exception $e) {
            return redirect()->back()
                ->with('error', 'Error creating faculty: ' . $e->getMessage());
        }
    }

    public function edit(Faculty $faculty): Response
    {
        return Inertia::render('Admin/Faculties/Edit', [
            'faculty' => $faculty
        ]);
    }

    public function update(UpdateFacultyRequest $request, Faculty $faculty): RedirectResponse
    {
        try {
            $this->facultyService->updateFaculty($faculty, $request->validated());

            return redirect()->route('admin.faculties.index')
                ->with('success', 'Faculty updated successfully');
        } catch (\Exception $e) {
            return redirect()->back()
                ->with('error', 'Error updating faculty: ' . $e->getMessage());
        }
    }

    public function destroy(Faculty $faculty): JsonResponse|RedirectResponse
    {
        try {
            $this->facultyService->deleteFaculty($faculty);

            // JSON response for AJAX requests
            if (request()->expectsJson()) {
                return response()->json([
                    'success' => true,
                    'message' => 'Faculty deleted successfully'
                ]);
            }

            // Redirect for regular requests
            return redirect()->route('admin.faculties.index')
                ->with('success', 'Faculty deleted successfully');
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
