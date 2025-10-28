<?php

namespace App\Repositories;

use App\Models\Faculty;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

class FacultyRepository
{
    public function __construct(private Faculty $model) {}

    /**
     * Get all faculties
     */
    public function all(): Collection
    {
        return $this->model->all();
    }

    /**
     * Find faculty by ID
     */
    public function find(int $id): ?Faculty
    {
        return $this->model->find($id);
    }

    /**
     * Create a new faculty
     */
    public function create(array $data): Faculty
    {
        return $this->model->create($data);
    }

    /**
     * Update existing faculty
     */
    public function update(Faculty $faculty, array $data): Faculty
    {
        $faculty->update($data);
        return $faculty;
    }

    /**
     * Delete a faculty
     */
    public function delete(Faculty $faculty): bool
    {
        return $faculty->delete();
    }

    /**
     * Paginate faculties with optional filters
     */
    public function paginate(int $perPage = 10, array $filters = []): LengthAwarePaginator
    {
        $query = $this->model->query();

        // Qidiruv filteri
        if (!empty($filters['search'])) {
            $search = $filters['search'];
            $query->where(function ($q) use ($search) {
                $q->where('name->en', 'LIKE', "%{$search}%")
                    ->orWhere('name->uz', 'LIKE', "%{$search}%")
                    ->orWhere('name->ru', 'LIKE', "%{$search}%");
            });
        }

        return $query->with(['departments', 'feedbacks'])
            ->paginate($perPage);
    }

    /**
     * Get faculties with departments loaded
     */
    public function withDepartments(): Collection
    {
        return $this->model->with('departments')->get();
    }

    /**
     * Get faculty with feedbacks loaded
     */
    public function withFeedbacks(Faculty $faculty): Faculty
    {
        return $faculty->load('feedbacks');
    }
}
