<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use PDF;
use App\Traits\General;
use Illuminate\Support\Collection;

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
                'dateTime' => $log->created_at,
            ];
        }

        $path = resource_path();
        $logo = "{$path}/dist/img/varfid-report-logo.png";
        $pdf = PDF::loadView('reports.logs', [
            'logo' => $logo,
            'logs' => $logs,
        ]);
        $pdf->setPaper('letter', 'portrait');
        // return $pdf->download('doc.pdf');
        return $pdf->stream('doc.pdf');

    }
}
