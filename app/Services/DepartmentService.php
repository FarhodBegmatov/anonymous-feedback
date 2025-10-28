<?php

namespace App\Services;

use App\Models\Department;
use App\Repositories\DepartmentRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class DepartmentService
{
    public function __construct(private DepartmentRepository $departmentRepository) {}

    /**
     * Get all departments
     */
    public function getAllDepartments(): Collection
    {
        return $this->departmentRepository->all();
    }

    /**
     * Get paginated list of departments with optional filters
     */
    public function getPaginatedDepartments(int $perPage = 10, array $filters = []): LengthAwarePaginator
    {
        return $this->departmentRepository->paginate($perPage, $filters);
    }

    /**
     * Get a single department by ID
     */
    public function getDepartmentById(int $id): ?Department
    {
        return $this->departmentRepository->find($id);
    }

    /**
     * Create a new department
     */
    public function createDepartment(array $data): Department
    {
        return $this->departmentRepository->create([
            'name' => $data['name'],
            'faculty_id' => $data['faculty_id'],
        ]);
    }

    /**
     * Update an existing department
     */
    public function updateDepartment(Department $department, array $data): Department
    {
        return $this->departmentRepository->update($department, [
            'name' => $data['name'],
            'faculty_id' => $data['faculty_id'],
        ]);
    }

    /**
     * Delete a department
     */
    public function deleteDepartment(Department $department): bool
    {
        return $this->departmentRepository->delete($department);
    }
}
