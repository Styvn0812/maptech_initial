<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class CourseController extends Controller
{
    /**
     * Get all courses.
     */
    public function index(Request $request)
    {
        $query = Course::with('instructor:id,name,fullName,email');

        // Filter by department
        if ($request->has('department')) {
            $query->where('department', $request->department);
        }

        // Filter by status
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        // Filter by instructor
        if ($request->has('instructor_id')) {
            $query->where('instructor_id', $request->instructor_id);
        }

        $courses = $query->orderBy('created_at', 'desc')->get();

        return response()->json($courses);
    }

    /**
     * Create a new course.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'department' => 'required|string|max:255',
            'instructor_id' => 'nullable|exists:users,id',
            'status' => ['nullable', Rule::in(['Active', 'Inactive', 'Draft'])],
        ]);

        $course = Course::create([
            'title' => $validated['title'],
            'description' => $validated['description'] ?? null,
            'department' => $validated['department'],
            'instructor_id' => $validated['instructor_id'] ?? null,
            'status' => $validated['status'] ?? 'Active',
        ]);

        return response()->json([
            'message' => 'Course created successfully',
            'course' => $course->load('instructor:id,name,fullName,email')
        ], 201);
    }

    /**
     * Get a specific course.
     */
    public function show(string $id)
    {
        $course = Course::with('instructor:id,name,fullName,email')->findOrFail($id);

        return response()->json($course);
    }

    /**
     * Update a course.
     */
    public function update(Request $request, string $id)
    {
        $course = Course::findOrFail($id);

        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'department' => 'sometimes|string|max:255',
            'instructor_id' => 'nullable|exists:users,id',
            'status' => ['sometimes', Rule::in(['Active', 'Inactive', 'Draft'])],
        ]);

        $course->update($validated);

        return response()->json([
            'message' => 'Course updated successfully',
            'course' => $course->load('instructor:id,name,fullName,email')
        ]);
    }

    /**
     * Delete a course.
     */
    public function destroy(string $id)
    {
        $course = Course::findOrFail($id);
        $course->delete();

        return response()->json([
            'message' => 'Course deleted successfully'
        ]);
    }
}
