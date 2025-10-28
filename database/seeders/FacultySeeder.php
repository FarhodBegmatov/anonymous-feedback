<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Faculty;

class FacultySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faculties = [
            [
                'name' => [
                    'en' => 'Economy',
                    'uz' => 'Iqtisodiyot',
                    'ru' => 'Экономика',
                ],
            ],
            [
                'name' => [
                    'en' => 'Transport',
                    'uz' => 'Transport',
                    'ru' => 'Транспорт',
                ],
            ],
            [
                'name' => [
                    'en' => 'Mechanics',
                    'uz' => 'Mexanika',
                    'ru' => 'Механика',
                ],
            ],
        ];

        foreach ($faculties as $faculty) {
            Faculty::firstOrCreate(
                ['name->en' => $faculty['name']['en']], // unique by English name
                ['name' => $faculty['name']]
            );
        }

        $this->command->info('✅ FacultySeeder successfully executed!');
    }
}
