<?php

namespace App\Models;

use Closure as ClosureAlias;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property array $name
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property-read Collection<int, Department> $departments
 * @property-read Collection<int, Feedback> $feedbacks
 * @method where(ClosureAlias $param)
 * @method create(array $data)
 * @method find(int $id)
 */
class Faculty extends Model
{
    use HasFactory;

    protected $fillable = ['name'];

    protected $casts = [
        'name' => 'array',
    ];

    public function departments(): HasMany
    {
        return $this->hasMany(Department::class);
    }

    public function feedbacks(): HasManyThrough
    {
        return $this->hasManyThrough(Feedback::class, Department::class);
    }
}
