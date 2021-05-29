<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Storage;

use Illuminate\Http\Request;
use App\Traits\General;
use App\Models\Vehicle;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class PrintVehicles extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        $months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];

        $str_filters = $request->filters;
        $filters = json_decode($str_filters, true);
        $coverage = [];

        $period = (isset($filters['coverage']))?$filters['coverage']:null;
        $startDate = null;
        $endDate = null;
        $title = "Vehicles Report";
        if ($period!=null) {
            $periods = ["Date","Dates","Month","Year"];
            $filter_month = (isset($filters['month']))?$months[$filters['month']]:null;
            $filter_year = (isset($filters['year']))?$filters['year']:null;
            $descriptions = [
                $description = Carbon::parse($filters['startDate'])->format("M j, Y"),
                $description = Carbon::parse($filters['startDate'])->format("M j, Y")." - ".Carbon::parse($filters['endDate'])->format("M j, Y"),
                $description = "{$filter_month} {$filter_year}",
                $description = "{$filter_year}"
            ];
            $description = "{$descriptions[$period-1]}";
            $coverage[] = "{$periods[$period-1]}: {$description}";
            $startDate = Carbon::parse($filters['startDate'])->format("Y-m-d 00:00:00");
            $endDate = Carbon::parse($filters['endDate'])->addDays(1)->format("Y-m-d 00:00:00");
        }
        // if ($filters['type']==0) {
        //     $coverage[] = "Type: All";
        // } else {
        //     $coverage[] = "Type: {$this->getType($filters['type'])}";
        // }
        // if ($filters['brand']==0) {
        //     $coverage[] = "Brand: All";
        // } else {
        //     $coverage[] = "Brand: {$this->getBrand($filters['brand'])}";
        // }
        // if ($filters['model']==0) {
        //     $coverage[] = "Model: All";
        // } else {
        //     $coverage[] = "Model: {$this->getModel($filters['model'])}";
        // }
        // if ($filters['plate_no']!=null) {
        //     $coverage[] = "Plate No: {$filters['plate_no']}";
        // }
        // if ($filters['rfid']!=null) {
        //     $coverage[] = "RFID: {$filters['rfid']}";
        // }
        // if ($filters['name']!=null) {
        //     $coverage[] = "Name: {$filters['name']}";
        // }

        $wheres = [];
        $type = $filters['type'];
        $brand = $filters['brand'];
        $model = $filters['model'];
        $plate_no = $filters['plate_no'];
        $rfid = $filters['rfid'];
        $name = $filters['name'];

        if ($type>0) {
            $wheres[] = ['type_id',$type];
        }

        if ($brand>0) {
            $wheres[] = ['brand_id',$brand];
        }

        if ($model>0) {
            $wheres[] = ['model',$model];
        }

        if ($plate_no!=null) {
            $wheres[] = ['plate_no','like',"%{$plate_no}%"];
        }

        if ($rfid!=null) {
            $wheres[] = ['rfid','like',"%{$rfid}%"];
        }
        
        if ($name!=null) {
            $wheres[] = [DB::raw("CONCAT(firstname, ' ', lastname)"),'like',"%{$name}%"];
        }

        $getVehicles = Vehicle::where($wheres);
        if (($startDate!=null) && ($endDate!=null)) {
            $getVehicles = $getVehicles->whereBetween('created_at',[$startDate,$endDate]);
        }
        $getVehicles = $getVehicles->orderByDesc('created_at')->get();
        
        $vehicles = [];
        foreach ($getVehicles as $i => $vehicle) {
            $vehicles[] = [
                'no' => $i+1,
                'type_name' => $vehicle->type->name,
                'brand_name' => $vehicle->brand->name,
                'model' => (is_null($vehicle->vehicle_model))?null:$vehicle->vehicle_model->name,
                'plate_no' => $vehicle->plate_no,
                'rfid' => $vehicle->rfid,
                'firstname' => $vehicle->firstname,
                'lastname' => $vehicle->lastname,
                'sex' => $vehicle->sex,
                'contact_no' => $vehicle->contact_no,
                'address' => $vehicle->address,
                'driver' => "{$vehicle->firstname} {$vehicle->lastname}",
                'picture' => (is_null($vehicle->image))?null:config('profile.vehicles_url').Storage::url($vehicle->image),            
                'date_created' => $vehicle->created_at,
            ];
        }

        $path = resource_path();
        $logo = "{$path}/dist/img/varfid-report-logo.png";

        $pdf = app('dompdf.wrapper');
        $pdf->getDomPDF()->set_option("enable_php", true);
        $pdf->loadView('reports.vehicles', [
            'title' => $title,
            'logo' => $logo,
            'coverage' => $coverage,
            'vehicles' => $vehicles,
        ]);
        // $canvas = $pdf->getCanvas();
        $pdf->setPaper('letter', 'portrait');
        // return $pdf->download('doc.pdf');
        return $pdf->stream('doc.pdf');

    }
}
