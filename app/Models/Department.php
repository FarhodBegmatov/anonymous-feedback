<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int $faculty_id
 * @property array $name
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property-read Faculty $faculty
 * @property-read Collection<int, Feedback> $feedbacks
 * @method create(array $data)
 * @method where(string $string, int $facultyId)
 */
class Department extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'faculty_id'];

    protected $casts = [
        'name' => 'array',
    ];

    public function faculty(): BelongsTo
    {
        return $this->belongsTo(Faculty::class);
    }

    public function feedbacks(): HasMany
    {
        return $this->hasMany(Feedback::class);
    }
}
