<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FlipbookController;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

Route::get('flipbooks', [FlipbookController::class, 'index'])->name('flipbooks.index');
Route::get('flipbooks/create', [FlipbookController::class, 'create'])->name('flipbooks.create');
Route::post('flipbooks', [FlipbookController::class, 'store'])->name('flipbooks.store');
Route::get('flipbooks/{flipbook}', [FlipbookController::class, 'show'])->name('flipbooks.show');
require __DIR__.'/settings.php';
