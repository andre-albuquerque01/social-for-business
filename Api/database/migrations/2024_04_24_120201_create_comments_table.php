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
        Schema::create('comments', function (Blueprint $table) {
            $table->uuid("idComment");
            $table->index('user_id');
            $table->foreignUuid('user_id')->references('idUser')->on('users')->onDelete('cascade')->onUpdate('cascade');
            $table->index('');
            $table->foreignUuid('post_id')->references('idPost')->on('posts')->onDelete('cascade')->onUpdate('cascade');
            $table->string('comment');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('comments');
    }
};
