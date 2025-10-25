<?php

namespace Tests\Feature;

use App\Models\Department;
use App\Models\Faculty;
use App\Models\Feedback;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DepartmentTest extends TestCase
{
    use RefreshDatabase;

    protected User $admin;
    protected Faculty $faculty;

    protected function setUp(): void
    {
        parent::setUp();
        
        $this->admin = User::factory()->create([
            'role' => 'admin',
            'email' => 'admin@test.com',
        ]);

        $this->faculty = Faculty::factory()->create();
    }

    public function test_admin_can_view_departments_index(): void
    {
        $this->actingAs($this->admin)
            ->get('/admin/departments')
            ->assertStatus(200)
            ->assertInertia(fn ($page) => $page->component('Admin/Departments/Index'));
    }

    public function test_admin_can_create_department(): void
    {
        $data = [
            'faculty_id' => $this->faculty->id,
            'name' => [
                'en' => 'Computer Science',
                'uz' => 'Kompyuter ilimlari',
                'ru' => 'Kompyuternye nauki',
            ],
        ];

        $this->actingAs($this->admin)
            ->post('/admin/departments', $data)
            ->assertRedirect('/admin/departments')
            ->assertSessionHas('success');

        $this->assertDatabaseHas('departments', [
            'faculty_id' => $this->faculty->id,
            'name->en' => 'Computer Science',
        ]);
    }

    public function test_admin_can_update_department(): void
    {
        $department = Department::factory()->create([
            'faculty_id' => $this->faculty->id,
        ]);

        $data = [
            'faculty_id' => $this->faculty->id,
            'name' => [
                'en' => 'Updated Department',
                'uz' => 'Yangilangan Bo\'lim',
                'ru' => 'Obnovlennaya Kafedra',
            ],
        ];

        $this->actingAs($this->admin)
            ->put('/admin/departments/' . $department->id, $data)
            ->assertRedirect('/admin/departments')
            ->assertSessionHas('success');

        $this->assertDatabaseHas('departments', [
            'id' => $department->id,
            'name->en' => 'Updated Department',
        ]);
    }

    public function test_admin_can_delete_department(): void
    {
        $department = Department::factory()->create([
            'faculty_id' => $this->faculty->id,
        ]);

        $this->actingAs($this->admin)
            ->delete('/admin/departments/' . $department->id)
            ->assertRedirect('/admin/departments')
            ->assertSessionHas('success');

        $this->assertDatabaseMissing('departments', [
            'id' => $department->id,
        ]);
    }

    public function test_department_requires_faculty(): void
    {
        $this->actingAs($this->admin)
            ->post('/admin/departments', [
                'name' => [
                    'en' => 'Test',
                    'uz' => 'Test',
                    'ru' => 'Test',
                ],
            ])
            ->assertSessionHasErrors('faculty_id');
    }

    public function test_cannot_delete_department_with_feedbacks(): void
    {
        $department = Department::factory()->create([
            'faculty_id' => $this->faculty->id,
        ]);
        
        // Create feedback for this department
        Feedback::create([
            'department_id' => $department->id,
            'grade' => 'good',
            'comment' => 'Test feedback',
        ]);

        $this->actingAs($this->admin)
            ->delete('/admin/departments/' . $department->id)
            ->assertRedirect()
            ->assertSessionHas('error');

        // Department should still exist
        $this->assertDatabaseHas('departments', [
            'id' => $department->id,
        ]);
    }
}
