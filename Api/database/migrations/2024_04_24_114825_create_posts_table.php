<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->uuid('idPost')->primary();
            $table->string('imageUrlOne');
            $table->string('imageUrlTwo')->nullable();
            $table->string('imageUrlThree')->nullable();
            $table->string('description');
            // $table->uuid('user_id');
            $table->index('user_id');
            $table->foreignUuid('user_id')->references('idUser')->on('users')->onDelete('cascade')->onUpdate('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
