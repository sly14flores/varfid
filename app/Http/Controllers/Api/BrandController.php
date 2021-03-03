<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Brand;
use App\Http\Resources\BrandResource;
use App\Http\Resources\BrandResourceCollection;
use App\Http\Resources\BrandsListResourceCollection;

use Illuminate\Support\Facades\Validator;
use App\Traits\Messages;

class BrandController extends Controller
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
        $brands = Brand::paginate(10);

        $data = new BrandsListResourceCollection($brands);

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

        $brand = new Brand;
        $brand->fill($data);

        $brand->save();

        $data = new BrandResource($brand);

        return $this->jsonSuccessResponse($data, 200, 'New brand successfully added'); 
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

        $brand = Brand::find($id);        

        if (is_null($brand)) {
			return $this->jsonErrorResourceNotFound();
        }

        $data = new BrandResource($brand);

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

        $brand = Brand::find($id);      

        if (is_null($brand)) {
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
        $brand->fill($data);

        $brand->save();

        $data = new BrandResource($brand);

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

        $brand = Brand::find($id);

        if (is_null($brand)) {
			return $this->jsonErrorResourceNotFound();
        }        

        $brand->delete();

        return $this->jsonDeleteSuccessResponse();
    }
}
