<?php

namespace App\Policies;

use App\Models\User;

class ManagerPolicy
{
    // Faqat admin managerlarni boshqarishi mumkin
    public function before(User $user)
    {
        return $user->role === 'admin';
    }

    public function viewAny(User $user)
    {
        return true;
    }

    public function view(User $user)
    {
        return true;
    }

    public function create(User $user)
    {
        return true;
    }

    public function update(User $user)
    {
        return true;
    }

    public function delete(User $user)
    {
        return true;
    }
}
