# Laravel Testing Script
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Running Laravel Tests" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Run all tests
Write-Host "Running all tests..." -ForegroundColor Yellow
php artisan test

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Test Summary" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# Run specific test suites
Write-Host ""
Write-Host "Running Feature Tests..." -ForegroundColor Yellow
php artisan test --testsuite=Feature

Write-Host ""
Write-Host "Running Unit Tests..." -ForegroundColor Yellow
php artisan test --testsuite=Unit

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "Tests Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
