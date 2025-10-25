<?php

namespace App\Http\Requests\Manager;

use Illuminate\Foundation\Http\FormRequest;

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
            'manageable_type' => 'required|in:App\Models\Faculty,App\Models\Department',
            'manageable_id' => 'required|integer',
        ];
    }
}
