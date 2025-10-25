<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Faculty;
use App\Models\Department;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;

class ManagerController extends Controller
{
    public function index(Request $request)
    {
        $query = User::where('role', 'manager')->with('manageable');

        if ($search = $request->input('search')) {
            $query->where(fn($q) =>
            $q->where('name', 'like', "%{$search}%")
                ->orWhere('email', 'like', "%{$search}%")
            );
        }

        $typeMap = ['faculty' => Faculty::class, 'department' => Department::class];
        if ($type = $request->input('type')) {
            if(isset($typeMap[$type])) {
                $query->where('manageable_type', $typeMap[$type]);
            }
        }

        $managers = $query->orderBy('id', 'desc')->paginate(10)->withQueryString();

        return Inertia::render('Admin/Managers/Index', [
            'managers' => $managers,
            'filters' => $request->only(['search', 'type']),
            'flash' => [
                'success' => session('success'),
                'error' => session('error'),
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Managers/Create', [
            'faculties' => Faculty::all(),
            'departments' => Department::all(),
            'flash' => [
                'success' => session('success'),
                'error' => session('error'),
            ],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
            'manageable_type' => 'required|in:faculty,department',
            'manageable_id' => ['required','integer',
                $request->manageable_type==='faculty' ? 'exists:faculties,id' : 'exists:departments,id'
            ],
        ]);

        try {
            User::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'password' => Hash::make($validated['password']),
                'role' => 'manager',
                'manageable_type' => $validated['manageable_type']==='faculty' ? Faculty::class : Department::class,
                'manageable_id' => $validated['manageable_id'],
            ]);

            return redirect()->route('admin.managers.index')
                ->with('success', 'Manager muvaffaqiyatli yaratildi!');
        } catch (\Exception $e) {
            return back()->with('error','Manager yaratishda xatolik: '.$e->getMessage())->withInput();
        }
    }

    public function edit(User $manager)
    {
        $manager->load('manageable'); // manageable relation

        // O'zbekcha nomini olish
        $manageableNameUz = $manager->manageable ? $manager->manageable->name->uz ?? null : null;

        return Inertia::render('Admin/Managers/Edit', [
            'manager' => $manager,
            'manageableNameUz' => $manageableNameUz, // faqat o'zbekcha nom
            'faculties' => Faculty::all(),
            'departments' => Department::all(),
            'flash' => [
                'success' => session('success'),
                'error' => session('error'),
            ],
        ]);
    }

    public function update(Request $request, User $manager)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $manager->id,
            'manageable_type' => 'required|in:App\Models\Faculty,App\Models\Department',
            'manageable_id' => 'required|integer',
            'password' => 'nullable|string|min:6',
        ]);

        $manager->update([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'manageable_type' => $validated['manageable_type'],
            'manageable_id' => $validated['manageable_id'],
            'password' => $validated['password']
                ? Hash::make($validated['password'])
                : $manager->password,
        ]);

        if ($request->wantsJson()) {
            return response()->json([
                'success' => true,
                'message' => 'Manager muvaffaqiyatli yangilandi!',
                'manager' => $manager,
            ]);
        }

        return redirect()->route('admin.managers.index')
            ->with('success', 'Manager muvaffaqiyatli yangilandi!');
    }



    public function destroy(Request $request, User $manager)
    {
        try {
            $manager->delete();
            
            if ($request->wantsJson() || $request->ajax()) {
                return response()->json([
                    'success' => true,
                    'message' => 'Manager muvaffaqiyatli o\'chirildi.'
                ]);
            }
            
            return redirect()->route('admin.managers.index')
                ->with('success', 'Manager muvaffaqiyatli o\'chirildi.');
                
        } catch (\Exception $e) {
            if ($request->wantsJson() || $request->ajax()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Manager o\'chirishda xatolik: ' . $e->getMessage()
                ], 500);
            }
            
            return back()->with('error', 'Manager o\'chirishda xatolik: ' . $e->getMessage());
        }
    }
}
