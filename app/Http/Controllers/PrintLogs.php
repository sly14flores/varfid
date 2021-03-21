<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Traits\General;
use Illuminate\Support\Collection;

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

        $str_filters = $request->filters;
        $filters = json_decode($str_filters, true);
        $coverage = [];

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

        $getLogs = $this->getVehicleLogs($filters)->get();
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
        $canvas = $pdf->getCanvas();
        $pdf->setPaper('letter', 'portrait');
        // return $pdf->download('doc.pdf');
        return $pdf->stream('doc.pdf');

    }
}
