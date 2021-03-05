<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

use App\Models\Vehicle;
use App\Http\Resources\VehicleResource;
use App\Http\Resources\VehicleResourceCollection;
use App\Http\Resources\VehiclesListResource;
use App\Http\Resources\VehiclesListResourceCollection;

use Illuminate\Support\Facades\Validator;
use App\Traits\Messages;

use Illuminate\Support\Facades\Storage;

class VehicleController extends Controller
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
        $vehicles = Vehicle::paginate(10);

        $data = new VehiclesListResourceCollection($vehicles);

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
            'type_id' => 'integer',
            'brand_id' => 'integer',
            'model' => 'string',
            'plate_no' => 'string',
            'rfid' => 'string',
            'firstname' => 'string',
            'lastname' => 'string',
            'sex' => 'string',
            'contact_no' => 'string',
            'address' => 'string',
            'image' => ['image', 'mimes:jpeg,png,jpg,gif,svg','max:128']
        ];

        $validator = Validator::make($request->all(), $rules);
		
        if ($validator->fails()) {
            return $this->jsonErrorDataValidation();
        }

        /** Get validated data */
        $data = $validator->valid();

        $vehicle = new Vehicle;
        $vehicle->fill($data);

        $vehicle->save();

        /**
         * Upload
         */
        if (isset($data['image'])) {
            $folder = config('profile.vehicles');
            $path = "{$folder}/{$vehicle->id}";
            $filename = Str::random(20).".".$request->file('image')->getClientOriginalExtension();
            $request->file('image')->storeAs($path, $filename);
            $image = "{$path}/{$filename}";
            $vehicle->image = $image;
            $vehicle->save();
        }        

        $data = new VehicleResource($vehicle);

        return $this->jsonSuccessResponse($data, 200, 'New vehicle successfully added'); 
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

        $vehicle = Vehicle::find($id);        

        if (is_null($vehicle)) {
			return $this->jsonErrorResourceNotFound();
        }

        $data = new VehicleResource($vehicle);

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

        $vehicle = Vehicle::find($id);      

        if (is_null($vehicle)) {
			return $this->jsonErrorResourceNotFound();
        }

        $rules = [
            'type_id' => 'integer',
            'brand_id' => 'integer',
            'model' => 'string',
            'plate_no' => 'string',
            'rfid' => 'string',
            'firstname' => 'string',
            'lastname' => 'string',
            'sex' => 'string',
            'contact_no' => 'string',
            'address' => 'string',
            'image' => ['image', 'mimes:jpeg,png,jpg,gif,svg','max:128']
        ];

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return $this->jsonErrorDataValidation();
        }

        /** Get validated data */
        $data = $validator->valid();        
        unset($data['id']);
        $vehicle->fill($data);

        $vehicle->save();

        /**
         * Upload
         */
        if (isset($data['image'])) {
            $folder = config('profile.vehicles');
            $path = "{$folder}/{$vehicle->id}";
            $filename = Str::random(20).".".$request->file('image')->getClientOriginalExtension();
            $request->file('image')->storeAs($path, $filename);
            $image = "{$path}/{$filename}";
            $vehicle->image = $image;
            $vehicle->save();
        }        

        $data = new VehicleResource($vehicle);

        return $this->jsonSuccessResponse($data, 200, 'Vehicle info updated successfully'); 
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

        $vehicle = Vehicle::find($id);

        if (is_null($vehicle)) {
			return $this->jsonErrorResourceNotFound();
        }        

        $vehicle->delete();

        return $this->jsonDeleteSuccessResponse();
    }

    public function rfid(Request $request)
    {
        $rfid = $request->rfid;

        $vehicle = Vehicle::where('rfid',$rfid)->first();

        if (is_null($vehicle)) {
			return $this->jsonErrorResourceNotFound();
        }        

        $data = new VehiclesListResource($vehicle);

        return $data;
    }
}
