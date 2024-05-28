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
            $table->uuid("idComment")->primary();
            $table->index('user_idUser');
            $table->foreignUuid('user_idUser')->references('idUser')->on('users')->onDelete('cascade')->onUpdate('cascade');
            $table->index('post_idPost');
            $table->foreignUuid('post_idPost')->references('idPost')->on('posts')->onDelete('cascade')->onUpdate('cascade');
            $table->string('comment');
            $table->timestamps();
            $table->softDeletes();
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
