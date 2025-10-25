<?php

namespace App\Repositories;

use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

class ManagerRepository
{
    public function all(): Collection
    {
        return User::where('role', 'manager')
            ->with('manageable')
            ->orderBy('id', 'desc')
            ->get();
    }

    public function paginate(int $perPage = 10, array $filters = []): LengthAwarePaginator
    {
        $query = User::where('role', 'manager')->with('manageable');

        if (isset($filters['search']) && $filters['search']) {
            $search = $filters['search'];
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }

        if (isset($filters['type']) && $filters['type']) {
            $typeMap = [
                'faculty' => \App\Models\Faculty::class,
                'department' => \App\Models\Department::class
            ];

            if (isset($typeMap[$filters['type']])) {
                $query->where('manageable_type', $typeMap[$filters['type']]);
            }
        }

        return $query->orderBy('id', 'desc')->paginate($perPage)->withQueryString();
    }

    public function find(int $id): ?User
    {
        return User::where('role', 'manager')->find($id);
    }

    public function findWithRelations(int $id): ?User
    {
        return User::where('role', 'manager')
            ->with('manageable')
            ->find($id);
    }

    public function create(array $data): User
    {
        return User::create($data);
    }

    public function update(User $manager, array $data): User
    {
        $manager->update($data);
        return $manager->fresh();
    }

    public function delete(User $manager): bool
    {
        return $manager->delete();
    }
}
