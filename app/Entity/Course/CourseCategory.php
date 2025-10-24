<?php

namespace App\Entity\Course;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Kalnoy\Nestedset\NodeTrait;

/**
 * @property int $id
 * @property string $name_uk
 * @property string $name_en
 * @property string $slug
 * @property string|null $description_uk
 * @property string|null $description_en
 * @property string|null $icon
 * @property int $sort_order
 * @property int|null $parent_id
 * @property int $_lft
 * @property int $_rgt
 */
class CourseCategory extends Model
{
    use HasFactory, NodeTrait;

    protected $fillable = [
        'name_uk',
        'name_en',
        'slug',
        'description_uk',
        'description_en',
        'icon',
        'sort_order',
        'parent_id',
    ];

    protected $casts = [
        'sort_order' => 'integer',
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
     * Get localized description based on current locale
     */
    public function getDescriptionAttribute(): ?string
    {
        $locale = app()->getLocale();
        return $this->{"description_{$locale}"} ?? $this->description_en;
    }

    /**
     * Get courses in this category
     */
    public function courses()
    {
        return $this->hasMany(Course::class, 'category_id');
    }

    /**
     * Get published courses count
     */
    public function getPublishedCoursesCountAttribute(): int
    {
        return $this->courses()->where('is_published', true)->count();
    }
}