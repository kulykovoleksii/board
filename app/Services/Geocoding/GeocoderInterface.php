<?php

namespace App\Services\Geocoding;

interface GeocoderInterface
{
    /**
     * Lookup address by postal code
     *
     * @param string $postalCode
     * @return AddressResult|null
     */
    public function lookupPostalCode(string $postalCode): ?AddressResult;

    /**
     * Geocode full address to coordinates
     *
     * @param string $address
     * @return AddressResult|null
     */
    public function geocode(string $address): ?AddressResult;

    /**
     * Reverse geocode coordinates to address
     *
     * @param float $latitude
     * @param float $longitude
     * @return AddressResult|null
     */
    public function reverseGeocode(float $latitude, float $longitude): ?AddressResult;

    /**
     * Check if this geocoder supports the given country
     *
     * @param string $countryCode
     * @return bool
     */
    public function supportsCountry(string $countryCode): bool;
}
