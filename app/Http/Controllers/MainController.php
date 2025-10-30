<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Models\Faculty;
use App\Repositories\DepartmentRepository;
use App\Repositories\FacultyRepository;
use App\Repositories\FeedbackRepository;
use App\Services\FeedbackRatingService;
use App\Services\SearchService;
use App\Services\Transformers\DepartmentTransformer;
use App\Services\Transformers\FacultyTransformer;
use Illuminate\Http\Request as HttpRequest;
use Inertia\Inertia;
use Inertia\Response;

class MainController extends Controller
{
    public function __construct(
        private readonly FacultyRepository $facultyRepository,
        private readonly DepartmentRepository $departmentRepository,
        private readonly FeedbackRepository $feedbackRepository,
        private readonly FeedbackRatingService $ratingService,
        private readonly SearchService $searchService,
        private readonly FacultyTransformer $facultyTransformer,
        private readonly DepartmentTransformer $departmentTransformer
    ) {}

    /**
     * Home page: List of faculties with statistics
     * Uses pagination and transformers (SOLID principles)
     */
    public function index(): Response
    {
        // Paginate faculties with relations
        $faculties = $this->facultyRepository->paginate(perPage: 6);

        // Transform paginated data
        $faculties->getCollection()->transform(
            fn($faculty) => $this->facultyTransformer->transform($faculty)
        );

        // Global statistics (not paginated)
        $allFeedbacks = $this->feedbackRepository->all();
        $totalFaculties = $this->facultyRepository->all()->count();

        return Inertia::render('Home', [
            'faculties' => $faculties,
            'locale' => app()->getLocale(),
            'translations' => __('messages'),
            'total_faculties' => $totalFaculties,
            'total_feedbacks' => $allFeedbacks->count(),
            'global_average_grade' => $this->ratingService->calculateAverage($allFeedbacks),
        ]);
    }


    /**
     * Faculty page: List of departments with statistics
     * Uses pagination and transformers (SOLID principles)
     */
    public function faculty(HttpRequest $request, Faculty $faculty): Response
    {
        $faculty->load('departments', 'feedbacks');

        $perPage = 9;
        $search = $request->input('search');

        if ($search) {
            // Agar foydalanuvchi qidiruv kiritgan bo‘lsa
            $departments = $this->departmentRepository->searchDepartmentsInFaculty(
                facultyId: $faculty->id,
                query: $search,
                perPage: $perPage
            );
        } else {
            // Oddiy holda paginatsiya bilan chiqarish
            $departments = $this->departmentRepository->paginateByFaculty(
                facultyId: $faculty->id,
                perPage: $perPage
            );
        }

        // Har bir departmentni transform qilish
        $departments->getCollection()->transform(
            fn($dept) => $this->departmentTransformer->transform($dept)
        );

        return Inertia::render('Faculty', [
            'faculty' => $this->facultyTransformer->transformForDetailPage($faculty),
            'departments' => $departments,
            'search' => $search,
            'locale' => app()->getLocale(),
            'translations' => __('messages'),
        ]);
    }

    /**
     * Feedback form page for a specific department
     * Displays paginated feedbacks with comments
     */
    public function feedbackForm(Department $department): Response
    {
        // Get paginated feedbacks with comments for this department
        $feedbacks = $this->feedbackRepository->findByDepartmentWithComments(
            departmentId: $department->id,
            perPage: 20
        );

        return Inertia::render('FeedbackForm', [
            'department' => $department,
            'locale' => app()->getLocale(),
            'translations' => __('messages'),
        ]);
    }


    /**
     * Get search suggestions (API endpoint)
     */
    public function suggestions(HttpRequest $request)
    {
        $query = $this->searchService->sanitizeQuery($request->input('q'));

        if (!$this->searchService->validateQuery($query)) {
            return response()->json([]);
        }

        return match($request->input('type')) {
            'faculty' => $this->searchService->getFacultySuggestions($query),
            'department' => $this->searchService->getDepartmentSuggestions($query),
            'manager' => $this->searchService->getManagerSuggestions($query), // qo‘shildi
            default => []
        };
    }

}
