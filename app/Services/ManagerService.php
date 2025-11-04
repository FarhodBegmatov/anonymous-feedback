<?php

namespace App\Services;

use App\Models\Department;
use App\Models\Faculty;
use App\Models\User;
use App\Repositories\ManagerRepository;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Hash;
use InvalidArgumentException as InvalidArgumentExceptionAlias;

readonly class ManagerService
{
    public function __construct(
        private ManagerRepository $managerRepository
    ) {}

    public function getAllManagers(): Collection
    {
        return $this->managerRepository->all();
    }

    public function getPaginatedManagers(int $perPage = 10, array $filters = []): LengthAwarePaginator
    {
        return $this->managerRepository->paginate($perPage, $filters);
    }

    public function getManagerById(int $id): ?User
    {
        return $this->managerRepository->findWithRelations($id);
    }

    public function createManager(array $data): User
    {
        $manageableType = $this->resolveManageableType($data['manageable_type']);

        return $this->managerRepository->create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'role' => 'manager',
            'manageable_type' => $manageableType,
            'manageable_id' => $data['manageable_id'],
        ]);
    }

    public function updateManager(User $manager, array $data): User
    {
        $manageableType = $this->resolveManageableType($data['manageable_type']);

        $updateData = [
            'name' => $data['name'],
            'email' => $data['email'],
            'manageable_type' => $manageableType,
            'manageable_id' => $data['manageable_id'],
        ];

        // Only update password if provided
        if (!empty($data['password'])) {
            $updateData['password'] = Hash::make($data['password']);
        }

        return $this->managerRepository->update($manager, $updateData);
    }

    public function deleteManager(User $manager): bool
    {
        return $this->managerRepository->delete($manager);
    }

    private function resolveManageableType(string $type): string
    {
        return match ($type) {
            'faculty', Faculty::class => Faculty::class,
            'department', Department::class => Department::class,
            default => throw new InvalidArgumentExceptionAlias("Invalid manageable type: $type"),
        };
    }
}
