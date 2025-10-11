<?php

namespace App\Http\Controllers;

use App\Models\Faculty;
use App\Models\Department;
use App\Models\Feedback;
use Illuminate\Support\Facades\App;
use Inertia\Inertia;

class MainController extends Controller
{
    /**
     * Home page: Fakultetlar ro'yxati
     */
    public function index()
    {
        // Barcha fakultetlar bilan birga munosabatlarni yuklash
        $faculties = Faculty::with('departments', 'feedbacks')->get()->map(function ($faculty) {
            $grades = $faculty->feedbacks->map(fn($f) => match ($f->grade) {
                'good' => 5,
                'average' => 3,
                'bad' => 1,
                default => null,
            })->filter();

            return [
                'id' => $faculty->id,
                'name' => $faculty->name,
                'departments_count' => $faculty->departments->count(),
                'feedback_count' => $faculty->feedbacks->count(),
                'average_grade' => $grades->count() ? round($grades->avg(), 1) : null,
            ];
        });

        // ✅ Umumiy statistika
        $total_faculties = $faculties->count();

        $allGrades = Feedback::all()->map(fn($f) => match ($f->grade) {
            'good' => 5,
            'average' => 3,
            'bad' => 1,
            default => null,
        })->filter();

        $total_feedbacks = $allGrades->count();
        $global_average_grade = $total_feedbacks ? round($allGrades->avg(), 1) : null;

        return Inertia::render('Home', [
            'faculties' => $faculties,
            'locale' => app()->getLocale(),
            'translations' => __('messages'),

            // ✅ Qo‘shimcha kiritilgan qiymatlar
            'total_faculties' => $total_faculties,
            'total_feedbacks' => $total_feedbacks,
            'global_average_grade' => $global_average_grade,
        ]);
    }


    /**
     * Fakultet sahifasi: Kafedralar ro'yxati
     */
    public function faculty(Faculty $faculty)
    {
        $departments = $faculty->departments->map(function ($dept) {
            $grades = $dept->feedbacks->map(fn($f) => match ($f->grade) {
                'good' => 5,
                'average' => 3,
                'bad' => 1,
                default => null,
            })->filter();

            return [
                'id' => $dept->id,
                'name' => $dept->name,
                'feedback_count' => $dept->feedbacks->count(),
                'good_feedback_count' => $dept->feedbacks->where('grade', 'good')->count(),
                'average_feedback_count' => $dept->feedbacks->where('grade', 'average')->count(),
                'bad_feedback_count' => $dept->feedbacks->where('grade', 'bad')->count(),
                'average_grade' => $grades->count() ? round($grades->avg(), 1) : null,
            ];
        });

        // fakultetning o‘rtacha reytingi
        $allScores = $faculty->departments->flatMap(function ($dept) {
            return $dept->feedbacks->map(fn($f) => match ($f->grade) {
                'good' => 5,
                'average' => 3,
                'bad' => 1,
                default => null,
            });
        })->filter();

        return Inertia::render('Faculty', [
            'faculty' => [
                'id' => $faculty->id,
                'name' => $faculty->name,
                'feedback_count' => $faculty->feedbacks->count(),
                'department_count' => $faculty->departments()->count(),
                'average_grade' => $allScores->count() ? round($allScores->avg(), 1) : null,
            ],
            'departments' => $departments,
            'locale' => app()->getLocale(),
            'translations' =>  __('messages'),
        ]);
    }
    /**
     * Feedback form sahifasi
     */
    public function feedbackForm(Department $department)
    {
        $feedbacks = Feedback::where('department_id', $department->id)
            ->whereNotNull('comment') // comment borlarini olib
            ->orderByDesc('created_at')
            ->paginate(10) // pagination 10 tadan
            ->withQueryString(); // URLni saqlab qoladi

        return Inertia::render('FeedbackForm', [
            'department' => $department,
            'feedbacks' => $feedbacks,
            'locale' => app()->getLocale(),
            'translations' => __('messages'),
        ]);
    }

}
