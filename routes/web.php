<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\Admin\UserManagementController;
use App\Http\Controllers\Auth\GoogleAuthController;
use App\Http\Controllers\CourseController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    return view('welcome');
});

// =====================
// LOGIN
// =====================
Route::post('/login', [LoginController::class, 'login']);

Route::get('/admin/users', [UserManagementController::class, 'index'])
    ->middleware(['auth', 'role:admin']);

Route::post('/admin/users', [UserManagementController::class, 'store'])
    ->middleware(['auth', 'role:admin']);

Route::get('/courses', [CourseController::class, 'index'])
    ->middleware(['auth', 'role:admin,instructor']);

Route::post('/courses', [CourseController::class, 'store'])
    ->middleware(['auth', 'role:admin,instructor']);

Route::get('/auth/google/redirect', [GoogleAuthController::class, 'redirect'])
    ->middleware('auth');

Route::get('/auth/google/callback', [GoogleAuthController::class, 'callback']);

// =====================
// LOGOUT
// =====================
Route::post('/logout', function (Request $request) {

    Auth::logout();

    $request->session()->invalidate();
    $request->session()->regenerateToken();

    return response()->json([
        'message' => 'Logged out successfully'
    ]);

})->middleware('auth');

// =====================
// GET AUTH USER
// =====================
Route::get('/user', function (Request $request) {

    if (!$request->user()) {
        return response()->json([
            'message' => 'Unauthenticated'
        ], 401);
    }

    return response()->json([
        'id'    => $request->user()->id,
        'name'  => $request->user()->name,
        'username' => $request->user()->username,
        'email' => $request->user()->email,
        'role'  => $request->user()->role,
        'status' => $request->user()->status,
        'is_google_verified' => $request->user()->is_google_verified,
    ]);

})->middleware('auth');
