<?php

namespace App\Http\Controllers\Traits;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;

trait HandlesJsonResponse
{
    protected function successResponse(
        string $message,
        string $redirectRoute,
        array $data = []
    ): JsonResponse|RedirectResponse {
        if (request()->expectsJson()) {
            return response()->json([
                'success' => true,
                'message' => $message,
                ...$data
            ]);
        }

        return redirect()->route($redirectRoute)
            ->with('success', $message);
    }

    protected function errorResponse(
        string $message,
        bool $redirectBack = true,
        int $statusCode = 400
    ): JsonResponse|RedirectResponse {
        if (request()->expectsJson()) {
            return response()->json([
                'success' => false,
                'message' => $message
            ], $statusCode);
        }

        return $redirectBack
            ? redirect()->back()->with('error', $message)
            : redirect()->route('admin.dashboard')->with('error', $message);
    }
}
