<?php

namespace App\Http\Controllers;

use App\Models\Ride;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RideController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $rides = Ride::get();

        $cities = Ride::select('from')->distinct()->pluck('from')->merge(
            Ride::select('to')->distinct()->pluck('to')
        )->unique()->sort()->values();

        return Inertia::render('Ride/Index', [
            'rides' => $rides,
            'cities' => $cities,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Rides/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'from' => 'required|string|max:255',
            'to' => 'required|string|max:255',
            'date' => 'required|date',
            'time' => 'required',
            'vehicle_type' => 'required|in:car,van,bus',
            'seats' => 'required|integer|min:1',
            'price' => 'required|numeric|min:0',
            'phone_number' => 'required|string|max:30',
            'notes' => 'nullable|string|max:1000',
        ]);

        Ride::create([
            ...$validated,
            'user_id' => auth()->id(),
        ]);

        return back();
    }

    /**
     * Display the specified resource.
     */
    public function show(Ride $ride)
    {
        $ride->load('user');

        return Inertia::render('Ride/Show', [
            'ride' => $ride
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Ride $ride)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Ride $ride)
    {
        $validated = $request->validate([
            'from' => 'required|string|max:255',
            'to' => 'required|string|max:255',
            'date' => 'required|date',
            'time' => 'required',
            'vehicle_type' => 'required|in:car,van,bus',
            'seats' => 'required|integer|min:1',
            'price' => 'required|numeric|min:0',
            'phone_number' => 'required|string|max:30',
            'notes' => 'nullable|string|max:1000',
        ]);

        $ride->update($validated);

        return back();
//        return redirect()->route('rides.index')->with('success', __('Ride updated successfully.'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Ride $ride)
    {
        //
    }
}
