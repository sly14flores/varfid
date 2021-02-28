<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

use App\Traits\Messages;
use App\Rules\CurrentPassword;

use App\Models\User;

class ChangePassword extends Controller
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
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        $rules = [
            'currentPassword' => ['required', new CurrentPassword],
            'newPassword' => ['required', 'string', 'min:8'],
            'confirmNewPassword' => ['required', 'string', 'min:8', 'same:newPassword'],
        ];

		$messages = [
			'currentPassword.required' => 'Current password is required',
			'newPassword.required' => 'New password is required',
			'newPassword.min' => 'Password must at least be 8 characters',
			'confirmNewPassword.required' => 'Please confirm password',
			'confirmNewPassword.same' => 'Password confirmation does not match'
		];

        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->fails()) {
            return $this->jsonErrorDataValidation($validator->errors());
        }       

        /** Get validated data */
        $data = $validator->valid();

        $password = Hash::make($data['newPassword']);

        $user = User::find(Auth::id());

        $user->password = $password;
        $user->api_token = Str::random(80);

        $user->save();

        return $this->jsonSuccessResponse(null, 200, 'Password updated successfully. You will be logged out after clicking ok for security purposes.');       

    }
}
