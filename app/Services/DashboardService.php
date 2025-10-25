<?php

namespace App\Services;

use App\Models\User;
use App\Repositories\FacultyRepository;
use App\Repositories\DepartmentRepository;

class DashboardService
{
    public function __construct(
        private FeedbackRatingService $ratingService,
        private FacultyRepository $facultyRepository,
        private DepartmentRepository $departmentRepository
    ) {}
    public function getDashboardData(User $user): array
    {
        $manageable = $user->manageable;

        $data = [
            'type' => null,
            'feedbacks' => [],
            'average' => null,
            'message' => null,
        ];

        // If the manager is not assigned to any faculty or department
        if (!$manageable) {
            $data['message'] = 'You are not yet assigned to any faculty or department.';
            return $data;
        }

        // Department manager
        if ($user->isDepartmentManager()) {
            return $this->getDepartmentDashboardData($manageable->id);
        }

        // Faculty manager
        if ($user->isFacultyManager()) {
            return $this->getFacultyDashboardData($manageable->id);
        }

        return $data;
    }

    private function getDepartmentDashboardData(int $departmentId): array
    {
        $department = $this->departmentRepository->find($departmentId);
        $department->load('feedbacks', 'faculty');

        $feedbacks = $department->feedbacks->map(
            fn($f) => $this->ratingService->mapFeedbackToArray($f)
        );

        return [
            'type' => 'department',
            'department' => [
                'id' => $department->id,
                'name' => (array) $department->name,
                'faculty' => [
                    'id' => $department->faculty->id,
                    'name' => (array) $department->faculty->name,
                ],
            ],
            'feedbacks' => $feedbacks,
            'average' => $this->ratingService->calculateAverage($department->feedbacks),
            'message' => null,
        ];
    }

    private function getFacultyDashboardData(int $facultyId): array
    {
        $faculty = $this->facultyRepository->find($facultyId);
        $faculty->load('departments.feedbacks');

        $departments = $faculty->departments->map(function($d) {
            $feedbacks = $d->feedbacks;

            return [
                'id' => $d->id,
                'name' => (array) $d->name,
                'feedback_count' => $feedbacks->count(),
                'average' => $this->ratingService->calculateAverage($feedbacks),
                'feedbacks' => $feedbacks->map(
                    fn($f) => $this->ratingService->mapFeedbackToArray($f)
                ),
            ];
        });

        return [
            'type' => 'faculty',
            'faculty' => [
                'id' => $faculty->id,
                'name' => (array) $faculty->name,
            ],
            'departments' => $departments,
            'feedbacks' => [],
            'average' => null,
            'message' => null,
        ];
    }
}
