<?php

namespace App\Services\Transformers;

use App\Models\Faculty;
use App\Services\FeedbackRatingService;
use Illuminate\Support\Collection;

/**
 * Faculty Data Transformer
 * Follows Single Responsibility Principle - only transforms faculty data
 */
class FacultyTransformer
{
    public function __construct(
        private readonly FeedbackRatingService $ratingService
    ) {}

    /**
     * Transform a single faculty model to array
     */
    public function transform(Faculty $faculty): array
    {
        return [
            'id' => $faculty->id,
            'name' => $faculty->name,
            'departments_count' => $faculty->departments->count(),
            'feedback_count' => $faculty->feedbacks->count(),
            'average_grade' => $this->ratingService->calculateAverage($faculty->feedbacks),
        ];
    }

    /**
     * Transform a collection of faculties
     */
    public function transformCollection(Collection $faculties): Collection
    {
        return $faculties->map(fn($faculty) => $this->transform($faculty));
    }

    /**
     * Transform faculty for detail page
     */
    public function transformForDetailPage(Faculty $faculty): array
    {
        $allFeedbacks = $faculty->departments->flatMap(fn($dept) => $dept->feedbacks);

        return [
            'id' => $faculty->id,
            'name' => $faculty->name,
            'feedback_count' => $faculty->feedbacks->count(),
            'department_count' => $faculty->departments()->count(),
            'average_grade' => $this->ratingService->calculateAverage($allFeedbacks),
        ];
    }
}
