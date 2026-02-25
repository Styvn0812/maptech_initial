<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    protected $fillable = [
        'name',
        'code',
        'head',
        'status',
        'description',
        'employee_count',
        'course_count'
    ];

    public function subdepartments()
    {
        return $this->hasMany(Subdepartment::class);
    }
}