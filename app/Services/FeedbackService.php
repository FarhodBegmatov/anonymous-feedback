<?php

namespace App\Services;

use App\Models\Feedback;
use App\Models\User;
use App\Repositories\FeedbackRepository;
use App\Repositories\DepartmentRepository;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class FeedbackService
{
    public function __construct(
        private FeedbackRepository $feedbackRepository,
        private DepartmentRepository $departmentRepository
    ) {}

    public function createFeedback(array $data): Feedback
    {
        return $this->feedbackRepository->create($data);
    }

    public function getFeedbacksForManager(User $user, int $perPage = 10): LengthAwarePaginator
    {
        // Faculty manager - get feedbacks from all departments in the faculty
        if ($user->isFacultyManager()) {
            $departmentIds = $this->departmentRepository->all()
                ->where('faculty_id', $user->manageable_id)
                ->pluck('id')
                ->toArray();

            return $this->feedbackRepository->findByDepartments($departmentIds, $perPage);
        }

        // Department manager - get feedbacks only from their department
        if ($user->isDepartmentManager()) {
            return $this->feedbackRepository->findByDepartment(
                $user->manageable_id,
                $perPage
            );
        }

        // Return empty paginated result if not a manager
        return $this->feedbackRepository->paginate(0);
    }

    public function deleteFeedback(Feedback $feedback): bool
    {
        return $this->feedbackRepository->delete($feedback);
    }
}
