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
        Schema::create('course_enrollments', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('student_id');
            $table->foreign('student_id')->references('id')->on('users')->onDelete('cascade');
            $table->unsignedBigInteger('course_id');
            $table->foreign('course_id')->references('id')->on('courses')->onDelete('cascade');

            // Enrollment info
            $table->timestamp('enrolled_at')->useCurrent();
            $table->timestamp('completed_at')->nullable();
            $table->timestamp('last_accessed_at')->nullable();

            // Progress tracking
            $table->integer('progress_percentage')->default(0);
            $table->enum('status', ['enrolled', 'in_progress', 'completed', 'dropped'])->default('enrolled');

            // Payment info (for paid courses)
            $table->decimal('paid_amount', 10, 2)->nullable();
            $table->string('payment_method')->nullable();
            $table->string('payment_transaction_id')->nullable();

            // Certificate
            $table->string('certificate_url')->nullable();
            $table->timestamp('certificate_issued_at')->nullable();

            $table->timestamps();

            // Indexes
            $table->unique(['student_id', 'course_id']);
            $table->index('status');
            $table->index('enrolled_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('course_enrollments');
    }
};
