<?php

namespace Tests\Feature;

use App\Models\Faculty;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class FacultyTest extends TestCase
{
    use RefreshDatabase;

    protected User $admin;

    protected function setUp(): void
    {
        parent::setUp();
        
        $this->admin = User::factory()->create([
            'role' => 'admin',
            'email' => 'admin@test.com',
        ]);
    }

    public function test_admin_can_view_faculties_index(): void
    {
        $this->actingAs($this->admin)
            ->get('/admin/faculties')
            ->assertStatus(200)
            ->assertInertia(fn ($page) => $page->component('Admin/Faculties/Index'));
    }

    public function test_admin_can_create_faculty(): void
    {
        $data = [
            'name' => [
                'en' => 'Engineering',
                'uz' => 'Muhandislik',
                'ru' => 'Инженерия',
            ],
        ];

        $this->actingAs($this->admin)
            ->post('/admin/faculties', $data)
            ->assertRedirect('/admin/faculties')
            ->assertSessionHas('success');

        $this->assertDatabaseHas('faculties', [
            'name->en' => 'Engineering',
        ]);
    }

    public function test_admin_can_update_faculty(): void
    {
        $faculty = Faculty::factory()->create();

        $data = [
            'name' => [
                'en' => 'Updated Faculty',
                'uz' => 'Yangilangan Fakultet',
                'ru' => 'Обновленный Факультет',
            ],
        ];

        $this->actingAs($this->admin)
            ->put('/admin/faculties/' . $faculty->id, $data)
            ->assertRedirect('/admin/faculties')
            ->assertSessionHas('success');

        $this->assertDatabaseHas('faculties', [
            'id' => $faculty->id,
            'name->en' => 'Updated Faculty',
        ]);
    }

    public function test_admin_can_delete_faculty(): void
    {
        $faculty = Faculty::factory()->create();

        $this->actingAs($this->admin)
            ->delete('/admin/faculties/' . $faculty->id)
            ->assertRedirect('/admin/faculties')
            ->assertSessionHas('success');

        $this->assertDatabaseMissing('faculties', [
            'id' => $faculty->id,
        ]);
    }

    public function test_faculty_name_is_required(): void
    {
        $this->actingAs($this->admin)
            ->post('/admin/faculties', [])
            ->assertSessionHasErrors('name');
    }

    public function test_guest_cannot_access_faculties(): void
    {
        $this->get('/admin/faculties')
            ->assertRedirect('/login');
    }

    public function test_cannot_delete_faculty_with_departments(): void
    {
        $faculty = Faculty::factory()->create();
        
        // Create a department under this faculty
        \App\Models\Department::factory()->create([
            'faculty_id' => $faculty->id,
        ]);

        $this->actingAs($this->admin)
            ->delete('/admin/faculties/' . $faculty->id)
            ->assertRedirect()
            ->assertSessionHas('error');

        // Faculty should still exist
        $this->assertDatabaseHas('faculties', [
            'id' => $faculty->id,
        ]);
    }
}
