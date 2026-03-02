<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Department;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    public function index()
    {
        return response()->json(
            Course::query()
                ->select(['id', 'title', 'description', 'department', 'subdepartment', 'status', 'created_by', 'created_at'])
                ->orderBy('title')
                ->get()
        );
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'department' => ['nullable', 'string', 'max:255'],
            'subdepartment' => ['nullable', 'string', 'max:255'],
            'status' => ['nullable', 'in:active,draft,archived'],
        ]);

        if (! empty($data['department']) && ! empty($data['subdepartment'])) {
            $isValidSubdepartment = Department::query()
                ->where('name', $data['department'])
                ->whereHas('subdepartments', function ($query) use ($data) {
                    $query->where('name', $data['subdepartment']);
                })
                ->exists();

            if (! $isValidSubdepartment) {
                return response()->json([
                    'message' => 'Selected sub department does not belong to the selected department.',
                ], 422);
            }
        }

        $titleNormalized = $this->normalizeTitle($data['title']);

        if (Course::where('title_normalized', $titleNormalized)->exists()) {
            return response()->json([
                'message' => 'Course title already exists. Please use a different title.',
            ], 422);
        }

        $course = Course::create([
            'title' => $data['title'],
            'title_normalized' => $titleNormalized,
            'description' => $data['description'] ?? null,
            'department' => $data['department'] ?? null,
            'subdepartment' => $data['subdepartment'] ?? null,
            'status' => $data['status'] ?? 'draft',
            'created_by' => $request->user()->id,
        ]);

        return response()->json([
            'message' => 'Course created successfully.',
            'course' => $course,
        ], 201);
    }

    private function normalizeTitle(string $title): string
    {
        $collapsedWhitespace = preg_replace('/\s+/', ' ', trim($title));

        return strtolower($collapsedWhitespace ?? $title);
    }
}
