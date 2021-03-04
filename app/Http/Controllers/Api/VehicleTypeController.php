<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\VehicleType;
use App\Http\Resources\VehicleTypeResource;
use App\Http\Resources\VehicleTypeResourceCollection;
use App\Http\Resources\VehicleTypesListResourceCollection;

use Illuminate\Support\Facades\Validator;
use App\Traits\Messages;

class VehicleTypeController extends Controller
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

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $types = VehicleType::paginate(10);

        $data = new VehicleTypesResourceCollection($types);

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
            'name' => 'string',
            'description' => 'string',
        ];

        $validator = Validator::make($request->all(), $rules);
		
        if ($validator->fails()) {
            return $this->jsonErrorDataValidation();
        }

        /** Get validated data */
        $data = $validator->valid();

        $type = new VehicleType;
        $type->fill($data);

        $type->save();

        $data = new VehicleTypeResource($type);

        return $this->jsonSuccessResponse($data, 200, 'New type successfully added'); 
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

        $type = VehicleType::find($id);        

        if (is_null($type)) {
			return $this->jsonErrorResourceNotFound();
        }

        $data = new VehicleTypeResource($type);

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

        $type = VehicleType::find($id);      

        if (is_null($type)) {
			return $this->jsonErrorResourceNotFound();
        }

        $rules = [
            'name' => 'string',
            'description' => 'string',
        ];

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return $this->jsonErrorDataValidation();
        }

        /** Get validated data */
        $data = $validator->valid();        
        unset($data['id']);
        $type->fill($data);

        $type->save();

        $data = new VehicleTypeResource($brand);

        return $this->jsonSuccessResponse($data, 200, 'Brand info updated successfully'); 
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

        $type = VehicleType::find($id);

        if (is_null($type)) {
			return $this->jsonErrorResourceNotFound();
        }        

        $type->delete();

        return $this->jsonDeleteSuccessResponse();
    }
}
