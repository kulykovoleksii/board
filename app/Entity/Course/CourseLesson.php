<?php

namespace App\Entity\Course;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property int $module_id
 * @property string $title_uk
 * @property string $title_en
 * @property string|null $description_uk
 * @property string|null $description_en
 * @property int $position
 * @property int $duration_minutes
 * @property bool $is_published
 * @property bool $is_free
 * @property Carbon $created_at
 * @property Carbon $updated_at
 *
 * @property CourseModule $module
 * @property CourseLessonContent[] $contents
 */
class CourseLesson extends Model
{
    use HasFactory;

    protected $fillable = [
        'module_id',
        'title_uk',
        'title_en',
        'description_uk',
        'description_en',
        'position',
        'duration_minutes',
        'is_published',
        'is_free',
    ];

    protected $casts = [
        'position' => 'integer',
        'duration_minutes' => 'integer',
        'is_published' => 'boolean',
        'is_free' => 'boolean',
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
     * Get the module this lesson belongs to
     */
    public function module()
    {
        return $this->belongsTo(CourseModule::class, 'module_id');
    }

    /**
     * Get the course this lesson belongs to (through module)
     */
    public function course()
    {
        return $this->module->course();
    }

    /**
     * Get all content blocks for this lesson
     */
    public function contents()
    {
        return $this->hasMany(CourseLessonContent::class, 'lesson_id')->orderBy('position');
    }

    /**
     * Get content by type
     */
    public function contentsByType(string $type)
    {
        return $this->contents()->where('type', $type);
    }

    /**
     * Get lesson progress for a specific enrollment
     */
    public function progressFor(int $enrollmentId)
    {
        return $this->hasOne(CourseLessonProgress::class, 'lesson_id')
            ->where('enrollment_id', $enrollmentId);
    }

    /**
     * Check if lesson is accessible (free or user is enrolled)
     */
    public function isAccessible(?int $enrollmentId = null): bool
    {
        if ($this->is_free) {
            return true;
        }

        return $enrollmentId !== null;
    }

    /**
     * Recalculate lesson duration from content
     */
    public function recalculateDuration(): void
    {
        $totalSeconds = $this->contents()
            ->whereNotNull('duration_seconds')
            ->sum('duration_seconds');

        $totalMinutes = (int) ceil($totalSeconds / 60);
        $this->update(['duration_minutes' => $totalMinutes]);
    }
}