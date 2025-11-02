<?php

namespace App\Services\Geocoding;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

/**
 * Free UK postcode lookup using postcodes.io API
 * https://postcodes.io/
 */
class PostcodesIoGeocoder implements GeocoderInterface
{
    private const API_BASE = 'https://api.postcodes.io';

    public function lookupPostalCode(string $postalCode): ?AddressResult
    {
        try {
            $response = Http::get(self::API_BASE . '/postcodes/' . urlencode($postalCode));

            if (!$response->successful() || $response->json('status') !== 200) {
                return null;
            }

            $data = $response->json('result');

            return new AddressResult(
                postalCode: $data['postcode'],
                countryCode: 'GB',
                street: null, // postcodes.io doesn't provide street level data
                district: $data['admin_district'] ?? null,
                city: $data['parish'] ?? $data['admin_ward'] ?? null,
                state: $data['region'] ?? null,
                latitude: $data['latitude'] ?? null,
                longitude: $data['longitude'] ?? null,
                metadata: [
                    'country' => $data['country'] ?? null,
                    'parliamentary_constituency' => $data['parliamentary_constituency'] ?? null,
                    'european_electoral_region' => $data['european_electoral_region'] ?? null,
                    'codes' => $data['codes'] ?? null,
                ],
            );
        } catch (\Exception $e) {
            Log::error('Postcodes.io API error', [
                'postal_code' => $postalCode,
                'error' => $e->getMessage(),
            ]);
            return null;
        }
    }

    public function geocode(string $address): ?AddressResult
    {
        // postcodes.io doesn't support full address geocoding
        return null;
    }

    public function reverseGeocode(float $latitude, float $longitude): ?AddressResult
    {
        try {
            $response = Http::get(self::API_BASE . '/postcodes', [
                'lon' => $longitude,
                'lat' => $latitude,
                'limit' => 1,
            ]);

            if (!$response->successful() || $response->json('status') !== 200) {
                return null;
            }

            $results = $response->json('result');
            if (empty($results)) {
                return null;
            }

            $data = $results[0];

            return new AddressResult(
                postalCode: $data['postcode'],
                countryCode: 'GB',
                street: null,
                district: $data['admin_district'] ?? null,
                city: $data['parish'] ?? $data['admin_ward'] ?? null,
                state: $data['region'] ?? null,
                latitude: $data['latitude'] ?? null,
                longitude: $data['longitude'] ?? null,
                metadata: [
                    'country' => $data['country'] ?? null,
                    'distance' => $data['distance'] ?? null,
                ],
            );
        } catch (\Exception $e) {
            Log::error('Postcodes.io reverse geocoding error', [
                'latitude' => $latitude,
                'longitude' => $longitude,
                'error' => $e->getMessage(),
            ]);
            return null;
        }
    }

    public function supportsCountry(string $countryCode): bool
    {
        return strtoupper($countryCode) === 'GB';
    }
}