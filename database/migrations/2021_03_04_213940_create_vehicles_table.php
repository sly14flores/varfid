<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVehiclesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('vehicles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('type_id')->constrained('vehicle_types')
            ->onDelete('cascade')
            ->onUpdate('no action');
            $table->foreignId('brand_id')->constrained('brands')
            ->onDelete('cascade')
            ->onUpdate('no action');
            $table->string('model')->nullable();          
            $table->string('plate_no')->nullable();               
            $table->string('rfid')->nullable();               
            $table->string('firstname')->nullable();               
            $table->string('lastname')->nullable();        
            $table->string('sex')->nullable();    
            $table->string('contact_no')->nullable();           
            $table->string('address')->nullable();       
            $table->string('image')->nullable();    
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('vehicles');
    }
}
