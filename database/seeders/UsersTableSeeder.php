<?php

namespace Database\Seeders;

use App\Entity\User\User;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    public function run(): void
    {
        User::factory()->count(10)->create();
    }
}
