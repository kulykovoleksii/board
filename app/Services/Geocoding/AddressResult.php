<?php

namespace App\Services\Geocoding;

class AddressResult
{
    public function __construct(
        public readonly string $postalCode,
        public readonly string $countryCode,
        public readonly ?string $street = null,
        public readonly ?string $district = null,
        public readonly ?string $city = null,
        public readonly ?string $state = null,
        public readonly ?float $latitude = null,
        public readonly ?float $longitude = null,
        public readonly ?array $metadata = null,
    ) {
    }

    /**
     * Get full address string
     */
    public function getFullAddress(): string
    {
        $parts = array_filter([
            $this->street,
            $this->district,
            $this->city,
            $this->state,
            $this->postalCode,
        ]);

        return implode(', ', $parts);
    }

    /**
     * Convert to array for database storage
     */
    public function toArray(): array
    {
        return [
            'code' => $this->postalCode,
            'country_code' => $this->countryCode,
            'street' => $this->street,
            'district' => $this->district,
            'city' => $this->city,
            'state' => $this->state,
            'latitude' => $this->latitude,
            'longitude' => $this->longitude,
            'metadata' => $this->metadata,
        ];
    }
}