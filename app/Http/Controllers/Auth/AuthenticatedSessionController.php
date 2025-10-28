<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthenticatedSessionController extends Controller
{
    public function store(Request $request)
    {
        if (Auth::attempt([
            'name' => $request->name,
            'password' => $request->password,
        ])) {
            $request->session()->regenerate();

            $user = Auth::user();

            // 👇 Userning roliga qarab yo‘naltirish
            if ($user->isAdmin()) {
                return redirect()->route('admin.faculties.index');
            }
            if ($user->isManager()) {
                return redirect()->route('manager.dashboard');
            }
        }
        return back()->withErrors([
            'name' => 'Login maʼlumotlari noto‘g‘ri.',
        ]);
    }


    public function destroy(Request $request)
    {
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }

    public function create()
    {
        return inertia('auth/login', [
            'translations' => [
                'email' => 'Email',
                'password' => 'Parol',
                'login' => 'Kirish',
                'remember_me' => 'Eslab qolish',
            ],
        ]);
    }
}
