<?php

namespace Tests\Unit;

use App\Models\Feedback;
use App\Services\FeedbackRatingService;
use Illuminate\Support\Collection;
use Tests\TestCase;

class FeedbackRatingServiceTest extends TestCase
{
    protected FeedbackRatingService $service;

    protected function setUp(): void
    {
        parent::setUp();
        $this->service = new FeedbackRatingService();
    }

    public function test_grade_to_rating_good(): void
    {
        $this->assertEquals(5, $this->service->gradeToRating('good'));
    }

    public function test_grade_to_rating_average(): void
    {
        $this->assertEquals(3, $this->service->gradeToRating('average'));
    }

    public function test_grade_to_rating_bad(): void
    {
        $this->assertEquals(1, $this->service->gradeToRating('bad'));
    }

    public function test_grade_to_rating_invalid(): void
    {
        $this->assertEquals(0, $this->service->gradeToRating('invalid'));
    }

    public function test_calculate_average_with_feedbacks(): void
    {
        $feedbacks = collect([
            (object)['grade' => 'good'],
            (object)['grade' => 'average'],
            (object)['grade' => 'bad'],
        ]);

        $average = $this->service->calculateAverage($feedbacks);
        
        // (5 + 3 + 1) / 3 = 3
        $this->assertEquals(3.0, $average);
    }

    public function test_calculate_average_with_empty_collection(): void
    {
        $feedbacks = collect([]);
        
        $average = $this->service->calculateAverage($feedbacks);
        
        $this->assertNull($average);
    }

    public function test_calculate_average_rounds_to_two_decimals(): void
    {
        $feedbacks = collect([
            (object)['grade' => 'good'],
            (object)['grade' => 'good'],
            (object)['grade' => 'average'],
        ]);

        $average = $this->service->calculateAverage($feedbacks);
        
        // (5 + 5 + 3) / 3 = 4.33
        $this->assertEquals(4.33, $average);
    }

    public function test_map_feedback_to_array(): void
    {
        $feedback = (object)[
            'id' => 1,
            'grade' => 'good',
            'comment' => 'Great!',
            'created_at' => '2024-01-01',
        ];

        $result = $this->service->mapFeedbackToArray($feedback);

        $this->assertEquals([
            'id' => 1,
            'grade' => 'good',
            'comment' => 'Great!',
            'rating' => 5,
            'created_at' => '2024-01-01',
        ], $result);
    }
}
