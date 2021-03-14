<?php

namespace App\Traits;

use App\Models\Brand;
use App\Models\VehicleType;
use App\Models\VehicleModel;

trait General {

    /**
     * User groups
     */
    public function groups()
    {
        return [
            ['id' => 1, 'name' => 'Administrator', 'description' => 'Administrators'],
            ['id' => 2, 'name' => 'User', 'description' => 'Users'],
        ];
    }

    /**
     * Group name
     */
    public function getGroupName($id)
    {
        $groups = $this->groups();

        $group = collect($groups)->filter(function($group) use ($id) {
            return ($group['id']==$id);
        });

        return ($group->first())['name'];
    }

    public function types() {

        return VehicleType::all();

    }

    public function brands() {

        return Brand::all();     

    }

    public function models() {

        return VehicleModel::all();     

    }    

}