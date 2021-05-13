<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\VehicleModel;
use App\Http\Resources\VehicleModelResource;
use App\Http\Resources\VehicleModelResourceCollection;
use App\Http\Resources\VehicleModelsListResourceCollection;

use Illuminate\Support\Facades\Validator;
use App\Traits\Messages;

class VehicleModelController extends Controller
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
        $models = VehicleModel::paginate(10);

        $data = new VehicleModelsListResourceCollection($models);

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
            'brand_id' => 'integer',
            'name' => 'string',
            // 'description' => 'string',
        ];

        $validator = Validator::make($request->all(), $rules);
		
        if ($validator->fails()) {
            return $this->jsonErrorDataValidation();
        }

        /** Get validated data */
        $data = $validator->valid();

        $model = new VehicleModel;
        $model->fill($data);

        $model->save();

        $data = new VehicleModelResource($model);

        return $this->jsonSuccessResponse($data, 200, 'New model successfully added'); 
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

        $model = VehicleModel::find($id);        

        if (is_null($model)) {
			return $this->jsonErrorResourceNotFound();
        }

        $data = new VehicleModelResource($model);

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

        $model = VehicleModel::find($id);      

        if (is_null($model)) {
			return $this->jsonErrorResourceNotFound();
        }

        $rules = [
            'brand_id' => 'integer',            
            'name' => 'string',
            // 'description' => 'string',
        ];

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return $this->jsonErrorDataValidation();
        }

        /** Get validated data */
        $data = $validator->valid();        
        unset($data['id']);
        $model->fill($data);

        $model->save();

        $data = new VehicleModelResource($model);

        return $this->jsonSuccessResponse($data, 200, 'Vehicle model info updated successfully'); 
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

        $model = VehicleModel::find($id);

        if (is_null($model)) {
			return $this->jsonErrorResourceNotFound();
        }        

        $model->delete();

        return $this->jsonDeleteSuccessResponse();
    }
}
