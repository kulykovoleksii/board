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
        Schema::table('regions', function (Blueprint $table) {
            // ISO codes for standardization
            $table->string('country_code', 2)->nullable()->after('slug'); // UA, GB, US
            $table->string('code', 10)->nullable()->after('country_code'); // Region code (e.g. UA-30, GB-ENG)

            // Type of region for hierarchy
            $table->string('type', 20)->default('city')->after('code'); // country, state, county, region, city, district

            // Coordinates for geolocation
            $table->decimal('latitude', 10, 7)->nullable()->after('type');
            $table->decimal('longitude', 10, 7)->nullable()->after('latitude');

            // Indexes for fast lookup
            $table->index('country_code');
            $table->index('code');
            $table->index('type');
            $table->index(['latitude', 'longitude']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('regions', function (Blueprint $table) {
            $table->dropIndex(['regions_country_code_index']);
            $table->dropIndex(['regions_code_index']);
            $table->dropIndex(['regions_type_index']);
            $table->dropIndex(['regions_latitude_longitude_index']);

            $table->dropColumn(['country_code', 'code', 'type', 'latitude', 'longitude']);
        });
    }
};
