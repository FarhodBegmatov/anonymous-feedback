<?php

// database/seeders/DepartmentSeeder.php
// database/seeders/DepartmentSeeder.php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Faculty;
use App\Models\Department;

class DepartmentSeeder extends Seeder
{
    public function run(): void
    {
        $departments = [
            1 => [ // Faculties ID = 1 (Engineering)
                ['en' => 'Computer Science', 'uz' => 'Kompyuter fanlari', 'ru' => 'Компьютерные науки'],
                ['en' => 'Mechanical', 'uz' => 'Mexanika', 'ru' => 'Механика'],
            ],
            2 => [ // Faculties ID = 2 (Business)
                ['en' => 'Finance', 'uz' => 'Moliyaviy ishlar', 'ru' => 'Финансы'],
                ['en' => 'Marketing', 'uz' => 'Marketing', 'ru' => 'Маркетинг'],
            ],
            3 => [ // Faculties ID = 3 (Textile)
                ['en' => 'Textile Design', 'uz' => 'To‘qimachilik dizayni', 'ru' => 'Дизайн текстиля'],
            ],
        ];

        foreach ($departments as $facultyId => $depts) {
            foreach ($depts as $dept) {
                Department::create([
                    'faculty_id' => $facultyId,
                    'name' => $dept,
                ]);
            }
        }
    }
}
