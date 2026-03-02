<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('username')->nullable()->unique()->after('name');
            $table->string('status')->default('pending')->after('role');
            $table->boolean('is_google_verified')->default(false)->after('status');
            $table->string('google_id')->nullable()->unique()->after('is_google_verified');
            $table->foreignId('invited_by')->nullable()->constrained('users')->nullOnDelete()->after('google_id');
        });

        DB::table('users')->select('id', 'email')->orderBy('id')->each(function ($user) {
            $base = strtolower(str_replace(['@', '.'], '_', explode('@', $user->email)[0]));
            $username = $base.'_'.$user->id;

            DB::table('users')
                ->where('id', $user->id)
                ->update(['username' => $username]);
        });

        DB::statement('ALTER TABLE users ALTER COLUMN username SET NOT NULL');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropConstrainedForeignId('invited_by');
            $table->dropColumn(['google_id', 'is_google_verified', 'status', 'username']);
        });
    }
};

