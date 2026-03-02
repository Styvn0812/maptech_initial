<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (Auth::attempt($credentials)) {
            $user = Auth::user();

            if ($user->status !== 'active') {
                Auth::logout();

                return response()->json([
                    'message' => 'Account is inactive. Contact an administrator.',
                ], 403);
            }

            $request->session()->regenerate();

            return response()->json([
                'id' => $user->id,
                'name' => $user->name,
                'username' => $user->username,
                'email' => $user->email,
                'role' => $user->role,
                'status' => $user->status,
                'is_google_verified' => $user->is_google_verified,
            ]);
        }

        return response()->json(['message' => 'Invalid credentials'], 401);
    }
}
