<?php

use App\Http\Controllers\Admin\DepartmentController;
use App\Http\Controllers\Admin\FacultyController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\FeedbackController;
use App\Http\Controllers\MainController;
use App\Http\Controllers\RatingController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Authentication
|--------------------------------------------------------------------------
*/

Route::get('/login', [AuthenticatedSessionController::class, 'create'])
    ->name('login.form');
Route::post('/login', [AuthenticatedSessionController::class, 'store'])
    ->name('login');
Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
    ->name('logout');

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

Route::get('/', [MainController::class, 'index'])->name('home');
Route::get('/ratings', [RatingController::class, 'index'])->name('ratings.index');

// Fakultet sahifasi
Route::get('/faculty/{faculty}', [MainController::class, 'faculty'])->name('faculty.show');

// Feedback form sahifasi
Route::get('/feedback/{department}', [MainController::class, 'feedbackForm'])->name('feedback.form');

// Feedback saqlash
Route::post('/feedback', [FeedbackController::class, 'store'])
    ->name('feedback.store');

/*
|--------------------------------------------------------------------------
| Admin Routes (Inertia)
|--------------------------------------------------------------------------
*/

Route::middleware(['auth'])->prefix('admin')->group(function () {
    Route::resource('faculties', FacultyController::class)->except(['show']);
    Route::resource('departments', DepartmentController::class)->except(['show']);
});

