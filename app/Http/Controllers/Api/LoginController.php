<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use App\Models\User;
use App\Http\Resources\LoginResource;

use App\Traits\Messages;

class LoginController extends Controller
{
    use Messages;

    private $http_code_ok;
    private $http_code_error;    

    public function __construct()
    {
        $this->middleware('auth:api')->only(['logout','authenticate']);
        $this->http_code_ok = 200;
        $this->http_code_error = 500;        
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|string',
            'password' => 'required|string'
        ],[
            'username.required' => 'Username is required',
            'password.required' => 'Password is required'
        ]);

        if ($validator->fails()) {
            return $this->jsonErrorDataValidation($validator->errors());
        }

        $login = $validator->valid();

        if (!Auth::attempt($login)) {
            return $this->jsonErrorInvalidCredentials();
        }

        $id = Auth::id();
        $user = User::find($id);
        $user->api_token = Str::random(80);
        $user->save();

        $data = new LoginResource($user);

        return $this->jsonSuccessResponse($data, 200);
    }

    /**
     * Logout
     */
    public function logout()
    {

        $id = Auth::id();

        if ($this->renewToken($id)) {
            return $this->jsonSuccessLogout();
        } else {
            return $this->jsonFailedResponse(null, $this->http_code_error, 'Something went wrong.');
        }

    }

    /**
     * Renew Token
     */
    public function renewToken($id) {

        try {
            $user = User::find($id);
            $user->api_token = Str::random(80);
            $user->save();
            return true;
        } catch(\Exception $e) {
            return false;
        }   

    }

    public function authenticate()
    {
        return response()->json([], 200);
    }
}
