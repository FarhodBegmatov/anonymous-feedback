<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Faculty;

class RatingController extends Controller
{
    public function index()
    {
        $locale = app()->getLocale();

        $faculties = Faculty::with(['departments' => function ($q) {
            $q->withCount('feedbacks')
                ->select('departments.*')
                ->selectSub(function ($sub) {
                    $sub->from('feedbacks')
                        ->selectRaw("
                          AVG(
                              CASE
                                  WHEN grade = 'good' THEN 5
                                  WHEN grade = 'average' THEN 3
                                  WHEN grade = 'bad' THEN 1
                                  ELSE NULL
                              END
                          )
                      ")
                        ->whereColumn('feedbacks.department_id', 'departments.id');
                }, 'average_grade');
        }])
            ->get()
            ->map(function ($faculty) {
                $facultyAverage = null;
                if ($faculty->departments->count() > 0) {
                    $facultyAverage = $faculty->departments
                        ->avg(fn($dept) => (float) $dept->average_grade);
                }

                return [
                    'id' => $faculty->id,
                    'name' => $faculty->name,
                    'average_grade' => $facultyAverage ? round($facultyAverage, 1) : null,
                    'departments' => $faculty->departments->map(function ($dept) {
                        return [
                            'id' => $dept->id,
                            'name' => $dept->name,
                            'feedback_count' => $dept->feedbacks_count,
                            'average_grade' => $dept->average_grade
                                ? round((float)$dept->average_grade, 1)
                                : null,
                        ];
                    }),
                ];
            });

        // 🔽 Eng yaxshi va eng yomon kafedralarni ajratib olish
        $allDepartments = $faculties->flatMap->departments;

        $bestDepartments = $allDepartments
            ->filter(fn($dept) => $dept['average_grade'] !== null && $dept['average_grade'] > 4.5)
            ->sortByDesc('average_grade')
            ->take(5) // faqat eng kuchli 5 ta
            ->values();

        $worstDepartments = $allDepartments
            ->filter(fn($dept) => $dept['average_grade'] !== null && $dept['average_grade'] < 2.5)
            ->sortBy('average_grade')
            ->take(5) // faqat eng yomon 5 ta
            ->values();

        return Inertia::render('Ratings', [
            'faculties' => $faculties,
            'bestDepartments' => $bestDepartments,
            'worstDepartments' => $worstDepartments,
            'locale' => $locale,
            'translations' =>  __('messages'),

        ]);
    }
}
