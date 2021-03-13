<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\LoginController;
use App\Http\Controllers\Api\VehicleController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\BrandController;
use App\Http\Controllers\Api\VehicleTypeController;
use App\Http\Controllers\Api\VehicleLogController;
use App\Http\Controllers\Api\ChangePassword;
use App\Http\Controllers\Api\UserSelections;
use App\Http\Controllers\Api\VehicleSelections;
use App\Http\Controllers\Api\DashboardController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/**
 * Authentication
 */
Route::post('login', [LoginController::class, 'login']);
Route::post('logout', [LoginController::class, 'logout']);
Route::post('authenticate', [LoginController::class, 'authenticate']);

/**
 * Dashboard
 */
Route::get('dashboard/data', [DashboardController::class, 'getData']);

/**
 * Vehicles
 */
Route::apiResources([
    'vehicles' => VehicleController::class,
],[
    'only' => ['index']
]);
Route::apiResources([
    'vehicle' => VehicleController::class,
],[
    'except' => ['index']
]);

Route::get('vehicle/scan/{rfid}', [VehicleController::class, 'rfid']);

/**
 * Vehicles
 */
Route::apiResources([
    'logs' => VehicleLogController::class,
],[
    'only' => ['index']
]);
Route::apiResources([
    'log' => VehicleLogController::class,
],[
    'except' => ['index']
]);

/**
 * Maintenance
 */
Route::prefix('maintenance')->group(function() {

    // Users
    Route::apiResources([
        'users' => UserController::class,
    ],[
        'only' => ['index']
    ]);
    Route::apiResources([
        'user' => UserController::class,
    ],[
        'except' => ['index']
    ]);    

    // Brands
    Route::apiResources([
        'brands' => BrandController::class,
    ],[
        'only' => ['index']
    ]);
    Route::apiResources([
        'brand' => BrandController::class,
    ],[
        'except' => ['index']
    ]);

    // Types
    Route::apiResources([
        'types' => VehicleTypeController::class,
    ],[
        'only' => ['index']
    ]);
    Route::apiResources([
        'type' => VehicleTypeController::class,
    ],[
        'except' => ['index']
    ]);    

});

/**
 * Change password
 */
Route::post('change/password', ChangePassword::class);

/**
 * Unique user validation
 */
Route::post('check/username', [UserController::class, 'uniqueUsername']);

/**
 * Unique rfid validation
 */
Route::post('check/rfid', [VehicleController::class, 'uniqueRfid']);

/**
 * Unique plate_no validation
 */
Route::post('check/plateno', [VehicleController::class, 'uniquePlateNo']);

/**
 * Selections
 */
Route::prefix('selections')->group(function() {

    Route::get('user/groups', [UserSelections::class, 'userGroups']);
    Route::get('vehicle/types', [VehicleSelections::class, 'vehicleTypes']);
    Route::get('vehicle/brands', [VehicleSelections::class, 'vehicleBrands']);

});