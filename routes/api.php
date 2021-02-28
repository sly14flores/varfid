<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\LoginController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\ChangePassword;

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
 * Users
 */
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

/**
 * Change password
 */
Route::post('change/password', ChangePassword::class);