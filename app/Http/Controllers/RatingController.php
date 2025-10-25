<?php

namespace App\Http\Controllers;

use App\Repositories\FacultyRepository;
use App\Services\FeedbackRatingService;
use Inertia\Inertia;
use Inertia\Response;

class RatingController extends Controller
{
    public function __construct(
        private readonly FacultyRepository $facultyRepository,
        private readonly FeedbackRatingService $ratingService
    ) {}

    public function index(): Response
    {
        $faculties = $this->facultyRepository->all();
        $faculties->load('departments.feedbacks');

        $facultiesData = $faculties->map(function ($faculty) {
            $departments = $faculty->departments->map(function ($dept) {
                return [
                    'id' => $dept->id,
                    'name' => $dept->name,
                    'feedback_count' => $dept->feedbacks->count(),
                    'average_grade' => $this->ratingService->calculateAverage($dept->feedbacks),
                ];
            });

            // Calculate faculty average from all departments
            $allFeedbacks = $faculty->departments->flatMap(fn($dept) => $dept->feedbacks);

            return [
                'id' => $faculty->id,
                'name' => $faculty->name,
                'average_grade' => $this->ratingService->calculateAverage($allFeedbacks),
                'departments' => $departments,
            ];
        });

        // Get the best and worst departments
        $allDepartments = $facultiesData->flatMap(fn($faculty) => $faculty['departments']);

        $bestDepartments = $allDepartments
            ->filter(fn($dept) => $dept['average_grade'] !== null && $dept['average_grade'] > 4.5)
            ->sortByDesc('average_grade')
            ->take(5)
            ->values();

        $worstDepartments = $allDepartments
            ->filter(fn($dept) => $dept['average_grade'] !== null && $dept['average_grade'] < 2.5)
            ->sortBy('average_grade')
            ->take(5)
            ->values();

        return Inertia::render('Ratings', [
            'faculties' => $facultiesData,
            'bestDepartments' => $bestDepartments,
            'worstDepartments' => $worstDepartments,
            'locale' => app()->getLocale(),
            'translations' => __('messages'),
        ]);
    }
}
