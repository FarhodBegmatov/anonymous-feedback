<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @method static create(array $array)
 */
class Department extends Model
{
    protected $fillable = ['name', 'faculty_id'];

    protected $casts = [
        'name' => 'array',
    ];

    public function faculty()
    {
        return $this->belongsTo(Faculty::class);
    }

    public function feedbacks()
    {
        return $this->hasMany(Feedback::class);
    }

    public function managers()
    {
        return $this->morphMany(Manager::class, 'manageable');
    }
}
