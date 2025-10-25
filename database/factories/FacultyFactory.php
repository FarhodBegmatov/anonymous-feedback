<?php

namespace Database\Factories;

use App\Models\Faculty;
use Illuminate\Database\Eloquent\Factories\Factory;

class FacultyFactory extends Factory
{
    protected $model = Faculty::class;

    public function definition(): array
    {
        return [
            'name' => [
                'en' => fake()->words(2, true),
                'uz' => fake()->words(2, true),
                'ru' => fake()->words(2, true),
            ],
        ];
    }
}
