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
        Schema::create('course_lessons', function (Blueprint $table) {
            $table->id();
            $table->foreignId('module_id')->constrained('course_modules')->onDelete('cascade');

            $table->string('title_uk');
            $table->string('title_en');
            $table->text('description_uk')->nullable();
            $table->text('description_en')->nullable();

            $table->integer('position')->default(0);
            $table->integer('duration_minutes')->default(0);
            $table->boolean('is_published')->default(true);
            $table->boolean('is_free')->default(false); // preview lessons

            $table->timestamps();

            $table->index(['module_id', 'position']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('course_lessons');
    }
};
