<?php

namespace App\Entity\Course;

use App\Entity\Tag\Taggable;
use App\Entity\User\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @property int $id
 * @property int $instructor_id
 * @property int|null $category_id
 * @property string $title_uk
 * @property string $title_en
 * @property string $slug
 * @property string|null $short_description_uk
 * @property string|null $short_description_en
 * @property string|null $description_uk
 * @property string|null $description_en
 * @property string|null $thumbnail
 * @property string|null $trailer_video_url
 * @property string $level
 * @property string $language
 * @property float|null $price
 * @property int $duration_minutes
 * @property bool $is_published
 * @property Carbon|null $published_at
 * @property int $students_count
 * @property float $rating_avg
 * @property int $reviews_count
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property Carbon|null $deleted_at
 *
 * @property User $instructor
 * @property CourseCategory|null $category
 * @property CourseModule[] $modules
 */
class Course extends Model
{
    use HasFactory, SoftDeletes, Taggable;

    public const LEVEL_BEGINNER = 'beginner';
    public const LEVEL_INTERMEDIATE = 'intermediate';
    public const LEVEL_ADVANCED = 'advanced';

    public const LANGUAGE_UK = 'uk';
    public const LANGUAGE_EN = 'en';
    public const LANGUAGE_BOTH = 'both';

    protected $fillable = [
        'instructor_id',
        'category_id',
        'title_uk',
        'title_en',
        'slug',
        'short_description_uk',
        'short_description_en',
        'description_uk',
        'description_en',
        'thumbnail',
        'trailer_video_url',
        'level',
        'language',
        'price',
        'duration_minutes',
        'is_published',
        'published_at',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'duration_minutes' => 'integer',
        'is_published' => 'boolean',
        'published_at' => 'datetime',
        'students_count' => 'integer',
        'rating_avg' => 'decimal:2',
        'reviews_count' => 'integer',
    ];

    public static function levelsList(): array
    {
        return [
            self::LEVEL_BEGINNER => 'Beginner',
            self::LEVEL_INTERMEDIATE => 'Intermediate',
            self::LEVEL_ADVANCED => 'Advanced',
        ];
    }

    public static function languagesList(): array
    {
        return [
            self::LANGUAGE_UK => 'Ukrainian',
            self::LANGUAGE_EN => 'English',
            self::LANGUAGE_BOTH => 'Both',
        ];
    }

    /**
     * Get localized title based on current locale
     */
    public function getTitleAttribute(): string
    {
        $locale = app()->getLocale();
        return $this->{"title_{$locale}"} ?? $this->title_en;
    }

    /**
     * Get localized short description based on current locale
     */
    public function getShortDescriptionAttribute(): ?string
    {
        $locale = app()->getLocale();
        return $this->{"short_description_{$locale}"} ?? $this->short_description_en;
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
     * Check if course is published
     */
    public function isPublished(): bool
    {
        return $this->is_published && $this->published_at !== null && $this->published_at->lte(now());
    }

    /**
     * Check if course is free
     */
    public function isFree(): bool
    {
        return $this->price === null || $this->price <= 0;
    }

    /**
     * Publish the course
     */
    public function publish(): void
    {
        $this->update([
            'is_published' => true,
            'published_at' => now(),
        ]);
    }

    /**
     * Unpublish the course
     */
    public function unpublish(): void
    {
        $this->update([
            'is_published' => false,
        ]);
    }

    /**
     * Increment students count
     */
    public function incrementStudentsCount(): void
    {
        $this->increment('students_count');
    }

    /**
     * Decrement students count
     */
    public function decrementStudentsCount(): void
    {
        $this->decrement('students_count');
    }

    /**
     * Update rating average
     */
    public function updateRating(float $average, int $count): void
    {
        $this->update([
            'rating_avg' => $average,
            'reviews_count' => $count,
        ]);
    }

    /**
     * Get course instructor
     */
    public function instructor()
    {
        return $this->belongsTo(User::class, 'instructor_id');
    }

    /**
     * Get course category
     */
    public function category()
    {
        return $this->belongsTo(CourseCategory::class, 'category_id');
    }

    /**
     * Get course modules
     */
    public function modules()
    {
        return $this->hasMany(CourseModule::class, 'course_id')->orderBy('position');
    }

    /**
     * Get published modules
     */
    public function publishedModules()
    {
        return $this->modules()->where('is_published', true);
    }

    /**
     * Get course enrollments
     */
    public function enrollments()
    {
        return $this->hasMany(CourseEnrollment::class, 'course_id');
    }

    /**
     * Get enrolled students
     */
    public function students()
    {
        return $this->belongsToMany(User::class, 'course_enrollments', 'course_id', 'student_id')
            ->withPivot(['enrolled_at', 'completed_at', 'progress_percentage', 'status'])
            ->withTimestamps();
    }

    /**
     * Check if user is enrolled in this course
     */
    public function isEnrolled(int $userId): bool
    {
        return $this->enrollments()->where('student_id', $userId)->exists();
    }

    /**
     * Enroll a student in this course
     */
    public function enroll(int $studentId, ?float $paidAmount = null, ?string $paymentMethod = null, ?string $transactionId = null): CourseEnrollment
    {
        if ($this->isEnrolled($studentId)) {
            throw new \DomainException('Student is already enrolled in this course.');
        }

        $enrollment = $this->enrollments()->create([
            'student_id' => $studentId,
            'enrolled_at' => now(),
            'paid_amount' => $paidAmount,
            'payment_method' => $paymentMethod,
            'payment_transaction_id' => $transactionId,
        ]);

        $this->incrementStudentsCount();

        return $enrollment;
    }

    /**
     * Scope to get only published courses
     */
    public function scopePublished(Builder $query): Builder
    {
        return $query->where('is_published', true)
            ->whereNotNull('published_at')
            ->where('published_at', '<=', now());
    }

    /**
     * Scope to filter by level
     */
    public function scopeByLevel(Builder $query, string $level): Builder
    {
        return $query->where('level', $level);
    }

    /**
     * Scope to filter by language
     */
    public function scopeByLanguage(Builder $query, string $language): Builder
    {
        return $query->where('language', $language);
    }

    /**
     * Scope to filter by category
     */
    public function scopeByCategory(Builder $query, int $categoryId): Builder
    {
        return $query->where('category_id', $categoryId);
    }

    /**
     * Scope to filter by instructor
     */
    public function scopeByInstructor(Builder $query, int $instructorId): Builder
    {
        return $query->where('instructor_id', $instructorId);
    }

    /**
     * Scope to get free courses
     */
    public function scopeFree(Builder $query): Builder
    {
        return $query->whereNull('price')->orWhere('price', '<=', 0);
    }

    /**
     * Scope to get paid courses
     */
    public function scopePaid(Builder $query): Builder
    {
        return $query->whereNotNull('price')->where('price', '>', 0);
    }

    /**
     * Scope to order by popularity
     */
    public function scopePopular(Builder $query): Builder
    {
        return $query->orderBy('students_count', 'desc');
    }

    /**
     * Scope to order by rating
     */
    public function scopeTopRated(Builder $query): Builder
    {
        return $query->orderBy('rating_avg', 'desc');
    }

    /**
     * Scope to order by newest
     */
    public function scopeNewest(Builder $query): Builder
    {
        return $query->orderBy('published_at', 'desc');
    }
}