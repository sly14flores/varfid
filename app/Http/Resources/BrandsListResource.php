<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class BrandsListResource extends JsonResource
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
            'type_name' => (is_null($this->vehicleType))?null:$this->vehicleType->name,
            'name' => $this->name,
            'description' => $this->description,
            'date_created' => $this->created_at 
        ];
    }
}
