<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Feedback extends Model
{
    use HasFactory;

    protected $table = 'feedbacks';
    protected $fillable = ['department_id', 'grade', 'comment'];

    public function department(): BelongsTo
    {
        return $this->belongsTo(Department::class);
    }
}

