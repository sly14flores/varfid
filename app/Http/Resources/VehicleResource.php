<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

use Illuminate\Support\Facades\Storage;

class VehicleResource extends JsonResource
{
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
            'type_id' => $this->type_id,
            'brand_id' => $this->brand_id,
            'model' => $this->model,
            'plate_no' => $this->plate_no,
            'rfid' => $this->rfid,
            'firstname' => $this->firstname,
            'lastname' => $this->lastname,
            'sex' => $this->sex,
            'contact_no' => $this->contact_no,
            'address' => $this->address,
            'image' => null,
            'picture' => (is_null($this->image))?null:config('profile.vehicles_url').Storage::url($this->image)                        
        ];
    }
}
