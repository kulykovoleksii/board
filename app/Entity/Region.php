<?php

namespace App\Entity;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

/**
 * @property int $id
 * @property string $name
 * @property string $slug
 * @property string|null $country_code
 * @property string|null $code
 * @property string $type
 * @property float|null $latitude
 * @property float|null $longitude
 * @property int|null $parent_id
 *
 * @property Region $parent
 * @property Region[] $children
 * @property PostalCode[] $postalCodes
 *
 * @method Builder roots()
 * @method Builder byCountry(string $countryCode)
 * @method Builder byType(string $type)
 */
class Region extends Model
{
    use \Illuminate\Database\Eloquent\Factories\HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'country_code',
        'code',
        'type',
        'latitude',
        'longitude',
        'parent_id'
    ];

    protected $casts = [
        'latitude' => 'float',
        'longitude' => 'float',
    ];

    protected static function newFactory()
    {
        return \Database\Factories\RegionFactory::new();
    }

    public function getPath(): string
    {
        return ($this->parent ? $this->parent->getPath() . '/' : '') . $this->slug;
    }

    public function getAddress(): string
    {
        return ($this->parent ? $this->parent->getAddress() . ', ' : '') . $this->name;
    }

    public function parent()
    {
        return $this->belongsTo(static::class, 'parent_id', 'id');
    }

    public function children()
    {
        return $this->hasMany(static::class, 'parent_id', 'id');
    }

    public function postalCodes()
    {
        return $this->hasMany(PostalCode::class, 'region_id', 'id');
    }

    public function scopeRoots(Builder $query)
    {
        return $query->where('parent_id', null);
    }

    public function scopeByCountry(Builder $query, string $countryCode)
    {
        return $query->where('country_code', $countryCode);
    }

    public function scopeByType(Builder $query, string $type)
    {
        return $query->where('type', $type);
    }

    /**
     * Get country for this region (traverse up to root)
     */
    public function getCountry(): ?Region
    {
        if ($this->type === 'country') {
            return $this;
        }

        return $this->parent?->getCountry();
    }

    /**
     * Check if region has coordinates
     */
    public function hasCoordinates(): bool
    {
        return $this->latitude !== null && $this->longitude !== null;
    }
}
