<?php

namespace App\Services\Geocoding;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

/**
 * Universal geocoder using Google Maps Geocoding API
 * https://developers.google.com/maps/documentation/geocoding
 */
class GoogleMapsGeocoder implements GeocoderInterface
{
    private const API_BASE = 'https://maps.googleapis.com/maps/api/geocode/json';

    public function __construct(
        private readonly string $apiKey
    ) {
    }

    public function lookupPostalCode(string $postalCode): ?AddressResult
    {
        return $this->geocode($postalCode);
    }

    public function geocode(string $address): ?AddressResult
    {
        try {
            $response = Http::get(self::API_BASE, [
                'address' => $address,
                'key' => $this->apiKey,
            ]);

            if (!$response->successful()) {
                return null;
            }

            $data = $response->json();

            if ($data['status'] !== 'OK' || empty($data['results'])) {
                return null;
            }

            return $this->parseResult($data['results'][0]);
        } catch (\Exception $e) {
            Log::error('Google Maps Geocoding API error', [
                'address' => $address,
                'error' => $e->getMessage(),
            ]);
            return null;
        }
    }

    public function reverseGeocode(float $latitude, float $longitude): ?AddressResult
    {
        try {
            $response = Http::get(self::API_BASE, [
                'latlng' => "$latitude,$longitude",
                'key' => $this->apiKey,
            ]);

            if (!$response->successful()) {
                return null;
            }

            $data = $response->json();

            if ($data['status'] !== 'OK' || empty($data['results'])) {
                return null;
            }

            return $this->parseResult($data['results'][0]);
        } catch (\Exception $e) {
            Log::error('Google Maps Reverse Geocoding API error', [
                'latitude' => $latitude,
                'longitude' => $longitude,
                'error' => $e->getMessage(),
            ]);
            return null;
        }
    }

    public function supportsCountry(string $countryCode): bool
    {
        // Google Maps supports all countries
        return true;
    }

    /**
     * Parse Google Maps API result into AddressResult
     */
    private function parseResult(array $result): ?AddressResult
    {
        $components = $this->extractAddressComponents($result['address_components'] ?? []);

        $postalCode = $components['postal_code'] ?? '';
        $countryCode = $components['country_code'] ?? '';

        if (empty($postalCode) || empty($countryCode)) {
            return null;
        }

        $location = $result['geometry']['location'] ?? [];

        return new AddressResult(
            postalCode: $postalCode,
            countryCode: $countryCode,
            street: $this->buildStreet($components),
            district: $components['sublocality'] ?? $components['neighborhood'] ?? null,
            city: $components['locality'] ?? $components['postal_town'] ?? null,
            state: $components['administrative_area_level_1'] ?? null,
            latitude: $location['lat'] ?? null,
            longitude: $location['lng'] ?? null,
            metadata: [
                'formatted_address' => $result['formatted_address'] ?? null,
                'place_id' => $result['place_id'] ?? null,
                'types' => $result['types'] ?? [],
            ],
        );
    }

    /**
     * Extract address components from Google Maps response
     */
    private function extractAddressComponents(array $components): array
    {
        $result = [];

        foreach ($components as $component) {
            $types = $component['types'] ?? [];

            if (in_array('postal_code', $types)) {
                $result['postal_code'] = $component['long_name'];
            }
            if (in_array('country', $types)) {
                $result['country_code'] = $component['short_name'];
            }
            if (in_array('street_number', $types)) {
                $result['street_number'] = $component['long_name'];
            }
            if (in_array('route', $types)) {
                $result['route'] = $component['long_name'];
            }
            if (in_array('locality', $types)) {
                $result['locality'] = $component['long_name'];
            }
            if (in_array('postal_town', $types)) {
                $result['postal_town'] = $component['long_name'];
            }
            if (in_array('administrative_area_level_1', $types)) {
                $result['administrative_area_level_1'] = $component['long_name'];
            }
            if (in_array('sublocality', $types)) {
                $result['sublocality'] = $component['long_name'];
            }
            if (in_array('neighborhood', $types)) {
                $result['neighborhood'] = $component['long_name'];
            }
        }

        return $result;
    }

    /**
     * Build street address from components
     */
    private function buildStreet(array $components): ?string
    {
        $parts = [];

        if (isset($components['street_number'])) {
            $parts[] = $components['street_number'];
        }
        if (isset($components['route'])) {
            $parts[] = $components['route'];
        }

        return !empty($parts) ? implode(' ', $parts) : null;
    }
}