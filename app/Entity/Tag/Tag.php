<?php

namespace App\Entity\Tag;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphToMany;

/**
 * @property int $id
 * @property string $name_uk
 * @property string $name_en
 * @property string $slug
 */
class Tag extends Model
{
    use HasFactory;

    protected $fillable = [
        'name_uk',
        'name_en',
        'slug',
    ];

    /**
     * Get localized name based on current locale
     */
    public function getNameAttribute(): string
    {
        $locale = app()->getLocale();
        return $this->{"name_{$locale}"} ?? $this->name_en;
    }

    /**
     * Get courses with this tag
     */
    public function courses(): MorphToMany
    {
        return $this->morphedByMany(\App\Entity\Course\Course::class, 'taggable');
    }
}