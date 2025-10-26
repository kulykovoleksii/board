<?php

namespace App\Entity\Course;

use App\Entity\User\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property int $student_id
 * @property int $course_id
 * @property Carbon $enrolled_at
 * @property Carbon|null $completed_at
 * @property Carbon|null $last_accessed_at
 * @property int $progress_percentage
 * @property string $status
 * @property float|null $paid_amount
 * @property string|null $payment_method
 * @property string|null $payment_transaction_id
 * @property string|null $certificate_url
 * @property Carbon|null $certificate_issued_at
 * @property Carbon $created_at
 * @property Carbon $updated_at
 *
 * @property User $student
 * @property Course $course
 * @property CourseLessonProgress[] $lessonProgress
 */
class CourseEnrollment extends Model
{
    use HasFactory;

    public const STATUS_ENROLLED = 'enrolled';
    public const STATUS_IN_PROGRESS = 'in_progress';
    public const STATUS_COMPLETED = 'completed';
    public const STATUS_DROPPED = 'dropped';

    protected $fillable = [
        'student_id',
        'course_id',
        'enrolled_at',
        'completed_at',
        'last_accessed_at',
        'progress_percentage',
        'status',
        'paid_amount',
        'payment_method',
        'payment_transaction_id',
        'certificate_url',
        'certificate_issued_at',
    ];

    protected $casts = [
        'enrolled_at' => 'datetime',
        'completed_at' => 'datetime',
        'last_accessed_at' => 'datetime',
        'progress_percentage' => 'integer',
        'paid_amount' => 'decimal:2',
        'certificate_issued_at' => 'datetime',
    ];

    public static function statusesList(): array
    {
        return [
            self::STATUS_ENROLLED => 'Enrolled',
            self::STATUS_IN_PROGRESS => 'In Progress',
            self::STATUS_COMPLETED => 'Completed',
            self::STATUS_DROPPED => 'Dropped',
        ];
    }

    /**
     * Check if enrollment is active
     */
    public function isActive(): bool
    {
        return in_array($this->status, [self::STATUS_ENROLLED, self::STATUS_IN_PROGRESS]);
    }

    /**
     * Check if course is completed
     */
    public function isCompleted(): bool
    {
        return $this->status === self::STATUS_COMPLETED;
    }

    /**
     * Check if enrollment is dropped
     */
    public function isDropped(): bool
    {
        return $this->status === self::STATUS_DROPPED;
    }

    /**
     * Mark as in progress
     */
    public function markInProgress(): void
    {
        if ($this->status === self::STATUS_ENROLLED) {
            $this->update([
                'status' => self::STATUS_IN_PROGRESS,
                'last_accessed_at' => now(),
            ]);
        }
    }

    /**
     * Mark as completed
     */
    public function markCompleted(): void
    {
        if ($this->isActive()) {
            $this->update([
                'status' => self::STATUS_COMPLETED,
                'completed_at' => now(),
                'progress_percentage' => 100,
            ]);
        }
    }

    /**
     * Drop enrollment
     */
    public function drop(): void
    {
        if ($this->isActive()) {
            $this->update([
                'status' => self::STATUS_DROPPED,
            ]);
        }
    }

    /**
     * Update progress
     */
    public function updateProgress(int $percentage): void
    {
        $this->update([
            'progress_percentage' => min(100, max(0, $percentage)),
            'last_accessed_at' => now(),
        ]);

        if ($percentage >= 100 && $this->isActive()) {
            $this->markCompleted();
        } elseif ($percentage > 0 && $this->status === self::STATUS_ENROLLED) {
            $this->markInProgress();
        }
    }

    /**
     * Record payment
     */
    public function recordPayment(float $amount, string $method, string $transactionId): void
    {
        $this->update([
            'paid_amount' => $amount,
            'payment_method' => $method,
            'payment_transaction_id' => $transactionId,
        ]);
    }

    /**
     * Issue certificate
     */
    public function issueCertificate(string $url): void
    {
        if ($this->isCompleted()) {
            $this->update([
                'certificate_url' => $url,
                'certificate_issued_at' => now(),
            ]);
        }
    }

    /**
     * Update last accessed timestamp
     */
    public function touch($attribute = null): bool
    {
        $this->last_accessed_at = now();
        return parent::touch($attribute);
    }

    /**
     * Get student
     */
    public function student()
    {
        return $this->belongsTo(User::class, 'student_id');
    }

    /**
     * Get course
     */
    public function course()
    {
        return $this->belongsTo(Course::class, 'course_id');
    }

    /**
     * Get lesson progress records for this enrollment
     */
    public function lessonProgress()
    {
        return $this->hasMany(CourseLessonProgress::class, 'enrollment_id');
    }

    /**
     * Get progress for a specific lesson
     */
    public function getProgressForLesson(int $lessonId): ?CourseLessonProgress
    {
        return $this->lessonProgress()
            ->where('lesson_id', $lessonId)
            ->first();
    }

    /**
     * Calculate overall progress based on completed lessons
     */
    public function recalculateProgress(): void
    {
        $totalLessons = $this->course->modules()
            ->with('lessons')
            ->get()
            ->sum(function ($module) {
                return $module->lessons->count();
            });

        if ($totalLessons === 0) {
            return;
        }

        $completedLessons = $this->lessonProgress()
            ->where('status', CourseLessonProgress::STATUS_COMPLETED)
            ->count();

        $percentage = (int) round(($completedLessons / $totalLessons) * 100);
        $this->updateProgress($percentage);
    }

    /**
     * Scope to get active enrollments
     */
    public function scopeActive(Builder $query): Builder
    {
        return $query->whereIn('status', [self::STATUS_ENROLLED, self::STATUS_IN_PROGRESS]);
    }

    /**
     * Scope to get completed enrollments
     */
    public function scopeCompleted(Builder $query): Builder
    {
        return $query->where('status', self::STATUS_COMPLETED);
    }

    /**
     * Scope to filter by student
     */
    public function scopeByStudent(Builder $query, int $studentId): Builder
    {
        return $query->where('student_id', $studentId);
    }

    /**
     * Scope to filter by course
     */
    public function scopeByCourse(Builder $query, int $courseId): Builder
    {
        return $query->where('course_id', $courseId);
    }

    /**
     * Scope to get enrollments with certificate
     */
    public function scopeWithCertificate(Builder $query): Builder
    {
        return $query->whereNotNull('certificate_url');
    }
}