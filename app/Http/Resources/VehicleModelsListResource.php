<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class VehicleModelsListResource extends JsonResource
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
            'brand_name' => (is_null($this->brand))?null:$this->brand->name,
            'name' => $this->name,
            'description' => $this->description,
            'date_created' => $this->created_at 
        ];
    }
}
