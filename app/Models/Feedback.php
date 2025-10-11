<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Feedback extends Model
{
    protected $table = 'feedbacks';
    protected $fillable = ['department_id', 'grade', 'comment'];

    public function department()
    {
        return $this->belongsTo(Department::class);
    }
}

