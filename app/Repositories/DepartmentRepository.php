<?php

namespace App\Repositories;

use App\Models\Department;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator as LengthAwarePaginatorAlias;

readonly class DepartmentRepository
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

        // Search filter: name
        if (!empty($filters['search'])) {
            $search = $filters['search'];
            $query->where(function ($q) use ($search) {
                $q->where('name->en', 'LIKE', "%{$search}%")
                    ->orWhere('name->uz', 'LIKE', "%{$search}%")
                    ->orWhere('name->ru', 'LIKE', "%{$search}%");
            });
        }
        $query->orderBy('id');

        // Filter by faculty
        if (!empty($filters['faculty_id'])) {
            $query->where('faculty_id', $filters['faculty_id']);
        }

        return $query->paginate($perPage)
            ->withQueryString();
    }

    /**
     * Get departments with their faculties loaded
     */
    public function withFaculty(): Collection
    {
        return $this->model->with('faculty')->get();
    }

    public function paginateByFaculty(int $facultyId, int $perPage)
    {
        return $this->model
            ->where('faculty_id', $facultyId)
            ->with(['faculty', 'feedbacks']) // Load necessary relationships
            ->paginate($perPage);
    }

    public function searchDepartmentsInFaculty(int $facultyId, mixed $query, int $perPage)
    {
        return $this->model
            ->where('faculty_id', $facultyId)
            ->where(function ($q) use ($query) {
                $q->where('name->uz', 'LIKE', "%{$query}%")
                    ->orWhere('name->ru', 'LIKE', "%{$query}%")
                    ->orWhere('name->en', 'LIKE', "%{$query}%");
            })
            ->with(['faculty', 'feedbacks'])
            ->paginate($perPage);
    }

    public function getDepartmentSuggestions(string $query = null, int $limit = 10): Collection
    {
        $queryBuilder = $this->model->query();

        if (!empty($query)) {
            $queryBuilder->where(function ($q) use ($query) {
                $q->where('name->uz', 'like', "%{$query}%")
                    ->orWhere('name->en', 'like', "%{$query}%")
                    ->orWhere('name->ru', 'like', "%{$query}%");
            });
        }

        return $queryBuilder
            ->select('id', 'name', 'faculty_id')
            ->limit($limit)
            ->get();
    }

    public function searchDepartments(string $query = '', int $perPage = 10): LengthAwarePaginatorAlias
    {
        $queryBuilder = $this->model->query();

        if (!empty($query)) {
            $queryBuilder->where(function ($q) use ($query) {
                $q->where('name->uz', 'like', "%{$query}%")
                    ->orWhere('name->en', 'like', "%{$query}%")
                    ->orWhere('name->ru', 'like', "%{$query}%");
            });
        }

        return $queryBuilder
            ->with('faculty:id,name') // Also get the faculty name
            ->select('id', 'name', 'faculty_id')
            ->orderBy('name->uz')
            ->paginate($perPage);
    }

}
