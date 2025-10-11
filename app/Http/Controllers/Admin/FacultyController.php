<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Faculty;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FacultyController extends Controller
{
    public function index()
    {
        $faculties = Faculty::all();
        return Inertia::render('Admin/Faculties/Index', compact('faculties'));
    }

    public function create()
    {
        return Inertia::render('Admin/Faculties/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name.en' => 'required|string|max:255',
            'name.uz' => 'required|string|max:255',
            'name.ru' => 'required|string|max:255',
        ]);

        Faculty::create($request->all());

        $faculties = Faculty::all();

        return Inertia::render('Admin/Faculties/Index', compact('faculties'));
    }

//    public function show(Faculty $faculty)
//    {
//        return Inertia::render('Admin/Faculties/Show', [
//            'faculty' => $faculty,
//        ]);
//    }

    public function edit(Faculty $faculty)
    {
        return Inertia::render('Admin/Faculties/Edit', [
            'faculty' => $faculty
        ]);
    }

    public function update(Request $request, Faculty $faculty)
    {
        $request->validate([
            'name.en' => 'required|string|max:255',
            'name.uz' => 'required|string|max:255',
            'name.ru' => 'required|string|max:255',
        ]);

        $faculty->update($request->only([
            'name.en', 'name.uz', 'name.ru'
        ]));

        // Faculties index ma'lumotlarini olish
        $faculties = Faculty::all();

        // Inertia orqali index sahifani qayta render qilish
        return Inertia::render('Admin/Faculties/Index', compact('faculties'));
    }

    public function destroy(Faculty $faculty)
    {
        $faculty->delete();

        $faculties = Faculty::all();

        return Inertia::render('Admin/Faculties/Index', compact('faculties'));
    }
}
