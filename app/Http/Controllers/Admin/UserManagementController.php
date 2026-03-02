<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class UserManagementController extends Controller
{
    public function index()
    {
        $users = User::query()
            ->select(['id', 'name', 'username', 'email', 'role', 'status', 'is_google_verified', 'created_at'])
            ->orderByDesc('id')
            ->get();

        return response()->json($users);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8'],
            'role' => ['required', 'in:admin,instructor,employee'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $data['username'] = $this->generateUsernameFromEmail($data['email']);
        $data['status'] = ($data['is_active'] ?? true) ? 'active' : 'inactive';
        $data['is_google_verified'] = true;
        $data['invited_by'] = $request->user()?->id;

        unset($data['is_active']);

        $user = User::create($data);

        return response()->json([
            'message' => 'User created successfully.',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'username' => $user->username,
                'email' => $user->email,
                'role' => $user->role,
                'status' => $user->status,
                'is_google_verified' => $user->is_google_verified,
            ],
        ], 201);
    }

    private function generateUsernameFromEmail(string $email): string
    {
        $base = Str::of(strtolower($email))
            ->before('@')
            ->replaceMatches('/[^a-z0-9_]/', '_')
            ->trim('_')
            ->value();

        $candidate = $base !== '' ? $base : 'user';
        $suffix = 1;

        while (User::where('username', $candidate)->exists()) {
            $candidate = $base.'_'.$suffix;
            $suffix++;
        }

        return $candidate;
    }
}
