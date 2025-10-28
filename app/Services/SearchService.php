<?php

namespace App\Services;

use App\Repositories\DepartmentRepository;
use App\Repositories\FacultyRepository;
use App\Repositories\FeedbackRepository;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

/**
 * Search Service
 * Follows SOLID principles:
 * - Single Responsibility: Only handles search operations
 * - Open/Closed: Extensible for new search types
 * - Dependency Inversion: Uses repository abstractions
 */
class SearchService
{
    public function __construct(
        private readonly FacultyRepository $facultyRepository,
        private readonly DepartmentRepository $departmentRepository,
        private readonly FeedbackRepository $feedbackRepository
    ) {}

    /**
     * Search faculties with pagination
     */
    public function searchFaculties(string $query, int $perPage = 12): LengthAwarePaginator
    {
        return $this->facultyRepository->searchFaculties($query, $perPage);
    }

    /**
     * Search departments within a faculty
     */
    public function searchDepartmentsInFaculty(int $facultyId, string $query, int $perPage = 12): LengthAwarePaginator
    {
        return $this->departmentRepository->searchDepartmentsInFaculty($facultyId, $query, $perPage);
    }

    /**
     * Search feedbacks within a department
     */
    public function searchFeedbacksInDepartment(int $departmentId, string $query, int $perPage = 20): LengthAwarePaginator
    {
        return $this->feedbackRepository->searchFeedbacksInDepartment($departmentId, $query, $perPage);
    }

    /**
     * Get search suggestions for faculties
     */
    public function getFacultySuggestions(string $query, int $limit = 10): Collection
    {
        return $this->facultyRepository->getFacultySuggestions($query, $limit);
    }

    /**
     * Get search suggestions for departments
     */
    public function getDepartmentSuggestions(string $query, int $limit = 10): Collection
    {
        return $this->departmentRepository->getDepartmentSuggestions($query, $limit);
    }

    /**
     * Validate search query
     */
    public function validateQuery(string $query): bool
    {
        // Minimum 2 characters, maximum 100 characters
        return strlen(trim($query)) >= 2 && strlen(trim($query)) <= 100;
    }

    /**
     * Sanitize search query
     */
    public function sanitizeQuery(string $query): string
    {
        return trim(strip_tags($query));
    }

    /**
     * Search departments across all faculties
     */
    public function searchDepartments(string $query, int $perPage = 12): LengthAwarePaginator
    {
        return $this->departmentRepository->searchDepartments($query, $perPage);
    }

    /**
     * Search feedbacks across all departments
     */
    public function searchFeedbacks(string $query, int $perPage = 20): LengthAwarePaginator
    {
        return $this->feedbackRepository->searchFeedbacks($query, $perPage);
    }

    /**
     * Search managers
     */
    public function searchManagers(string $query, int $perPage = 15): LengthAwarePaginator
    {
        return $this->facultyRepository->searchManagers($query, $perPage);
    }

    /**
     * Get manager search suggestions
     */
    public function getManagerSuggestions(string $query, int $limit = 10): Collection
    {
        return $this->facultyRepository->getManagerSuggestions($query, $limit);
    }

    /**
     * Get search statistics
     */
    public function getSearchStats(): array
    {
        return [
            'total_faculties' => $this->facultyRepository->all()->count(),
            'total_departments' => $this->departmentRepository->all()->count(),
            'total_feedbacks' => $this->feedbackRepository->all()->count(),
        ];
    }
}
