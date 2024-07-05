<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    // Run the migrations.
    public function up(): void {
        Schema::create('food', function (Blueprint $table) {
            $table->id();
            $table->text('foodName');
            $table->string('image');
            $table->integer('price');
            $table->boolean('isRecomended');
            $table->integer('discount');
            $table->text('foodCategory');
            $table->integer('occurence');
            $table->timestamps();
        });
    }

    // Reverse the migrations.
    public function down(): void
    {
        Schema::dropIfExists('food');
    }
};