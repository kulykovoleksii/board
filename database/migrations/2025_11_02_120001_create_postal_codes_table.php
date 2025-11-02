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
        Schema::create('postal_codes', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique(); // Full postal code (SW1A 1AA, 90210, 01001)
            $table->string('country_code', 2); // UA, GB, US
            $table->unsignedInteger('region_id')->nullable(); // Link to region (city/district)

            // Address components
            $table->string('street')->nullable();
            $table->string('district')->nullable(); // District within city
            $table->string('city')->nullable();
            $table->string('state')->nullable(); // State/Oblast/County

            // Geocoding data
            $table->decimal('latitude', 10, 7)->nullable();
            $table->decimal('longitude', 10, 7)->nullable();

            // Metadata
            $table->json('metadata')->nullable(); // Additional country-specific data
            $table->timestamps();

            // Indexes
            $table->index('country_code');
            $table->index('region_id');
            $table->index(['latitude', 'longitude']);

            // Foreign key
            $table->foreign('region_id')->references('id')->on('regions')->onDelete('SET NULL');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('postal_codes');
    }
};
