<?php

namespace App\Repositories;

use App\Models\Feedback;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

class FeedbackRepository
{
    public function all(): Collection
    {
        return Feedback::latest()->get();
    }

    public function paginate(int $perPage = 10): LengthAwarePaginator
    {
        return Feedback::latest()->paginate($perPage);
    }

    public function findByDepartment(int $departmentId, int $perPage = 10): LengthAwarePaginator
    {
        return Feedback::where('department_id', $departmentId)
            ->latest()
            ->paginate($perPage);
    }

    public function findByDepartmentWithComments(int $departmentId, int $perPage = 10): LengthAwarePaginator
    {
        return Feedback::where('department_id', $departmentId)
            ->whereNotNull('comment')
            ->latest()
            ->paginate($perPage);
    }

    public function findByDepartments(array $departmentIds, int $perPage = 10): LengthAwarePaginator
    {
        return Feedback::whereIn('department_id', $departmentIds)
            ->latest()
            ->paginate($perPage);
    }

    public function create(array $data): Feedback
    {
        return Feedback::create($data);
    }

    public function find(int $id): ?Feedback
    {
        return Feedback::find($id);
    }

    public function delete(Feedback $feedback): bool
    {
        return $feedback->delete();
    }
}
