<?php

namespace App\Repositories;

use App\Models\Department;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

class DepartmentRepository
{
    public function __construct(private Department $model) {}

    /**
     * Get all departments
     */
    public function all(): Collection
    {
        return $this->model->with('faculty')->get();
    }

    /**
     * Find a department by ID
     */
    public function find(int $id): ?Department
    {
        return $this->model->with('faculty')->find($id);
    }

    /**
     * Create a new department
     */
    public function create(array $data): Department
    {
        return $this->model->create($data);
    }

    /**
     * Update an existing department
     */
    public function update(Department $department, array $data): Department
    {
        $department->update($data);
        return $department;
    }

    /**
     * Delete a department
     */
    public function delete(Department $department): bool
    {
        return $department->delete();
    }

    /**
     * Paginate departments with optional filters
     * Supports search by name and filter by faculty_id
     */
    public function paginate(int $perPage = 10, array $filters = []): LengthAwarePaginator
    {
        $query = $this->model->query()->with('faculty');

        // Qidiruv filteri: name
        if (!empty($filters['search'])) {
            $search = $filters['search'];
            $query->where(function ($q) use ($search) {
                $q->where('name->en', 'LIKE', "%{$search}%")
                    ->orWhere('name->uz', 'LIKE', "%{$search}%")
                    ->orWhere('name->ru', 'LIKE', "%{$search}%");
            });
        }

        // Fakultet bo‘yicha filter
        if (!empty($filters['faculty_id'])) {
            $query->where('faculty_id', $filters['faculty_id']);
        }

        return $query->paginate($perPage);
    }

    /**
     * Get departments with their faculties loaded
     */
    public function withFaculty(): Collection
    {
        return $this->model->with('faculty')->get();
    }
}
