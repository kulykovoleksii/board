<?php

namespace Database\Factories;

use App\Entity\User\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class UserFactory extends Factory
{
    protected $model = User::class;

    public function definition(): array
    {
        $active = $this->faker->boolean;
        $phoneActive = $this->faker->boolean;

        return [
            'name' => $this->faker->name,
            'last_name' => $this->faker->lastName,
            'email' => $this->faker->unique()->safeEmail,
            'phone' => $this->faker->unique()->phoneNumber,
            'phone_verified' => $phoneActive,
            'password' => '$2y$10$TKh8H1.PfQx37YgCzwiKb.KjNyWgaHb9cbcoQgdIVFlYg7B77UdFm', // secret
            'remember_token' => Str::random(10),
            'verify_token' => $active ? null : Str::uuid(),
            'phone_verify_token' => $phoneActive ? null : Str::uuid(),
            'phone_verify_token_expire' => $phoneActive ? null : Carbon::now()->addSeconds(300),
            'role' => $active ? $this->faker->randomElement([User::ROLE_USER, User::ROLE_ADMIN]) : User::ROLE_USER,
            'status' => $active ? User::STATUS_ACTIVE : User::STATUS_WAIT,
        ];
    }
}
