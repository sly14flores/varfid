<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

use App\Traits\General;

class LoginResource extends JsonResource
{
    use General;

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'firstname' => $this->firstname,
            'lastname' => $this->lastname,
            'token' => $this->api_token,
            'group' => $this->group,
            'groupName' => $this->getGroupName($this->group),
            'picture' => (is_null($this->image))?null:config('profile.users_url').Storage::url($this->image),            
        ];
    }
}
