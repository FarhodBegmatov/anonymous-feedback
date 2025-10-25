<?php

namespace Tests\Feature;

use App\Models\Department;
use App\Models\Faculty;
use App\Models\Feedback;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class FeedbackTest extends TestCase
{
    use RefreshDatabase;

    protected Department $department;

    protected function setUp(): void
    {
        parent::setUp();
        
        $faculty = Faculty::factory()->create();
        $this->department = Department::factory()->create([
            'faculty_id' => $faculty->id,
        ]);
    }

    public function test_guest_can_submit_feedback(): void
    {
        $data = [
            'department_id' => $this->department->id,
            'grade' => 'good',
            'comment' => 'Great department!',
        ];

        $this->post('/feedback', $data)
            ->assertRedirect()
            ->assertSessionHas('success');

        $this->assertDatabaseHas('feedbacks', [
            'department_id' => $this->department->id,
            'grade' => 'good',
            'comment' => 'Great department!',
        ]);
    }

    public function test_feedback_requires_department(): void
    {
        $this->post('/feedback', [
            'grade' => 'good',
            'comment' => 'Test',
        ])
            ->assertSessionHasErrors('department_id');
    }

    public function test_feedback_requires_grade(): void
    {
        $this->post('/feedback', [
            'department_id' => $this->department->id,
            'comment' => 'Test',
        ])
            ->assertSessionHasErrors('grade');
    }

    public function test_feedback_grade_must_be_valid(): void
    {
        $this->post('/feedback', [
            'department_id' => $this->department->id,
            'grade' => 'invalid',
            'comment' => 'Test',
        ])
            ->assertSessionHasErrors('grade');
    }

    public function test_feedback_comment_is_optional(): void
    {
        $data = [
            'department_id' => $this->department->id,
            'grade' => 'average',
        ];

        $this->post('/feedback', $data)
            ->assertRedirect()
            ->assertSessionHas('success');

        $this->assertDatabaseHas('feedbacks', [
            'department_id' => $this->department->id,
            'grade' => 'average',
        ]);
    }

    public function test_feedback_comment_max_length(): void
    {
        $this->post('/feedback', [
            'department_id' => $this->department->id,
            'grade' => 'good',
            'comment' => str_repeat('a', 1001),
        ])
            ->assertSessionHasErrors('comment');
    }
}
