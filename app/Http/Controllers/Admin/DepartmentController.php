<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Department;
use App\Models\Faculty;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DepartmentController extends Controller
{
    public function index()
    {
        $departments = Department::with('faculty')->get();
        return Inertia::render('Admin/Departments/Index', compact('departments'));
    }

    public function create()
    {
        $faculties = Faculty::all();
        return Inertia::render('Admin/Departments/Create', compact('faculties'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'faculty_id' => 'required|exists:faculties,id',
            'name.en' => 'required|string|unique:departments,name->en',
            'name.uz' => 'required|string',
            'name.ru' => 'required|string',
        ]);

        Department::create([
            'faculty_id' => $validated['faculty_id'],
            'name' => $validated['name'],
        ]);

        // Inertia orqali darhol index sahifani yangilash
        $departments = Department::with('faculty')->get();
        return Inertia::render('Admin/Departments/Index', compact('departments'));
    }

    public function show(Department $department)
    {
        return Inertia::render('Admin/Departments/Show', compact('department'));
    }

    public function edit(Department $department)
    {
        $faculties = Faculty::all();
        return Inertia::render('Admin/Departments/Edit', compact('department', 'faculties'));
    }

    public function update(Request $request, Department $department)
    {
        $validated = $request->validate([
            'faculty_id' => 'required|exists:faculties,id',
            'name.en' => 'required|string|max:255',
            'name.uz' => 'required|string|max:255',
            'name.ru' => 'required|string|max:255',
        ]);

        $department->update($validated);

        // Inertia orqali darhol index sahifani yangilash
        $departments = Department::with('faculty')->get();
        return Inertia::render('Admin/Departments/Index', compact('departments'));
    }

    public function destroy(Department $department)
    {
        $department->delete();

        // Inertia orqali darhol index sahifani yangilash
        $departments = Department::with('faculty')->get();
        return Inertia::render('Admin/Departments/Index', compact('departments'));
    }
}
