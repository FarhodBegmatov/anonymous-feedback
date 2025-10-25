<?php

namespace App\Services;

use App\Models\Faculty;
use App\Repositories\FacultyRepository;
use Illuminate\Database\Eloquent\Collection;

class FacultyService
{
    public function __construct(
        private FacultyRepository $facultyRepository
    ) {}

    public function getAllFaculties(): Collection
    {
        return $this->facultyRepository->all();
    }

    public function getFacultyById(int $id): ?Faculty
    {
        return $this->facultyRepository->find($id);
    }

    public function createFaculty(array $data): Faculty
    {
        return $this->facultyRepository->create([
            'name' => $data['name']
        ]);
    }

    public function updateFaculty(Faculty $faculty, array $data): Faculty
    {
        return $this->facultyRepository->update($faculty, [
            'name' => $data['name']
        ]);
    }

    public function deleteFaculty(Faculty $faculty): bool
    {
        // Check if faculty has associated departments before deletion
        if ($faculty->departments()->count() > 0) {
            throw new \Exception('Cannot delete faculty with existing departments');
        }

        return $this->facultyRepository->delete($faculty);
    }

    public function forceDeleteFaculty(Faculty $faculty): bool
    {
        foreach ($faculty->departments as $department) {
            $department->delete();
        }

        return $this->facultyRepository->delete($faculty);
    }

    public function getFacultiesWithDepartments(): Collection
    {
        return $this->facultyRepository->withDepartments();
    }

    public function getFacultyWithFeedbacks(Faculty $faculty): Faculty
    {
        return $this->facultyRepository->withFeedbacks($faculty);
    }
}
