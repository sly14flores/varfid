<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Traits\General;
use Illuminate\Support\Collection;
use App\Models\VehicleLog;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class PrintLogs extends Controller
{

    use General;

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
        if ($period!=null) {
            $periods = ["Date","Dates","Month","Year"];
            $descriptions = [
                $description = Carbon::parse($filters['startDate'])->format("M j, Y"),
                $description = Carbon::parse($filters['startDate'])->format("M j, Y")." - ".Carbon::parse($filters['endDate'])->format("M j, Y"),
                $description = "{$months[$filters['month']]} {$filters['year']}",
                $description = "{$filters['year']}"
            ];
            $description = "{$descriptions[$period-1]}";
            $coverage[] = "Coverage: {$periods[$period-1]}: {$description}";
            $startDate = Carbon::parse($filters['startDate'])->format("Y-m-d 00:00:00");
            $endDate = Carbon::parse($filters['endDate'])->addDays(1)->format("Y-m-d 00:00:00");
        }
        if ($filters['type']==0) {
            $coverage[] = "Type: All";
        } else {
            $coverage[] = "Type: {$this->getType($filters['type'])}";
        }
        if ($filters['brand']==0) {
            $coverage[] = "Brand: All";
        } else {
            $coverage[] = "Brand: {$this->getBrand($filters['brand'])}";
        }
        if ($filters['model']==0) {
            $coverage[] = "Model: All";
        } else {
            $coverage[] = "Model: {$this->getModel($filters['model'])}";
        }
        if ($filters['plate_no']!=null) {
            $coverage[] = "Plate No: {$filters['plate_no']}";
        }
        if ($filters['rfid']!=null) {
            $coverage[] = "RFID: {$filters['rfid']}";
        }
        if ($filters['name']!=null) {
            $coverage[] = "Name: {$filters['name']}";
        }

        $wheres = [];
        $type = $filters['type'];
        $brand = $filters['brand'];
        $model = $filters['model'];
        $plate_no = $filters['plate_no'];
        $rfid = $filters['rfid'];
        $name = $filters['name'];

        $getLogs = VehicleLog::where($wheres)
        ->whereHas('vehicle', function(Builder $query) use ($type,$brand,$model,$plate_no,$rfid,$name,$startDate,$endDate) {
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
            $query = $query->where($wheres);
            if (($startDate!=null) && ($endDate!=null)) {
                $query = $query->whereBetween('vehicle_logs.created_at',[$startDate,$endDate]);
            }
            return $query;
        })->get();
        // return $getLogs->toSql();

        $logs = [];
        foreach ($getLogs as $log) {
            $logs[] = [
                'no' => $log->id,
                'rfid' => $log->rfid,
                'type' => $log->vehicle->type->name,
                'brand' => $log->vehicle->brand->name,
                'model' => (is_null($log->vehicle->vehicle_model))?null:$log->vehicle->vehicle_model->name,
                'plateNo' => $log->vehicle->plate_no,
                'owner' => "{$log->vehicle->firstname} {$log->vehicle->lastname}",
                'dateTime' => Carbon::parse($log->created_at)->format("n/j/Y h:i:s A"),
            ];
        }

        $path = resource_path();
        $logo = "{$path}/dist/img/varfid-report-logo.png";

        $pdf = app('dompdf.wrapper');
        $pdf->getDomPDF()->set_option("enable_php", true);
        $pdf->loadView('reports.logs', [
            'logo' => $logo,
            'coverage' => $coverage,
            'logs' => $logs,
        ]);
        // $canvas = $pdf->getCanvas();
        $pdf->setPaper('letter', 'portrait');
        // return $pdf->download('doc.pdf');
        return $pdf->stream('doc.pdf');

    }
}
