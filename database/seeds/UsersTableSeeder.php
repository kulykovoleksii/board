<?php

use App\Entity\User;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    public function run(): void
    {
        $user = [
            'id' => 1,
            'name' => 'admin',
            'email' => 'admin@admin.com',
            'password' => '$2y$10$TKh8H1.PfQx37YgCzwiKb.KjNyWgaHb9cbcoQgdIVFlYg7B77UdFm', // secret
            'remember_token' => str_random(10),
            'verify_token' => null,
            'role' => User::ROLE_ADMIN,
            'status' => User::STATUS_ACTIVE,
        ];
        User::create($user);

        factory(User::class, 10)->create();
    }
}