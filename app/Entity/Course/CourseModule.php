<?php

namespace App\Entity\Course;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property int $course_id
 * @property string $title_uk
 * @property string $title_en
 * @property string|null $description_uk
 * @property string|null $description_en
 * @property int $position
 * @property int $duration_minutes
 * @property bool $is_published
 * @property Carbon $created_at
 * @property Carbon $updated_at
 *
 * @property Course $course
 * @property CourseLesson[] $lessons
 */
class CourseModule extends Model
{
    use HasFactory;

    protected $fillable = [
        'course_id',
        'title_uk',
        'title_en',
        'description_uk',
        'description_en',
        'position',
        'duration_minutes',
        'is_published',
    ];

    protected $casts = [
        'position' => 'integer',
        'duration_minutes' => 'integer',
        'is_published' => 'boolean',
    ];

    /**
     * Get localized title based on current locale
     */
    public function getTitleAttribute(): string
    {
        $locale = app()->getLocale();
        return $this->{"title_{$locale}"} ?? $this->title_en;
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
     * Get the course this module belongs to
     */
    public function course()
    {
        return $this->belongsTo(Course::class, 'course_id');
    }

    /**
     * Get all lessons in this module
     */
    public function lessons()
    {
        return $this->hasMany(CourseLesson::class, 'module_id')->orderBy('position');
    }

    /**
     * Get published lessons
     */
    public function publishedLessons()
    {
        return $this->lessons()->where('is_published', true);
    }

    /**
     * Calculate total lessons count
     */
    public function getLessonsCountAttribute(): int
    {
        return $this->lessons()->count();
    }

    /**
     * Recalculate module duration from lessons
     */
    public function recalculateDuration(): void
    {
        $totalMinutes = $this->lessons()->sum('duration_minutes');
        $this->update(['duration_minutes' => $totalMinutes]);
    }
}