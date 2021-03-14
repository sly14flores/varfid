<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Carbon\Carbon;

class Vehicle extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'type_id',
        'brand_id',
        'model',
        'plate_no',
        'rfid',
        'firstname',
        'lastname',
        'sex',
        'contact_no',
        'address',
        'image',
    ];

    /**
     * @param $value
     * @return false|string
     */
    public function getCreatedAtAttribute($value)
    {
        return Carbon::parse($value)->format('F j, Y h:i A');
    }

    public function type() {
        return $this->belongsTo(VehicleType::class,'type_id');
    }

    public function brand() {
        return $this->belongsTo(Brand::class);
    }

    public function vehicle_model() {
        return $this->belongsTo(VehicleModel::class,'model');
    }
}
