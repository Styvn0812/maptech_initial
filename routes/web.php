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
// LOGIN
// =====================
Route::post('/login', [LoginController::class, 'login']);

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
        'email' => $request->user()->email,
        'role'  => $request->user()->role,
    ]);

})->middleware('auth');