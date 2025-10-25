<?php

namespace App\Services;

class FeedbackRatingService
{
    public function gradeToRating(string $grade): int
    {
        return match($grade) {
            'good' => 5,
            'average' => 3,
            'bad' => 1,
            default => 0,
        };
    }

    public function calculateAverage(iterable $feedbacks): ?float
    {
        $ratings = [];
        
        foreach ($feedbacks as $feedback) {
            $ratings[] = $this->gradeToRating($feedback->grade);
        }

        if (empty($ratings)) {
            return null;
        }

        return round(array_sum($ratings) / count($ratings), 2);
    }

    public function mapFeedbackToArray($feedback): array
    {
        return [
            'id' => $feedback->id,
            'grade' => $feedback->grade,
            'comment' => $feedback->comment,
            'rating' => $this->gradeToRating($feedback->grade),
            'created_at' => $feedback->created_at,
        ];
    }
}
