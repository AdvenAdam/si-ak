<?php

use App\Http\Controllers\KelasMapelController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::prefix('dashboard')->middleware(['auth', 'verified'])->group(function () {
    Route::get('/', function () {
        return Inertia::render('Dashboard/Home');
    })->name('dashboard');

    Route::group(['prefix' => 'user'], function () {
        Route::get('/', [UserController::class, 'index'])->name('user.index');
        Route::get('/new', [UserController::class, 'create'])->name('user.new');
        Route::post('/new', [UserController::class, 'store'])->name('user.store');
        Route::delete('/{user}', [UserController::class, 'destroy'])->name('user.destroy');
        Route::get('/update/{user}', [UserController::class, 'update'])->name('user.update');
    });

    Route::group(['prefix' => 'Kelas&Mapel'], function () {
        Route::get('/', [KelasMapelController::class, 'index'])->name('Kelas&Mapel.index');
        Route::post('/new', [KelasMapelController::class, 'store'])->name('Kelas&Mapel.new');
        Route::delete('/mapel/{mapel}', [KelasMapelController::class, 'destroyMapel'])->name('mapel.destroy');
        Route::delete('/kelas/{kelas}', [KelasMapelController::class, 'destroyKelas'])->name('kelas.destroy');
    });
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
