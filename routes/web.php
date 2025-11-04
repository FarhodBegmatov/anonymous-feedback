<?php


use App\Http\Controllers\Admin\FacultyController;
use App\Http\Controllers\Admin\DepartmentController;
use App\Http\Controllers\Admin\ManagerController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Manager\DashboardController;
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

// Faculty page
Route::get('/faculty/{faculty}', [MainController::class, 'faculty'])->name('faculty.show');

// Feedback form page
Route::get('/feedback/{department}', [MainController::class, 'feedbackForm'])->name('feedback.form');

// Save feedback
Route::post('/feedback', [FeedbackController::class, 'store'])
    ->name('feedback.store');

// Search routes
Route::get('/search', [MainController::class, 'search'])->name('search');
Route::get('/api/suggestions', [MainController::class, 'suggestions'])->name('suggestions');

/*
|--------------------------------------------------------------------------
| Manager Dashboard
|--------------------------------------------------------------------------
*/
Route::middleware(['web', 'auth', 'can:isManager'])->group(function () {
    Route::get('/manager/dashboard', [DashboardController::class, 'index'])
        ->name('manager.dashboard');
});

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/
Route::middleware(['web', 'auth', 'can:isAdmin'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {
        Route::resource('faculties', FacultyController::class)->except('show');
        Route::resource('departments', DepartmentController::class)->except('show');
        Route::resource('managers', ManagerController::class)->except('show');
    });
