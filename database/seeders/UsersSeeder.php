<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [
            [
                'name' => 'Admin User',
                'email' => 'admin@example.com',
                'password' => 'AdminPass123!',
                'role' => 'admin',
            ],
            [
                'name' => 'Employee User',
                'email' => 'employee@example.com',
                'password' => 'EmployeePass123!',
                'role' => 'employee',
            ],
            [
                'name' => 'Instructor User',
                'email' => 'instructor@example.com',
                'password' => 'InstructorPass123!',
                'role' => 'instructor',
            ],
        ];

        foreach ($users as $u) {
            User::updateOrCreate(
                ['email' => $u['email']],
                $u
            );
        }
    }
}
