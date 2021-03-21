<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\VehicleLog;
use App\Http\Resources\VehicleLogResource;
use App\Http\Resources\VehicleLogResourceCollection;
use App\Http\Resources\VehicleLogsListResourceCollection;

use Illuminate\Support\Facades\Validator;
use App\Traits\Messages;
use App\Traits\General;

class VehicleLogController extends Controller
{
    use Messages, General;

    private $http_code_ok;
    private $http_code_error;

	public function __construct()
	{
		$this->middleware(['auth:api']);
		
        $this->http_code_ok = 200;
        $this->http_code_error = 500;

	}

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $filters = json_decode($request->filters,true);
        $getLogs = $this->getVehicleLogs($filters);
        $logs = $getLogs->paginate(20);

        $data = new VehicleLogsListResourceCollection($logs);

        return $this->jsonSuccessResponse($data, 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $rules = [
            'rfid' => 'string',
        ];

        $validator = Validator::make($request->all(), $rules);
		
        if ($validator->fails()) {
            return $this->jsonErrorDataValidation();
        }

        /** Get validated data */
        $data = $validator->valid();

        $log = new VehicleLog;
        $log->fill($data);

        $brand->save();

        $data = new VehicleLogResource($log);

        return $this->jsonSuccessResponse($data, 200, 'New log successfully added'); 
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        if (filter_var($id, FILTER_VALIDATE_INT) === false ) {
            return $this->jsonErrorInvalidParameters();
        }

        $log = VehicleLog::find($id);        

        if (is_null($log)) {
			return $this->jsonErrorResourceNotFound();
        }

        $data = new VehicleLogResource($log);

        return $this->jsonSuccessResponse($data, 200); 
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        if (filter_var($id, FILTER_VALIDATE_INT) === false ) {
            return $this->jsonErrorInvalidParameters();
        }

        $log = Brand::find($id);      

        if (is_null($log)) {
			return $this->jsonErrorResourceNotFound();
        }

        $rules = [
            'rfid' => 'string',
        ];

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return $this->jsonErrorDataValidation();
        }

        /** Get validated data */
        $data = $validator->valid();        
        unset($data['id']);
        $log->fill($data);

        $log->save();

        $data = new VehicleLogResource($log);

        return $this->jsonSuccessResponse($data, 200, 'Log info updated successfully'); 
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        if (filter_var($id, FILTER_VALIDATE_INT) === false ) {
            return $this->jsonErrorInvalidParameters();
        }

        $log = VehicleLog::find($id);

        if (is_null($log)) {
			return $this->jsonErrorResourceNotFound();
        }        

        $log->delete();

        return $this->jsonDeleteSuccessResponse();
    }    
}
