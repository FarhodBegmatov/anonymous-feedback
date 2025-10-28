<?php

namespace App\Repositories;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Base Repository following SOLID principles
 * - Single Responsibility: Handles common data access operations
 * - Open/Closed: Open for extension, closed for modification
 * - DRY: Centralized pagination and query logic
 */
abstract class BaseRepository
{
    protected Model $model;

    /**
     * Get all records
     */
    public function all(): Collection
    {
        return $this->model->all();
    }

    /**
     * Find a record by ID
     */
    public function find(int $id): ?Model
    {
        return $this->model->find($id);
    }

    /**
     * Create a new record
     */
    public function create(array $data): Model
    {
        return $this->model->create($data);
    }

    /**
     * Update a record
     */
    public function update(Model $model, array $data): Model
    {
        $model->update($data);
        return $model->fresh();
    }

    /**
     * Delete a record
     */
    public function delete(Model $model): bool
    {
        return $model->delete();
    }

    /**
     * Get paginated results
     */
    public function paginate(int $perPage = 15, array $relations = []): LengthAwarePaginator
    {
        $query = $this->getBaseQuery();
        
        if (!empty($relations)) {
            $query->with($relations);
        }

        return $query->paginate($perPage);
    }

    /**
     * Get base query builder
     */
    protected function getBaseQuery(): Builder
    {
        return $this->model->query();
    }

    /**
     * Get query with relations loaded
     */
    protected function withRelations(array $relations): Builder
    {
        return $this->getBaseQuery()->with($relations);
    }
}
