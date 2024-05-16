<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class PostsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'imageUrlOne' => $this->faker->imageUrl(480, 480),
            'description' => fake()->text(50),
            'user_idUser' => '9be4d6d1-2ae3-4f12-8ef6-69b9bff4040d'
        ];
    }
}
