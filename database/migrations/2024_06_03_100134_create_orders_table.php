<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    
    // Run the migrations.
    public function up(): void {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->integer('serial_no');
            $table->unsignedBigInteger('userId');
            $table->unsignedBigInteger('foodId');
            $table->integer('noTimesOrdered');
            $table->timestamps();

            $table->foreign('userId')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('foodId')->references('id')->on('food')->onDelete('cascade');
        });
    }

    
    // Reverse the migrations.
    public function down(): void {
        Schema::dropIfExists('orders');
    }
};
