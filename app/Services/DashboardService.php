<?php

namespace App\Services;

use App\Models\Department;
use App\Models\Faculty;
use App\Repositories\FacultyRepository;
use App\Repositories\DepartmentRepository;
use Illuminate\Contracts\Auth\Authenticatable;

readonly class DashboardService
{
    public function __construct(
        private FeedbackRatingService $ratingService,
        private FacultyRepository     $facultyRepository,
        private DepartmentRepository  $departmentRepository
    ) {}

    public function getDashboardData(Authenticatable $user): array
    {
        /** @var Faculty|Department|null $manageable */
        if (!empty($user->manageable)) {
            $manageable = $user->manageable;
        }

        $data = [
            'type' => null,
            'feedbacks' => [],
            'average' => null,
            'message' => null,
        ];

        if (!$manageable) {
            $data['message'] = 'You are not yet assigned to any faculty or department.';
            return $data;
        }

        if ($manageable instanceof Department) {
            return $this->getDepartmentDashboardData($manageable->id);
        }

        if ($manageable instanceof Faculty) {
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
                'name' => $department->name,
                'faculty' => [
                    'id' => $department->faculty->id,
                    'name' => $department->faculty->name,
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
                'name' => $faculty->name,
            ],
            'departments' => $departments,
            'feedbacks' => [],
            'average' => null,
            'message' => null,
        ];
    }
}
