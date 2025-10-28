<?php

namespace App\Services\Transformers;

use App\Models\Department;
use App\Services\FeedbackRatingService;
use Illuminate\Support\Collection;

/**
 * Department Data Transformer
 * Follows Single Responsibility Principle - only transforms department data
 */
class DepartmentTransformer
{
    public function __construct(
        private readonly FeedbackRatingService $ratingService
    ) {}

    /**
     * Transform a single department model to array
     */
    public function transform(Department $department): array
    {
        return [
            'id' => $department->id,
            'name' => $department->name,
            'feedback_count' => $department->feedbacks->count(),
            'good_feedback_count' => $department->feedbacks->where('grade', 'good')->count(),
            'average_feedback_count' => $department->feedbacks->where('grade', 'average')->count(),
            'bad_feedback_count' => $department->feedbacks->where('grade', 'bad')->count(),
            'average_grade' => $this->ratingService->calculateAverage($department->feedbacks),
        ];
    }

    /**
     * Transform a collection of departments
     */
    public function transformCollection(Collection $departments): Collection
    {
        return $departments->map(fn($dept) => $this->transform($dept));
    }
}
