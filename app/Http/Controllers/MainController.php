<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Models\Faculty;
use App\Repositories\FacultyRepository;
use App\Repositories\FeedbackRepository;
use App\Services\FeedbackRatingService;
use Inertia\Inertia;
use Inertia\Response;

class MainController extends Controller
{
    public function __construct(
        private readonly FacultyRepository $facultyRepository,
        private readonly FeedbackRepository $feedbackRepository,
        private readonly FeedbackRatingService $ratingService
    ) {}

    /**
     * Home page: List of faculties with statistics
     */
    public function index(): Response
    {
        $faculties = $this->facultyRepository->all();
        $faculties->load('departments', 'feedbacks');

        $facultiesData = $faculties->map(function ($faculty) {
            return [
                'id' => $faculty->id,
                'name' => $faculty->name,
                'departments_count' => $faculty->departments->count(),
                'feedback_count' => $faculty->feedbacks->count(),
                'average_grade' => $this->ratingService->calculateAverage($faculty->feedbacks),
            ];
        });

        // Global statistics
        $allFeedbacks = $this->feedbackRepository->all();

        return Inertia::render('Home', [
            'faculties' => $facultiesData,
            'locale' => app()->getLocale(),
            'translations' => __('messages'),
            'total_faculties' => $facultiesData->count(),
            'total_feedbacks' => $allFeedbacks->count(),
            'global_average_grade' => $this->ratingService->calculateAverage($allFeedbacks),
        ]);
    }


    /**
     * Faculty page: List of departments with statistics
     */
    public function faculty(Faculty $faculty): Response
    {
        $faculty->load('departments.feedbacks', 'feedbacks');

        $departments = $faculty->departments->map(function ($dept) {
            return [
                'id' => $dept->id,
                'name' => $dept->name,
                'feedback_count' => $dept->feedbacks->count(),
                'good_feedback_count' => $dept->feedbacks->where('grade', 'good')->count(),
                'average_feedback_count' => $dept->feedbacks->where('grade', 'average')->count(),
                'bad_feedback_count' => $dept->feedbacks->where('grade', 'bad')->count(),
                'average_grade' => $this->ratingService->calculateAverage($dept->feedbacks),
            ];
        });

        // Faculty average rating from all departments
        $allFeedbacks = $faculty->departments->flatMap(fn($dept) => $dept->feedbacks);

        return Inertia::render('Faculty', [
            'faculty' => [
                'id' => $faculty->id,
                'name' => $faculty->name,
                'feedback_count' => $faculty->feedbacks->count(),
                'department_count' => $faculty->departments()->count(),
                'average_grade' => $this->ratingService->calculateAverage($allFeedbacks),
            ],
            'departments' => $departments,
            'locale' => app()->getLocale(),
            'translations' => __('messages'),
        ]);
    }
    /**
     * Feedback form page for a specific department
     */
    public function feedbackForm(Department $department): Response
    {
        $feedbacks = $this->feedbackRepository->findByDepartmentWithComments($department->id);

        return Inertia::render('FeedbackForm', [
            'department' => $department,
            'feedbacks' => $feedbacks,
            'locale' => app()->getLocale(),
            'translations' => __('messages'),
        ]);
    }
}
