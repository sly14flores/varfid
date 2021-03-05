<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Carbon\Carbon;

class VehicleLog extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'rfid',
    ];

    /**
     * @param $value
     * @return false|string
     */
    public function getCreatedAtAttribute($value)
    {
        return Carbon::parse($value)->format('F j, Y h:i:s A');
    }

    public function vehicle() {

        return $this->belongsTo(Vehicle::class,'rfid','rfid');

    }
}
