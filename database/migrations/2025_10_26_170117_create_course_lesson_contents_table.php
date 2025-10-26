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
        Schema::create('course_lesson_contents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lesson_id')->constrained('course_lessons')->onDelete('cascade');

            $table->enum('type', ['text', 'video', 'image', 'file', 'quiz'])->default('text');
            $table->integer('position')->default(0);

            // Text content
            $table->text('content_uk')->nullable();
            $table->text('content_en')->nullable();

            // Media content (video/image/file)
            $table->string('file_path')->nullable();
            $table->string('file_url')->nullable(); // for YouTube/Vimeo links
            $table->string('thumbnail')->nullable();
            $table->integer('duration_seconds')->nullable(); // for videos

            // File metadata
            $table->string('file_name')->nullable();
            $table->bigInteger('file_size')->nullable(); // bytes
            $table->string('mime_type')->nullable();

            $table->timestamps();

            $table->index(['lesson_id', 'position']);
            $table->index('type');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('course_lesson_contents');
    }
};
