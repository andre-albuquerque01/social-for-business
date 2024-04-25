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
        Schema::create('rates', function (Blueprint $table) {
            $table->uuid("idRate")->primary();
            $table->index('user_id');
            $table->foreignUuid('user_id')->references('idUser')->on('users')->onDelete('cascade')->onUpdate('cascade');
            $table->index('post_id');
            $table->foreignUuid('post_id')->references('idPost')->on('posts')->onDelete('cascade')->onUpdate('cascade');
            $table->integer('qtdRate');
            $table->boolean('isRating')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rates');
    }
};
