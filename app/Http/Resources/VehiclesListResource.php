<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

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
            'type_id' => $this->type->name,
            'brand_id' => $this->brand->name,
            'model' => $this->model,
            'plate_no' => $this->plate_no,
            'rfid' => $this->rfid,
            'firstname' => $this->firstname,
            'lastname' => $this->lastname,
            'sex' => $this->sex,
            'contact_no' => $this->contact_no,
            'address' => $this->address,
        ];
    }
}
