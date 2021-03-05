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
}