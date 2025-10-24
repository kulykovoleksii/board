<?php

namespace Database\Factories;

use App\Entity\Region;
use Illuminate\Database\Eloquent\Factories\Factory;

class RegionFactory extends Factory
{
    protected $model = Region::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->unique()->city,
            'slug' => $this->faker->unique()->slug(2),
            'parent_id' => null,
        ];
    }
}
