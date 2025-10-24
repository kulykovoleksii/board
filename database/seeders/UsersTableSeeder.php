<?php

namespace Database\Seeders;

use App\Entity\User\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    public function run(): void
    {
        // Create Admin
        User::factory()->create([
            'name' => 'Admin',
            'last_name' => 'User',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
            'role' => User::ROLE_ADMIN,
            'status' => User::STATUS_ACTIVE,
            'verify_token' => null,
            'phone_verified' => true,
            'phone_verify_token' => null,
            'phone_verify_token_expire' => null,
        ]);

        // Create Moderator
        User::factory()->create([
            'name' => 'Moderator',
            'last_name' => 'User',
            'email' => 'moderator@example.com',
            'password' => Hash::make('password'),
            'role' => User::ROLE_MODERATOR,
            'status' => User::STATUS_ACTIVE,
            'verify_token' => null,
            'phone_verified' => true,
            'phone_verify_token' => null,
            'phone_verify_token_expire' => null,
        ]);

        // Create Regular User
        User::factory()->create([
            'name' => 'John',
            'last_name' => 'Doe',
            'email' => 'user@example.com',
            'password' => Hash::make('password'),
            'role' => User::ROLE_USER,
            'status' => User::STATUS_ACTIVE,
            'verify_token' => null,
            'phone_verified' => true,
            'phone_verify_token' => null,
            'phone_verify_token_expire' => null,
        ]);

        // Create 10 random users
        User::factory()->count(10)->create();
    }
}
