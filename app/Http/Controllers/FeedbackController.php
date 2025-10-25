<?php

namespace App\Http\Controllers;

use App\Models\Feedback;
use App\Models\Department;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Http\RedirectResponse;

class FeedbackController extends Controller
{
    // Anonim feedback qoldirish
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'department_id' => 'required|exists:departments,id',
            'grade' => 'required|in:good,average,bad',
            'comment' => 'nullable|string|max:1000',
        ]);

        Feedback::create($validated);

        return back()->with('success', 'Fikr muvaffaqiyatli yuborildi!');
    }

    // Manager o'ziga tegishli feedbacklarni ko'radi
    public function managerIndex()
    {
        $user = Auth::user();

        if ($user->manageable_type === \App\Models\Faculty::class) {
            $feedbacks = Feedback::whereIn('department_id',
                Department::where('faculty_id', $user->manageable_id)->pluck('id')
            )->latest()->paginate(10);
        } else {
            $feedbacks = Feedback::where('department_id', $user->manageable_id)
                ->latest()
                ->paginate(10);
        }

        return Inertia::render('Manager/Feedbacks/Index', [
            'feedbacks' => $feedbacks
        ]);
    }
}
