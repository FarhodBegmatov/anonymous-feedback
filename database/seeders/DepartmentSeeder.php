<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Department;
use App\Models\Faculty;

class DepartmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faculties = [
            'Economy' => [
                [
                    'en' => 'Department of Accounting and Auditing',
                    'uz' => 'Buxgalteriya hisobi va audit kafedrasi',
                    'ru' => 'Кафедра бухгалтерского учета и аудита',
                ],
                [
                    'en' => 'Department of Macroeconomics',
                    'uz' => 'Makroiqtisodiyot kafedrasi',
                    'ru' => 'Кафедра макроэкономики',
                ],
                [
                    'en' => 'Department of Financial Analysis',
                    'uz' => 'Moliyaviy tahlil kafedrasi',
                    'ru' => 'Кафедра финансового анализа',
                ],
                [
                    'en' => 'Department of Management and Marketing',
                    'uz' => 'Menejment va marketing kafedrasi',
                    'ru' => 'Кафедра менеджмента и маркетинга',
                ],
                [
                    'en' => 'Department of Economic Statistics',
                    'uz' => 'Iqtisodiy statistika kafedrasi',
                    'ru' => 'Кафедра экономической статистики',
                ],
            ],
            'Transport' => [
                [
                    'en' => 'Department of Highways',
                    'uz' => 'Avtomobil yo‘llari kafedrasi',
                    'ru' => 'Кафедра автомобильных дорог',
                ],
                [
                    'en' => 'Department of Transport Logistics',
                    'uz' => 'Transport logistikasi kafedrasi',
                    'ru' => 'Кафедра транспортной логистики',
                ],
                [
                    'en' => 'Department of Automotive Engineering',
                    'uz' => 'Avtomobilsozlik kafedrasi',
                    'ru' => 'Кафедра автомобилестроения',
                ],
                [
                    'en' => 'Department of Road Construction Technologies',
                    'uz' => 'Yo‘l qurilishi texnologiyalari kafedrasi',
                    'ru' => 'Кафедра технологий дорожного строительства',
                ],
                [
                    'en' => 'Department of Traffic Safety',
                    'uz' => 'Harakat xavfsizligi kafedrasi',
                    'ru' => 'Кафедра безопасности движения',
                ],
            ],
            'Mechanics' => [
                [
                    'en' => 'Department of Mechanical Engineering',
                    'uz' => 'Mashinasozlik kafedrasi',
                    'ru' => 'Кафедра машиностроения',
                ],
                [
                    'en' => 'Department of Materials Science',
                    'uz' => 'Materialshunoslik kafedrasi',
                    'ru' => 'Кафедра материаловедения',
                ],
                [
                    'en' => 'Department of Thermal Engineering',
                    'uz' => 'Issiqlik texnikasi kafedrasi',
                    'ru' => 'Кафедра теплотехники',
                ],
                [
                    'en' => 'Department of Mechanics and Dynamics',
                    'uz' => 'Mexanika va dinamika kafedrasi',
                    'ru' => 'Кафедра механики и динамики',
                ],
                [
                    'en' => 'Department of Automated Systems',
                    'uz' => 'Avtomatlashtirilgan tizimlar kafedrasi',
                    'ru' => 'Кафедра автоматизированных систем',
                ],
            ],
        ];

        foreach ($faculties as $facultyName => $departments) {
            $faculty = Faculty::where('name->en', $facultyName)->first();

            if ($faculty) {
                foreach ($departments as $dept) {
                    Department::create([
                        'faculty_id' => $faculty->id,
                        'name' => $dept,
                    ]);
                }
            } else {
                $this->command->warn("⚠️ Faculty '{$facultyName}' not found. Please create it first.");
            }
        }
    }
}
