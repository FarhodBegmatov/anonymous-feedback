<?php

namespace App\Http\Controllers;

use App\Http\Requests\Feedback\StoreFeedbackRequest;
use App\Services\FeedbackService;
use Illuminate\Http\RedirectResponse;

class FeedbackController extends Controller
{
    public function __construct(
        private readonly FeedbackService $feedbackService
    ) {}

    /**
     * Store anonymous feedback
     */
    public function store(StoreFeedbackRequest $request): RedirectResponse
    {
        try {
            $this->feedbackService->createFeedback($request->validated());

            return back()->with('success', 'Feedback submitted successfully!');
        } catch (\Exception $e) {
            return back()->with('error', 'Error submitting feedback: ' . $e->getMessage());
        }
    }
}
