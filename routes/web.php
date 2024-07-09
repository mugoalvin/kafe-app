<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\FoodController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TestController;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use function Termwind\render;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/', [AuthenticatedSessionController::class, 'create']);


Route::get('/landingPage', function () {
    return Inertia::render('LandingPage');
})->middleware(['auth', 'verified'])->name('landingPage');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';


// My Additional Routes
Route::get('/dashboard', function () {
    return Inertia::render('myDashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/reservations', function () {
    return Inertia::render('Reservations');
})->middleware(['auth', 'verified'])->name('reservations');

Route::get('/menu', function () {
    return Inertia::render('Menu');
})->middleware(['auth', 'verified'])->name('menu');

Route::get('/delivery', function () {
    return Inertia::render('Delivery');
})->middleware(['auth', 'verified'])->name('delivery');

Route::get('/accounting', function () {
    return Inertia::render('Accounting');
})->middleware(['auth', 'verified'])->name('accounting');

Route::get('/history', function () {
    return Inertia::render('History');
})->middleware(['auth', 'verified'])->name('history');

Route::get('/addFood', function () {
    return Inertia::render('AddFood');
})->middleware(['auth', 'verified'])->name('addFood');

// Foods
Route::get('/getFoods', [FoodController::class, 'index']);
Route::post('/addFood', [FoodController::class, 'store']);
Route::post('editFood', [FoodController::class, 'update']);
Route::post('/deleteFood', [FoodController::class, 'destroy']);

// Orders
Route::post('/saveOrder', [OrderController::class, 'store']);
Route::get('/getOrderHistory', [OrderController::class, 'index']);
Route::post('/selectOrderHistory', [OrderController::class, 'selectWhere']);
Route::delete('/deleteOrder', [OrderController::class, 'destroy']);

// Categories
Route::get('/getCategories', [CategoriesController::class, 'index']);
Route::post('addCategory', [CategoriesController::class, 'store']);