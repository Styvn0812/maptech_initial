<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\LoginController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    return view('welcome');
});

// =====================
// LOGIN (Session-based for SPA)
// =====================
Route::post('/login', [LoginController::class, 'login']);

// =====================
// LOGOUT
// =====================
Route::post('/logout', [LoginController::class, 'logout'])->middleware('auth');

// =====================
// GET AUTH USER
// =====================
Route::get('/user', [LoginController::class, 'user'])->middleware('auth');
