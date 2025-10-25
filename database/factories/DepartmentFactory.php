<?php

namespace Database\Factories;

use App\Models\Department;
use App\Models\Faculty;
use Illuminate\Database\Eloquent\Factories\Factory;

class DepartmentFactory extends Factory
{
    protected $model = Department::class;

    public function definition(): array
    {
        return [
            'faculty_id' => Faculty::factory(),
            'name' => [
                'en' => fake()->words(2, true),
                'uz' => fake()->words(2, true),
                'ru' => fake()->words(2, true),
            ],
        ];
    }
}
