<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class VehicleLogsListResource extends JsonResource
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
            'no' => $this->id,
            'rfid' => $this->rfid,
            'type' => $this->vehicle->type->name,
            'brand' => $this->vehicle->brand->name,
            'model' => (is_null($this->vehicle->vehicle_model))?null:$this->vehicle->vehicle_model->name,
            'plateNo' => $this->vehicle->plate_no,
            'owner' => "{$this->vehicle->firstname} {$this->vehicle->lastname}",
            'dateTime' => $this->created_at,
        ];
    }
}
