<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;

use App\Traits\Messages;

use App\Models\User;
use App\Http\Resources\UserResource;
use App\Http\Resources\UserResourceCollection;
use App\Http\Resources\UsersListResourceCollection;

class UserController extends Controller
{

    use Messages;

    private $http_code_ok;
    private $http_code_error;

	public function __construct()
	{
		$this->middleware(['auth:api']);
		// $this->authorizeResource(User::class, User::class);
		
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
        $users = User::paginate(10);

        $data = new UsersListResourceCollection($users);

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
            'firstname' => 'string',
            'lastname' => 'string',	
            'username' => 'string',
            'password' => 'string',
            'image' => ['image', 'mimes:jpeg,png,jpg,gif,svg','max:128']    
        ];

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return $this->jsonErrorDataValidation();
        }        

        /** Get validated data */
        $data = $validator->valid();      

        $user = new User;
        $password = Hash::make($data['password']);
        $data['password'] = $password;
        $data['api_token'] = Str::random(80);
        $user->fill($data);

        $user->save();

        /**
         * Upload to ftp
         */
        if (isset($data['image'])) {
            $folder = config('ftp.users');
            $path = "{$folder}/{$user->id}";
            $filename = Str::random(20).".".$request->file('image')->getClientOriginalExtension();
            $request->file('image')->storeAs($path, $filename);
            $image = "{$path}/{$filename}";
            $user->image = $image;
            $user->save();
        }

        $data = new UserResource($user);

        return $this->jsonSuccessResponse($data, 200, 'New user successfully added'); 
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

        $user = User::find($id);        

        if (is_null($user)) {
			return $this->jsonErrorResourceNotFound();
        }

        $data = new UserResource($user);

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

        $user = User::find($id);

        if (is_null($user)) {
			return $this->jsonErrorResourceNotFound();
        }

        $rules = [
            'firstname' => 'string',
            'lastname' => 'string',
            'username' => 'string',
            'image' => ['image', 'mimes:jpeg,png,jpg,gif,svg','max:128']
        ];

        $validator = Validator::make($request->all(), $rules);
        
        if ($validator->fails()) {
            return $this->jsonErrorDataValidation();
        }

        /** Get validated data */
        $data = $validator->valid();        
        unset($data['id']);
        $user->fill($data);

        $user->save();

        /**
         * Upload to ftp
         */
        if (isset($data['image'])) {
            $folder = config('ftp.users');
            $path = "{$folder}/{$user->id}";
            $filename = Str::random(20).".".$request->file('image')->getClientOriginalExtension();
            $request->file('image')->storeAs($path, $filename);
            $image = "{$path}/{$filename}";
            $user->image = $image;
            $user->save();
        }        

        $data = new UserResource($user);

        return $this->jsonSuccessResponse($data, 200, 'User info updated successfully'); 
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

        $user = User::find($id);

        if (is_null($user)) {
			return $this->jsonErrorResourceNotFound();
        }        

        $user->delete();

        return $this->jsonDeleteSuccessResponse(); 
    }

    public function uniqueUsername(Request $request) {

        $username = $request->username;
        $id = $request->id;

        $wheres = [['username',$username]];
        if (!is_null($id)) {
            $wheres[] = ['id','!=',$id];
        }
        
        $user = User::where($wheres)->first();
        $available = is_null($user);

        return $this->jsonSuccessResponse([
            'available'=>$available
        ], 200);

    }
}
