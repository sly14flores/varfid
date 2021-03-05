<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\User;
use App\Models\Vehicle;
use App\Models\VehicleLog;

use App\Traits\Messages;

class DashboardController extends Controller
{
    use Messages;

    private $http_code_ok;
    private $http_code_error;

	public function __construct()
	{
		$this->middleware(['auth:api']);
		
        $this->http_code_ok = 200;
        $this->http_code_error = 500;

	}

    public function getData()
    {
        $users = User::all();
        $vehicles = Vehicle::all();
        $logs = VehicleLog::all();

        $data = [
            'users' => $users->count(),
            'vehicles' => $vehicles->count(),
            'logs' => $logs->count(),
        ];

        return $this->jsonSuccessResponse($data, 200); 
    }
}
