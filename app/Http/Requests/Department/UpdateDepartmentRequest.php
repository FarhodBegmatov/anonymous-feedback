<?php

namespace App\Http\Requests\Department;

use Illuminate\Foundation\Http\FormRequest;

class UpdateDepartmentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'faculty_id' => 'required|exists:faculties,id',
            'name.en' => 'required|string|max:255',
            'name.uz' => 'required|string|max:255',
            'name.ru' => 'required|string|max:255',
        ];
    }
}
