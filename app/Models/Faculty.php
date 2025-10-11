<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Faculty extends Model
{
    protected $fillable = ['name'];

    protected $casts = [
        'name' => 'array',
    ];

    public function departments()
    {
        return $this->hasMany(Department::class);
    }

    // Fakultet bo‘yicha barcha feedbacklarni olish
    public function feedbacks()
    {
        return $this->hasManyThrough(Feedback::class, Department::class);
    }

    public function getAverageScoreAttribute()
    {
        $scores = $this->feedbacks->map(function ($f) {
            return match ($f->grade) {
                'good' => 5,
                'average' => 3,
                'bad' => 1,
                default => null,
            };
        })->filter(); // null qiymatlarni olib tashlaymiz

        return $scores->count() ? round($scores->avg(), 2) : null;
    }

    public function managers()
    {
        return $this->morphMany(Manager::class, 'manageable');
    }

}
