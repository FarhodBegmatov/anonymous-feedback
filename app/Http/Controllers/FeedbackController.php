<?php

namespace App\Http\Controllers;

use App\Models\Feedback;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;

class FeedbackController extends Controller
{
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
}
