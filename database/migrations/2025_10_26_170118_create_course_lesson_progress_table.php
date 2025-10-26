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
        Schema::create('course_lesson_progress', function (Blueprint $table) {
            $table->id();
            $table->foreignId('enrollment_id')->constrained('course_enrollments')->onDelete('cascade');
            $table->foreignId('lesson_id')->constrained('course_lessons')->onDelete('cascade');

            $table->enum('status', ['not_started', 'in_progress', 'completed'])->default('not_started');
            $table->integer('video_progress_seconds')->default(0);
            $table->integer('completion_percentage')->default(0);

            $table->timestamp('started_at')->nullable();
            $table->timestamp('completed_at')->nullable();
            $table->timestamps();

            $table->unique(['enrollment_id', 'lesson_id']);
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('course_lesson_progress');
    }
};
