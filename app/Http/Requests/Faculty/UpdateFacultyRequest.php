<?php

namespace App\Http\Requests\Faculty;

use Illuminate\Foundation\Http\FormRequest;

class UpdateFacultyRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->can('isAdmin');
    }

    public function rules(): array
    {
        return [
            'name' => 'required|array',
            'name.en' => 'required|string|max:255',
            'name.uz' => 'required|string|max:255',
            'name.ru' => 'required|string|max:255',
        ];
    }

    public function messages(): array
    {
        return [
            'name.en.required' => 'English name is required',
            'name.uz.required' => 'Uzbek name is required',
            'name.ru.required' => 'Russian name is required',
        ];
    }
}
