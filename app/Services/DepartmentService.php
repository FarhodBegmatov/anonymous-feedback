<?php

namespace App\Services;

use App\Models\Department;
use App\Repositories\DepartmentRepository;
use Illuminate\Database\Eloquent\Collection;

class DepartmentService
{
    public function __construct(
        private DepartmentRepository $departmentRepository
    ) {}

    public function getAllDepartments(): Collection
    {
        return $this->departmentRepository->all();
    }

    public function getDepartmentById(int $id): ?Department
    {
        return $this->departmentRepository->find($id);
    }

    public function createDepartment(array $data): Department
    {
        return $this->departmentRepository->create([
            'faculty_id' => $data['faculty_id'],
            'name' => $data['name']
        ]);
    }

    public function updateDepartment(Department $department, array $data): Department
    {
        return $this->departmentRepository->update($department, [
            'faculty_id' => $data['faculty_id'],
            'name' => $data['name']
        ]);
    }

    public function deleteDepartment(Department $department): bool
    {
        // Check if department has associated feedbacks before deletion
        if ($department->feedbacks()->count() > 0) {
            throw new \Exception('Cannot delete department with existing feedbacks. Please delete all feedbacks first.');
        }

        return $this->departmentRepository->delete($department);
    }
}
