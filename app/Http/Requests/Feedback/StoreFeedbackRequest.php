<?php

namespace App\Http\Requests\Feedback;

use Illuminate\Foundation\Http\FormRequest;

class StoreFeedbackRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'department_id' => 'required|exists:departments,id',
            'grade' => 'required|in:good,average,bad',
            'comment' => 'nullable|string|max:1000',
        ];
    }

    public function messages(): array
    {
        return [
            'department_id.required' => 'Please select a department.',
            'department_id.exists' => 'The selected department does not exist.',
            'grade.required' => 'Please select a rating.',
            'grade.in' => 'Invalid rating selected.',
            'comment.max' => 'Comment cannot exceed 1000 characters.',
        ];
    }
}
