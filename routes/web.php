<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RideController;
use Inertia\Inertia;

Route::post('/language', function (Request $request) {
    $locale = $request->get('locale');
    if (in_array($locale, config('app.available_locales', ['en', 'sl']))) {
        session()->put('locale', $locale);
        app()->setLocale($locale);
    }
    return response()->noContent();
});

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $cities = config('cities');
        $userId = auth()->id();
        $mostFrequentRoute = \App\Models\Ride::select('from', 'to', DB::raw('COUNT(*) as total'))
            ->where('user_id', $userId)
            ->groupBy('from', 'to')
            ->orderByDesc('total')
            ->first();
        return Inertia::render('dashboard', [
            'cities' => $cities,
            'mostFrequentRoute' => $mostFrequentRoute,
            'rideCount' => \App\Models\Ride::where('user_id', auth()->id())->count(),
            'upcomingRideCount' => \App\Models\Ride::where('user_id', auth()->id())
                ->where('date', '>=', now()->toDateString())
                ->count(),
            'rides' => \App\Models\Ride::where('user_id', $userId)
                ->orderByDesc('date')
                ->take(10) // you can paginate or limit as needed
                ->get(),
        ]);
    })->name('dashboard');
    Route::get('/rides/create', [RideController::class, 'create'])->name('rides.create');
    Route::post('/rides', [RideController::class, 'store'])->name('rides.store');
    Route::put('/rides/{ride}', [RideController::class, 'update'])->name('rides.update');
});

Route::get('/rides', [RideController::class, 'index'])->name('rides.index');
Route::get('/rides/{ride}', [RideController::class, 'show'])->name('rides.show');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
