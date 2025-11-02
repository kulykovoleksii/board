<?php

namespace App\Entity;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

/**
 * @property int $id
 * @property string $code
 * @property string $country_code
 * @property int|null $region_id
 * @property string|null $street
 * @property string|null $district
 * @property string|null $city
 * @property string|null $state
 * @property float|null $latitude
 * @property float|null $longitude
 * @property array|null $metadata
 *
 * @property Region|null $region
 *
 * @method Builder byCountry(string $countryCode)
 * @method Builder byCode(string $code)
 */
class PostalCode extends Model
{
    protected $fillable = [
        'code',
        'country_code',
        'region_id',
        'street',
        'district',
        'city',
        'state',
        'latitude',
        'longitude',
        'metadata',
    ];

    protected $casts = [
        'latitude' => 'float',
        'longitude' => 'float',
        'metadata' => 'array',
    ];

    public function region()
    {
        return $this->belongsTo(Region::class, 'region_id', 'id');
    }

    public function scopeByCountry(Builder $query, string $countryCode)
    {
        return $query->where('country_code', $countryCode);
    }

    public function scopeByCode(Builder $query, string $code)
    {
        return $query->where('code', $code);
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
            $this->code,
        ]);

        return implode(', ', $parts);
    }

    /**
     * Check if postal code has coordinates
     */
    public function hasCoordinates(): bool
    {
        return $this->latitude !== null && $this->longitude !== null;
    }
}