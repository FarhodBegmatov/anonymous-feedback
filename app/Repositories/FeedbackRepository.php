<?php

namespace App\Repositories;

use App\Models\Feedback;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class FeedbackRepository
{
    /**
     * Bazaviy so‘rov (modelga asoslangan)
     */
    protected function getBaseQuery()
    {
        return Feedback::query();
    }

    /**
     * Barcha fikrlarni olish
     */
    public function all(int $perPage = 20): LengthAwarePaginator
    {
        return $this->getBaseQuery()
            ->with(['department.faculty'])
            ->latest()
            ->paginate($perPage);
    }

    /**
     * Fikrni ID orqali topish
     */
    public function find(int $id): ?Feedback
    {
        return Feedback::with(['department.faculty'])->find($id);
    }

    /**
     * Yangi fikr yaratish
     */
    public function create(array $data): Feedback
    {
        return Feedback::create($data);
    }

    /**
     * Fikrni o‘chirish
     */
    public function delete(int $id): bool
    {
        $feedback = Feedback::find($id);
        return $feedback ? $feedback->delete() : false;
    }

    /**
     * 🔍 Barcha bo‘limlarda izlash
     */
    public function searchFeedbacks(string $query, int $perPage = 20): LengthAwarePaginator
    {
        return $this->getBaseQuery()
            ->where('comment', 'like', "%{$query}%")
            ->with(['department.faculty'])
            ->latest()
            ->paginate($perPage);
    }

    /**
     * 🔍 Muayyan bo‘lim ichida izlash
     */
    public function searchFeedbacksInDepartment(int $departmentId, string $query, int $perPage = 20): LengthAwarePaginator
    {
        return $this->getBaseQuery()
            ->where('department_id', $departmentId)
            ->where('comment', 'like', "%{$query}%")
            ->with(['department.faculty'])
            ->latest()
            ->paginate($perPage);
    }

    public function findByDepartmentWithComments(int $departmentId, int $perPage)
    {
        return $this->model
            ->where('department_id', $departmentId)
            ->with(['comments.user', 'department', 'user']) // kerakli relatsiyalarni yuklash
            ->orderByDesc('created_at')
            ->paginate($perPage);
    }
}
