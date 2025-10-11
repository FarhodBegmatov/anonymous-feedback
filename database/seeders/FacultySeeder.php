<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Faculty;

class FacultySeeder extends Seeder
{
    public function run(): void
    {
        $faculties = [
            ['en' => 'Engineering', 'uz' => 'Muhandislik', 'ru' => 'Инженерия'],
            ['en' => 'Business', 'uz' => 'Biznes', 'ru' => 'Бизнес'],
            ['en' => 'Textile', 'uz' => 'To‘qimachilik', 'ru' => 'Текстиль'],
        ];

        foreach ($faculties as $f) {
            Faculty::create([
                'name' => $f,
            ]);
        }
    }
}
