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
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('instructor_id');
            $table->foreign('instructor_id')->references('id')->on('users')->onDelete('cascade');
            $table->unsignedBigInteger('category_id')->nullable();
            $table->foreign('category_id')->references('id')->on('course_categories')->onDelete('set null');

            // Basic info
            $table->string('title_uk');
            $table->string('title_en');
            $table->string('slug')->unique();

            // Descriptions
            $table->text('short_description_uk')->nullable();
            $table->text('short_description_en')->nullable();
            $table->text('description_uk')->nullable();
            $table->text('description_en')->nullable();

            // Media
            $table->string('thumbnail')->nullable();
            $table->string('trailer_video_url')->nullable();

            // Course metadata
            $table->enum('level', ['beginner', 'intermediate', 'advanced'])->default('beginner');
            $table->enum('language', ['uk', 'en', 'both'])->default('uk');
            $table->decimal('price', 10, 2)->nullable(); // null = free course
            $table->integer('duration_minutes')->default(0);

            // Publishing
            $table->boolean('is_published')->default(false);
            $table->timestamp('published_at')->nullable();

            // Stats (cached)
            $table->integer('students_count')->default(0);
            $table->decimal('rating_avg', 3, 2)->default(0);
            $table->integer('reviews_count')->default(0);

            $table->timestamps();
            $table->softDeletes();

            // Indexes
            $table->index(['is_published', 'published_at']);
            $table->index('slug');
            $table->index('level');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('courses');
    }
};
