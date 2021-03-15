<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

use Illuminate\Support\Facades\Storage;

class VehiclesListResource extends JsonResource
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
            'type_name' => $this->type->name,
            'brand_name' => $this->brand->name,
            'model' => (is_null($this->vehicle_model))?null:$this->vehicle_model->name,
            'plate_no' => $this->plate_no,
            'rfid' => $this->rfid,
            'firstname' => $this->firstname,
            'lastname' => $this->lastname,
            'sex' => $this->sex,
            'contact_no' => $this->contact_no,
            'address' => $this->address,
            'driver' => "{$this->firstname} {$this->lastname}",
            'picture' => (is_null($this->image))?null:config('profile.vehicles_url').Storage::url($this->image),            
            'date_created' => $this->created_at,
        ];
    }
}
