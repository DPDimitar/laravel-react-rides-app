<?php

use App\Models\Ride;
use App\Models\User;

test('rides can be catched', function () {
    $response = $this->get('/rides');

    $response->assertStatus(200);
});

test('authenticated user can create a ride', function () {
    $user = User::factory()->create();

    \Illuminate\Support\Facades\Auth::login($user);

    $response = $this->post('/rides', [
        'from' => 'Ljubljana',
        'to' => 'Maribor',
        'date' => now()->addDay()->toDateString(),
        'time' => '10:00',
        'vehicle_type' => 'car',
        'seats' => 3,
        'price' => 20.50,
        'phone_number' => '123456789',
        'notes' => 'Test ride note',
    ]);

    $response->assertRedirect(); // because you use `return back()`
    $this->assertDatabaseHas('rides', [
        'from' => 'Ljubljana',
        'to' => 'Maribor',
        'user_id' => $user->id,
    ]);
});

test('unauthenticated user cannot create a ride', function () {
    $response = $this->post('/rides', [
        'from' => 'Koper',
        'to' => 'Celje',
        'date' => now()->addDays(2)->toDateString(),
        'time' => '09:00',
        'vehicle_type' => 'van',
        'seats' => 5,
        'price' => 30,
        'phone_number' => '987654321',
    ]);

    $response->assertRedirect('/login');
});

test('creating ride requires required fields', function () {
    $user = User::factory()->create();

    \Illuminate\Support\Facades\Auth::login($user);

    $response = $this->post('/rides', []); // empty payload

    $response->assertSessionHasErrors([
        'from', 'to', 'date', 'time', 'vehicle_type', 'seats', 'price', 'phone_number',
    ]);
});

test('authenticated user can update their ride', function () {
    $user = User::factory()->create();
    \Illuminate\Support\Facades\Auth::login($user);

    $ride = Ride::factory()->create([
        'user_id' => $user->id,
    ]);

    $response = $this->put("/rides/{$ride->id}", [
        'from' => 'Koper',
        'to' => 'Trieste',
        'date' => now()->addDays(5)->toDateString(),
        'time' => '12:30',
        'vehicle_type' => 'bus',
        'seats' => 10,
        'price' => 100,
        'phone_number' => '11223344',
        'notes' => 'Updated notes',
    ]);

    $response->assertRedirect();

    $this->assertDatabaseHas('rides', [
        'id' => $ride->id,
        'from' => 'Koper',
        'to' => 'Trieste',
    ]);
});

test('ride detail page can be visited', function () {
    $ride = Ride::factory()->create();

    $response = $this->get("/rides/{$ride->id}");

    $response->assertStatus(200);
});