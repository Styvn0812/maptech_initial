<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class GoogleAuthController extends Controller
{
    public function redirect(Request $request)
    {
        if (! $request->user()) {
            return response()->json([
                'message' => 'Unauthenticated',
            ], 401);
        }

        $request->session()->put('google_verify_user_id', $request->user()->id);

        return Socialite::driver('google')->redirect();
    }

    public function callback(Request $request)
    {
        $targetUserId = $request->session()->pull('google_verify_user_id');

        if (! $targetUserId) {
            return response()->json([
                'message' => 'Verification session expired. Please login and try again.',
            ], 422);
        }

        $googleUser = Socialite::driver('google')->user();
        $user = User::find($targetUserId);

        if (! $user) {
            return response()->json([
                'message' => 'User not found.',
            ], 404);
        }

        if (strtolower($googleUser->getEmail()) !== strtolower($user->email)) {
            return response()->json([
                'message' => 'Google account email does not match your account email.',
            ], 422);
        }

        $user->update([
            'google_id' => $googleUser->getId(),
            'is_google_verified' => true,
            'status' => 'active',
            'email_verified_at' => now(),
        ]);

        Auth::login($user);
        $request->session()->regenerate();

        return response()->json([
            'message' => 'Google verification successful.',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'username' => $user->username,
                'email' => $user->email,
                'role' => $user->role,
                'status' => $user->status,
                'is_google_verified' => $user->is_google_verified,
            ],
        ]);
    }
}
