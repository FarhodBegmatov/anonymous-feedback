<?php

namespace App\Http\Controllers\Manager;


use App\Models\Faculty;
use App\Models\Department;
use App\Http\Controllers\Controller;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $manageable = $user->manageable;

        // Inertia frontga yuboriladigan asosiy ma'lumotlar
        $data = [
            'auth' => [
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role,
                    'faculty_id' => $user->faculty_id,
                    'department_id' => $user->department_id,
                ],
            ],
            'type' => null,
            'feedbacks' => [],
            'average' => null,
            'message' => null,
        ];

        // Agar manager hech narsa bilan bog‘lanmagan bo‘lsa
        if (!$manageable) {
            $data['message'] = 'Siz hali hech bir fakultet yoki kafedraga biriktirilmagansiz.';
            return inertia('Admin/Managers/Dashboard', $data);
        }

        // Kafedra manageri
        if ($user->isDepartmentManager()) {
            $department = Department::with('feedbacks', 'faculty')->find($manageable->id);

            $feedbacks = $department->feedbacks->map(fn($f) => [
                'id' => $f->id,
                'grade' => $f->grade,
                'comment' => $f->comment,
                'rating' => match($f->grade) {
                    'good' => 5,
                    'average' => 3,
                    'bad' => 1,
                    default => 0,
                },
                'created_at' => $f->created_at,
            ]);

            $data['type'] = 'department';
            $data['department'] = [
                'id' => $department->id,
                'name' => (array) $department->name,
                'faculty' => [
                    'id' => $department->faculty->id,
                    'name' => (array) $department->faculty->name,
                ],
            ];
            $data['feedbacks'] = $feedbacks;
            $data['average'] = $feedbacks->count() > 0 ? round($feedbacks->avg('rating'), 2) : null;
        }

        // Fakultet manageri
        if ($user->isFacultyManager()) {
            $faculty = Faculty::with(['departments.feedbacks'])->find($manageable->id);

            $departments = $faculty->departments->map(fn($d) => [
                'id' => $d->id,
                'name' => (array) $d->name,
                'feedback_count' => $d->feedbacks->count(),
                'average' => $d->feedbacks->count() > 0
                    ? round($d->feedbacks->avg(fn($f) => match($f->grade) {
                        'good' => 5,
                        'average' => 3,
                        'bad' => 1,
                        default => 0,
                    }), 2)
                    : null,
            ]);

            $data['type'] = 'faculty';
            $data['faculty'] = [
                'id' => $faculty->id,
                'name' => (array) $faculty->name,
            ];
            $data['departments'] = $departments;
        }

        return inertia('Admin/Managers/Dashboard', $data);
    }
}
