<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AuthorizeRole
{
    /**
     * Handle an incoming request.
     * Verify user has the required role(s) to access the route.
     *
     * @param  string  ...$roles  Allowed roles (Admin, Instructor, Employee)
     */
    public function handle(Request $request, Closure $next, string ...$roles): Response
    {
        $user = $request->user();

        if (!$user) {
            return response()->json([
                'message' => 'Unauthenticated'
            ], 401);
        }

        // Normalize roles to lowercase for comparison
        $allowedRoles = array_map('strtolower', $roles);
        $userRole = strtolower($user->role);

        if (!in_array($userRole, $allowedRoles)) {
            return response()->json([
                'message' => 'Forbidden. You do not have permission to access this resource.',
                'required_role' => $roles,
                'your_role' => $user->role
            ], 403);
        }

        return $next($request);
    }
}
