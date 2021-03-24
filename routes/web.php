<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PrintLogs;
use App\Http\Controllers\PrintVehicles;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('app');
});

Route::post('/print/logs', PrintLogs::class);
Route::post('/print/report/logs', PrintLogs::class);
Route::post('/print/report/vehicles', PrintVehicles::class);