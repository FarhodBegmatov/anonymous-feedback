<?php

namespace App\Http\Requests\Manager;

use Illuminate\Foundation\Http\FormRequest;

class StoreManagerRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
            'manageable_type' => 'required|in:faculty,department',
            'manageable_id' => [
                'required',
                'integer',
                function ($attribute, $value, $fail) {
                    $type = $this->input('manageable_type');
                    $table = $type === 'faculty' ? 'faculties' : 'departments';

                    if (!\DB::table($table)->where('id', $value)->exists()) {
                        $fail("The selected {$type} does not exist.");
                    }
                },
            ],
        ];
    }
}
