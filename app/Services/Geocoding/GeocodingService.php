<?php

namespace App\Services\Geocoding;

use App\Entity\PostalCode;
use Illuminate\Support\Facades\Cache;

/**
 * Main geocoding service that manages multiple geocoder providers
 * and caches results in the database
 */
class GeocodingService
{
    /**
     * @var GeocoderInterface[]
     */
    private array $geocoders = [];

    public function __construct()
    {
        // Register geocoders
        $this->registerGeocoder(new PostcodesIoGeocoder());

        // Register Google Maps if API key is configured
        if ($googleApiKey = config('services.google_maps.api_key')) {
            $this->registerGeocoder(new GoogleMapsGeocoder($googleApiKey));
        }
    }

    /**
     * Register a geocoder provider
     */
    public function registerGeocoder(GeocoderInterface $geocoder): void
    {
        $this->geocoders[] = $geocoder;
    }

    /**
     * Lookup postal code with automatic provider selection and caching
     */
    public function lookupPostalCode(string $postalCode, ?string $countryCode = null): ?AddressResult
    {
        // Normalize postal code
        $postalCode = strtoupper(trim($postalCode));

        // Check database cache first
        $cached = PostalCode::byCode($postalCode)->first();
        if ($cached) {
            return $this->postalCodeToAddressResult($cached);
        }

        // Try to determine country code from postal code format
        if (!$countryCode) {
            $countryCode = $this->detectCountryFromPostalCode($postalCode);
        }

        // Try each geocoder that supports the country
        foreach ($this->geocoders as $geocoder) {
            if ($countryCode && !$geocoder->supportsCountry($countryCode)) {
                continue;
            }

            $result = $geocoder->lookupPostalCode($postalCode);
            if ($result) {
                // Cache result in database
                $this->cachePostalCode($result);
                return $result;
            }
        }

        return null;
    }

    /**
     * Geocode full address
     */
    public function geocode(string $address, ?string $countryCode = null): ?AddressResult
    {
        foreach ($this->geocoders as $geocoder) {
            if ($countryCode && !$geocoder->supportsCountry($countryCode)) {
                continue;
            }

            $result = $geocoder->geocode($address);
            if ($result) {
                $this->cachePostalCode($result);
                return $result;
            }
        }

        return null;
    }

    /**
     * Reverse geocode coordinates to address
     */
    public function reverseGeocode(float $latitude, float $longitude): ?AddressResult
    {
        // Check cache with coordinate proximity
        $cached = $this->findNearbyPostalCode($latitude, $longitude);
        if ($cached) {
            return $this->postalCodeToAddressResult($cached);
        }

        // Try each geocoder
        foreach ($this->geocoders as $geocoder) {
            $result = $geocoder->reverseGeocode($latitude, $longitude);
            if ($result) {
                $this->cachePostalCode($result);
                return $result;
            }
        }

        return null;
    }

    /**
     * Cache postal code result in database
     */
    private function cachePostalCode(AddressResult $result): void
    {
        PostalCode::updateOrCreate(
            ['code' => $result->postalCode],
            $result->toArray()
        );
    }

    /**
     * Convert PostalCode model to AddressResult
     */
    private function postalCodeToAddressResult(PostalCode $postalCode): AddressResult
    {
        return new AddressResult(
            postalCode: $postalCode->code,
            countryCode: $postalCode->country_code,
            street: $postalCode->street,
            district: $postalCode->district,
            city: $postalCode->city,
            state: $postalCode->state,
            latitude: $postalCode->latitude,
            longitude: $postalCode->longitude,
            metadata: $postalCode->metadata,
        );
    }

    /**
     * Find nearby postal code in database (within ~1km)
     */
    private function findNearbyPostalCode(float $latitude, float $longitude, float $maxDistance = 0.01): ?PostalCode
    {
        return PostalCode::query()
            ->whereNotNull('latitude')
            ->whereNotNull('longitude')
            ->whereBetween('latitude', [$latitude - $maxDistance, $latitude + $maxDistance])
            ->whereBetween('longitude', [$longitude - $maxDistance, $longitude + $maxDistance])
            ->first();
    }

    /**
     * Detect country from postal code format
     */
    private function detectCountryFromPostalCode(string $postalCode): ?string
    {
        // UK format: "SW1A 1AA" or "M1 1AA"
        if (preg_match('/^[A-Z]{1,2}\d{1,2}[A-Z]?\s?\d[A-Z]{2}$/i', $postalCode)) {
            return 'GB';
        }

        // US ZIP: "90210" or "10001-1234"
        if (preg_match('/^\d{5}(-\d{4})?$/', $postalCode)) {
            return 'US';
        }

        // Ukraine: "01001" (5 digits)
        if (preg_match('/^\d{5}$/', $postalCode)) {
            return 'UA';
        }

        // Canada: "K1A 0B1"
        if (preg_match('/^[A-Z]\d[A-Z]\s?\d[A-Z]\d$/i', $postalCode)) {
            return 'CA';
        }

        return null;
    }
}