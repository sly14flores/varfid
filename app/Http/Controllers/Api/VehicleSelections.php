<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Traits\General;

class VehicleSelections extends Controller
{
    use General;

    public function vehicleTypes()
    {
        return $this->types();
    }

    public function vehicleBrands()
    {
        return $this->brands();
    }
    
    public function vehicleModels()
    {
        return $this->models();
    }

    public function all()
    {
        return [
            'types'=>$this->types(),
            'brands'=>$this->brands(),
            'models'=>$this->models(),
        ];
    }

}
