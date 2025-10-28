<?php

namespace App\Http\Requests\Manager;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateManagerRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $managerId = $this->route('manager')->id;

        return [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $managerId,
            'password' => 'nullable|string|min:6',
            'manageable_type' => ['required', Rule::in(['faculty', 'department', Faculty::class, Department::class])],
            'manageable_id' => 'required|integer',
        ];
    }
}
