<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'title_normalized',
        'description',
        'department',
        'subdepartment',
        'status',
        'created_by',
    ];
}
