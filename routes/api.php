<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Department;
use App\Models\Subdepartment;

/*
|--------------------------------------------------------------------------
| DEPARTMENT ROUTES
|--------------------------------------------------------------------------
*/

// GET ALL DEPARTMENTS (with subdepartments)
Route::get('/departments', function () {
    return Department::with('subdepartments')->get();
});

// CREATE DEPARTMENT
Route::post('/departments', function (Request $request) {

    $request->validate([
        'name' => 'required|string|max:255',
        'code' => 'required|string|max:50|unique:departments,code',
    ]);

    return Department::create([
        'name' => $request->name,
        'code' => $request->code,
        'head' => $request->head,
        'status' => $request->status ?? 'Active',
        'description' => $request->description,
        'employee_count' => 0,
        'course_count' => 0,
    ]);
});

// UPDATE DEPARTMENT
Route::put('/departments/{id}', function (Request $request, $id) {

    $department = Department::findOrFail($id);

    $department->update([
        'name' => $request->name,
        'code' => $request->code,
        'head' => $request->head,
        'status' => $request->status,
        'description' => $request->description,
    ]);

    return $department;
});

// DELETE DEPARTMENT
Route::delete('/departments/{id}', function ($id) {

    Department::findOrFail($id)->delete();

    return response()->json([
        'message' => 'Department deleted successfully'
    ]);
});


/*
|--------------------------------------------------------------------------
| SUBDEPARTMENT ROUTES
|--------------------------------------------------------------------------
*/

// CREATE SUBDEPARTMENT
Route::post('/departments/{id}/subdepartments', function (Request $request, $id) {

    $request->validate([
        'name' => 'required|string|max:255'
    ]);

    return Subdepartment::create([
        'department_id' => $id,
        'name' => $request->name,
        'description' => $request->description
    ]);
});

// UPDATE SUBDEPARTMENT
Route::put('/subdepartments/{id}', function (Request $request, $id) {

    $subdepartment = Subdepartment::findOrFail($id);

    $request->validate([
        'name' => 'required|string|max:255'
    ]);

    $subdepartment->update([
        'name' => $request->name,
    ]);

    return $subdepartment;
});

// DELETE SUBDEPARTMENT
Route::delete('/subdepartments/{id}', function ($id) {

    Subdepartment::findOrFail($id)->delete();

    return response()->json([
        'message' => 'Subdepartment deleted successfully'
    ]);
});
