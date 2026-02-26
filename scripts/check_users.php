<?php
$projectRoot = dirname(__DIR__);
require $projectRoot . '/vendor/autoload.php';
$app = require $projectRoot . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\User;

$exists = User::where('email', 'admin@maptech.com')->exists();
echo $exists ? "FOUND\n" : "NOT FOUND\n";

$users = User::all(['id','name','email','password'])->toArray();
print_r($users);
