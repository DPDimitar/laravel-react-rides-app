<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Ride>
 */
class RideFactory extends Factory
{
    private array $slovenianCities = [
        'Ljubljana', 'Maribor', 'Celje', 'Kranj', 'Velenje',
        'Koper', 'Novo Mesto', 'Ptuj', 'Trbovlje', 'Nova Gorica',
        'Murska Sobota', 'Jesenice', 'Domžale', 'Škofja Loka', 'Izola'
    ];

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'from' => $this->faker->randomElement($this->slovenianCities),
            'to' => $this->faker->randomElement($this->slovenianCities),
            'date' => $this->faker->dateTimeBetween('+10 days', '+20 days')->format('Y-m-d'),
            'time' => $this->faker->time('H:i'),
            'vehicle_type' => $this->faker->randomElement(['car', 'van', 'bus']),
            'seats' => $this->faker->numberBetween(1, 6),
            'price' => $this->faker->randomFloat(2, 5, 50),
            'phone_number' => $this->faker->phoneNumber,
            'notes' => $this->faker->boolean(70) ? $this->faker->sentence(10) : null, // 70% chance of having notes
        ];
    }
}
