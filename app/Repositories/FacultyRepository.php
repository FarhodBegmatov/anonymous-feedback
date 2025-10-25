<?php

namespace App\Repositories;

use App\Models\Faculty;
use Illuminate\Database\Eloquent\Collection;

class FacultyRepository
{
    public function all(): Collection
    {
        return Faculty::all();
    }

    public function find(int $id): ?Faculty
    {
        return Faculty::find($id);
    }

    public function create(array $data): Faculty
    {
        return Faculty::create($data);
    }

    public function update(Faculty $faculty, array $data): Faculty
    {
        $faculty->update($data);
        return $faculty->fresh();
    }

    public function delete(Faculty $faculty): bool
    {
        return $faculty->delete();
    }

    public function withDepartments(): Collection
    {
        return Faculty::with('departments')->get();
    }

    public function withFeedbacks(Faculty $faculty): Faculty
    {
        return $faculty->load('feedbacks');
    }
}
