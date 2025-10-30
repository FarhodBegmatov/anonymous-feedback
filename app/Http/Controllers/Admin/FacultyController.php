<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Faculty\StoreFacultyRequest;
use App\Http\Requests\Faculty\UpdateFacultyRequest;
use App\Models\Faculty;
use App\Services\FacultyService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\JsonResponse;

class FacultyController extends Controller
{
    public function __construct(
        private FacultyService $facultyService
    ) {}

    /**
     * Fakultetlar ro‘yxatini chiqarish (qidiruv bilan)
     */
    public function index(Request $request): Response
    {
        $filters = $request->only(['search', 'type']);
        $faculties = $this->facultyService->getPaginatedFaculties(5, $filters);

        return Inertia::render('Admin/Faculties/Index', [
            'faculties' => $faculties,
            'filters' => $filters,
        ]);
    }

    /**
     * Yangi fakultet yaratish sahifasi
     */
    public function create(): Response
    {
        return Inertia::render('Admin/Faculties/Create');
    }

    /**
     * Yangi fakultetni saqlash
     */
    public function store(StoreFacultyRequest $request): RedirectResponse
    {
        try {
            $this->facultyService->createFaculty($request->validated());

            return redirect()->route('admin.faculties.index')
                ->with('success', 'Faculty created successfully');
        } catch (\Exception $e) {
            return redirect()->back()
                ->with('error', 'Error creating faculty: ' . $e->getMessage())
                ->withInput();
        }
    }

    /**
     * Fakultetni tahrirlash sahifasi
     */
    public function edit(Faculty $faculty): Response
    {
        return Inertia::render('Admin/Faculties/Edit', [
            'faculty' => $faculty,
        ]);
    }

    /**
     * Fakultetni yangilash
     */
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

    /**
     * Fakultetni o‘chirish
     */
    public function destroy(Faculty $faculty): JsonResponse|RedirectResponse
    {
        try {
            $this->facultyService->deleteFaculty($faculty);

            // Agar AJAX orqali so‘rov kelsa
            if (request()->expectsJson()) {
                return response()->json([
                    'success' => true,
                    'message' => 'Faculty deleted successfully'
                ]);
            }

            // Oddiy redirect uchun
            return redirect()->route('admin.faculties.index')
                ->with('success', 'Faculty deleted successfully');
        } catch (\Exception $e) {
            // AJAX xato javobi
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
