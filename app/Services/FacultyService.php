<?php

namespace App\Services;

use App\Models\Faculty;
use App\Repositories\FacultyRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class FacultyService
{
    public function __construct(
        private FacultyRepository $facultyRepository
    ) {}

    /**
     * Get all faculties
     */
    public function getAllFaculties(): Collection
    {
        return $this->facultyRepository->all();
    }

    /**
     * Get paginated list of faculties with optional filters
     */
    public function getPaginatedFaculties(int $perPage = 10, array $filters = []): LengthAwarePaginator
    {
        return $this->facultyRepository->paginate($perPage, $filters);
    }

    /**
     * Get a single faculty by ID
     */
    public function getFacultyById(int $id): ?Faculty
    {
        return $this->facultyRepository->find($id);
    }

    /**
     * Create a new faculty
     */
    public function createFaculty(array $data): Faculty
    {
        return $this->facultyRepository->create([
            'name' => $data['name'],
        ]);
    }

    /**
     * Update an existing faculty
     */
    public function updateFaculty(Faculty $faculty, array $data): Faculty
    {
        return $this->facultyRepository->update($faculty, [
            'name' => $data['name'],
        ]);
    }

    /**
     * Delete a faculty
     * Throws exception if it has associated departments
     */
    public function deleteFaculty(Faculty $faculty): bool
    {
        if ($faculty->departments()->count() > 0) {
            throw new \Exception('Cannot delete faculty with existing departments. Please delete all departments first.');
        }

        return $this->facultyRepository->delete($faculty);
    }

    /**
     * Force delete faculty along with all related departments
     */
    public function forceDeleteFaculty(Faculty $faculty): bool
    {
        foreach ($faculty->departments as $department) {
            $department->delete();
        }

        return $this->facultyRepository->delete($faculty);
    }

    /**
     * Get faculties with their departments
     */
    public function getFacultiesWithDepartments(): Collection
    {
        return $this->facultyRepository->withDepartments();
    }

    /**
     * Get a faculty with its feedbacks
     */
    public function getFacultyWithFeedbacks(Faculty $faculty): Faculty
    {
        return $this->facultyRepository->withFeedbacks($faculty);
    }
}
