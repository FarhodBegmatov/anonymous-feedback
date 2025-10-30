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

        // Only load counts if the relationships exist
        if (method_exists($this->model, 'departments')) {
            $query->withCount('departments');
        }
        if (method_exists($this->model, 'feedbacks')) {
            $query->withCount('feedbacks');
        }

        // Search filter
        if (!empty($filters['search'])) {
            $search = $filters['search'];
            $query->where(function ($q) use ($search) {
                $q->where('name->en', 'LIKE', "%{$search}%")
                    ->orWhere('name->uz', 'LIKE', "%{$search}%")
                    ->orWhere('name->ru', 'LIKE', "%{$search}%");
            });
        }

        // Always order by ID to ensure consistent pagination
        $query->orderBy('id');

        return $query->paginate($perPage)
            ->withQueryString();
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

    public function getFacultySuggestions(string $query = null)
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
            ->select('id', 'name')
            ->limit(10)
            ->get();
    }

    public function searchManagers(string $query = '', int $perPage = 10)
    {
        $queryBuilder = $this->model->query()
            ->with(['manageable']); // Masalan, fakultet yoki bo‘lim (department) bilan birga olish uchun

        if (!empty($query)) {
            $queryBuilder->where(function ($q) use ($query) {
                $q->where('name', 'like', "%{$query}%")
                    ->orWhere('email', 'like', "%{$query}%");
            });
        }

        return $queryBuilder
            ->select('id', 'name', 'email', 'manageable_type', 'manageable_id')
            ->orderBy('name')
            ->paginate($perPage);
    }

    public function getManagerSuggestions(string $query, int $limit = 5)
    {
        return $this->model
            ->where(function ($q) use ($query) {
                $q->where('name', 'like', "%{$query}%")
                    ->orWhere('email', 'like', "%{$query}%");
            })
            ->select('id', 'name', 'email')
            ->orderBy('name')
            ->limit($limit)
            ->get();
    }

    public function searchFaculties(string $query, int $perPage = 10)
    {
        return $this->model
            ->where(function ($q) use ($query) {
                $q->where('name->uz', 'like', "%{$query}%")
                    ->orWhere('name->en', 'like', "%{$query}%")
                    ->orWhere('name->ru', 'like', "%{$query}%");
            })
            ->orderBy('name->uz')
            ->paginate($perPage);
    }



}
