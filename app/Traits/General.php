<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;

use App\Models\Brand;
use App\Models\VehicleType;
use App\Models\VehicleModel;
use App\Models\VehicleLog;

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

        return VehicleType::all(['id','name']);

    }

    public function brands() {

        return Brand::all(['id','name']);     

    }

    public function models() {

        return VehicleModel::all(['id','name']);     

    }

    public function getVehicleLogs($filters)
    {
        $wheres = [];
        $type = $filters['type'];
        $brand = $filters['brand'];
        $model = $filters['model'];
        $plate_no = $filters['plate_no'];
        $rfid = $filters['rfid'];
        $name = $filters['name'];

        $logs = VehicleLog::where($wheres)
        ->whereHas('vehicle', function(Builder $query) use ($type,$brand,$model,$plate_no,$rfid,$name) {
            $wheres = [];
            if ($type>0) {
                $wheres[] = ['vehicles.type_id',$type];
            }
            if ($brand>0) {
                $wheres[] = ['vehicles.brand_id',$brand];
            }
            if ($model>0) {
                $wheres[] = ['vehicles.model',$model];
            }
            if ($plate_no!=null) {
                $wheres[] = ['vehicles.plate_no','like',"%{$plate_no}%"];
            }
            if ($rfid!=null) {
                $wheres[] = ['vehicles.rfid','like',"%{$rfid}%"];
            }
            if ($name!=null) {
                $wheres[] = [DB::raw("CONCAT(vehicles.firstname, ' ', vehicles.lastname)"),'like',"%{$name}%"];
            }
            return $query->where($wheres);
        });

        return $logs;
    }

}