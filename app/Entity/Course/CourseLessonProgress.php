<?php

namespace App\Entity\Course;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property int $enrollment_id
 * @property int $lesson_id
 * @property string $status
 * @property int $video_progress_seconds
 * @property int $completion_percentage
 * @property Carbon|null $started_at
 * @property Carbon|null $completed_at
 * @property Carbon $created_at
 * @property Carbon $updated_at
 *
 * @property CourseEnrollment $enrollment
 * @property CourseLesson $lesson
 */
class CourseLessonProgress extends Model
{
    use HasFactory;

    public const STATUS_NOT_STARTED = 'not_started';
    public const STATUS_IN_PROGRESS = 'in_progress';
    public const STATUS_COMPLETED = 'completed';

    protected $table = 'course_lesson_progress';

    protected $fillable = [
        'enrollment_id',
        'lesson_id',
        'status',
        'video_progress_seconds',
        'completion_percentage',
        'started_at',
        'completed_at',
    ];

    protected $casts = [
        'video_progress_seconds' => 'integer',
        'completion_percentage' => 'integer',
        'started_at' => 'datetime',
        'completed_at' => 'datetime',
    ];

    public static function statusesList(): array
    {
        return [
            self::STATUS_NOT_STARTED => 'Not Started',
            self::STATUS_IN_PROGRESS => 'In Progress',
            self::STATUS_COMPLETED => 'Completed',
        ];
    }

    /**
     * Get the enrollment this progress belongs to
     */
    public function enrollment()
    {
        return $this->belongsTo(CourseEnrollment::class, 'enrollment_id');
    }

    /**
     * Get the lesson this progress is for
     */
    public function lesson()
    {
        return $this->belongsTo(CourseLesson::class, 'lesson_id');
    }

    /**
     * Check if lesson is not started
     */
    public function isNotStarted(): bool
    {
        return $this->status === self::STATUS_NOT_STARTED;
    }

    /**
     * Check if lesson is in progress
     */
    public function isInProgress(): bool
    {
        return $this->status === self::STATUS_IN_PROGRESS;
    }

    /**
     * Check if lesson is completed
     */
    public function isCompleted(): bool
    {
        return $this->status === self::STATUS_COMPLETED;
    }

    /**
     * Mark lesson as started
     */
    public function markAsStarted(): void
    {
        if ($this->isNotStarted()) {
            $this->update([
                'status' => self::STATUS_IN_PROGRESS,
                'started_at' => now(),
            ]);
        }
    }

    /**
     * Mark lesson as completed
     */
    public function markAsCompleted(): void
    {
        $this->update([
            'status' => self::STATUS_COMPLETED,
            'completion_percentage' => 100,
            'completed_at' => now(),
        ]);
    }

    /**
     * Update video progress
     */
    public function updateVideoProgress(int $seconds): void
    {
        $this->markAsStarted();
        $this->update([
            'video_progress_seconds' => $seconds,
        ]);
    }

    /**
     * Update completion percentage
     */
    public function updateCompletionPercentage(int $percentage): void
    {
        $this->markAsStarted();

        $this->update([
            'completion_percentage' => min(100, max(0, $percentage)),
        ]);

        if ($percentage >= 100) {
            $this->markAsCompleted();
        }
    }

    /**
     * Get formatted progress percentage
     */
    public function getFormattedProgressAttribute(): string
    {
        return $this->completion_percentage . '%';
    }

    /**
     * Get time spent on lesson
     */
    public function getTimeSpentAttribute(): ?int
    {
        if ($this->started_at === null) {
            return null;
        }

        $endTime = $this->completed_at ?? now();
        return $this->started_at->diffInSeconds($endTime);
    }
}