<?php

namespace Database\Factories;

use App\Entity\Adverts\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

class AdvertsCategoryFactory extends Factory
{
    protected $model = Category::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->unique()->name,
            'slug' => $this->faker->unique()->slug(2),
            'parent_id' => null,
        ];
    }
}
