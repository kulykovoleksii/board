<?php

namespace App\Entity\Course;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property int $lesson_id
 * @property string $type
 * @property int $position
 * @property string|null $content_uk
 * @property string|null $content_en
 * @property string|null $file_path
 * @property string|null $file_url
 * @property string|null $thumbnail
 * @property int|null $duration_seconds
 * @property string|null $file_name
 * @property int|null $file_size
 * @property string|null $mime_type
 * @property Carbon $created_at
 * @property Carbon $updated_at
 *
 * @property CourseLesson $lesson
 */
class CourseLessonContent extends Model
{
    use HasFactory;

    public const TYPE_TEXT = 'text';
    public const TYPE_VIDEO = 'video';
    public const TYPE_IMAGE = 'image';
    public const TYPE_FILE = 'file';
    public const TYPE_QUIZ = 'quiz';
    public const TYPE_MARKDOWN_FILE = 'markdown_file';

    protected $fillable = [
        'lesson_id',
        'type',
        'position',
        'content_uk',
        'content_en',
        'file_path',
        'file_url',
        'thumbnail',
        'duration_seconds',
        'file_name',
        'file_size',
        'mime_type',
    ];

    protected $casts = [
        'position' => 'integer',
        'duration_seconds' => 'integer',
        'file_size' => 'integer',
    ];

    public static function typesList(): array
    {
        return [
            self::TYPE_TEXT => 'Text',
            self::TYPE_VIDEO => 'Video',
            self::TYPE_IMAGE => 'Image',
            self::TYPE_FILE => 'File',
            self::TYPE_QUIZ => 'Quiz',
            self::TYPE_MARKDOWN_FILE => 'Markdown File',
        ];
    }

    /**
     * Get localized content based on current locale
     */
    public function getContentAttribute(): ?string
    {
        $locale = app()->getLocale();
        return $this->{"content_{$locale}"} ?? $this->content_en;
    }

    /**
     * Get the lesson this content belongs to
     */
    public function lesson()
    {
        return $this->belongsTo(CourseLesson::class, 'lesson_id');
    }

    /**
     * Check if content is text
     */
    public function isText(): bool
    {
        return $this->type === self::TYPE_TEXT;
    }

    /**
     * Check if content is video
     */
    public function isVideo(): bool
    {
        return $this->type === self::TYPE_VIDEO;
    }

    /**
     * Check if content is image
     */
    public function isImage(): bool
    {
        return $this->type === self::TYPE_IMAGE;
    }

    /**
     * Check if content is file
     */
    public function isFile(): bool
    {
        return $this->type === self::TYPE_FILE;
    }

    /**
     * Check if content is quiz
     */
    public function isQuiz(): bool
    {
        return $this->type === self::TYPE_QUIZ;
    }

    /**
     * Check if content is markdown file
     */
    public function isMarkdownFile(): bool
    {
        return $this->type === self::TYPE_MARKDOWN_FILE;
    }

    /**
     * Check if content has external URL (YouTube, Vimeo, etc.)
     */
    public function hasExternalUrl(): bool
    {
        return !empty($this->file_url);
    }

    /**
     * Get markdown file content
     */
    public function getMarkdownContent(?string $locale = null): ?string
    {
        if (!$this->isMarkdownFile() || !$this->file_path) {
            return null;
        }

        $locale = $locale ?? app()->getLocale();
        $filePath = storage_path('app/' . $this->file_path);

        // Try locale-specific file first (e.g., lesson-1.uk.md)
        $localeFilePath = str_replace('.md', ".{$locale}.md", $filePath);

        if (file_exists($localeFilePath)) {
            return file_get_contents($localeFilePath);
        }

        // Fallback to main file
        if (file_exists($filePath)) {
            return file_get_contents($filePath);
        }

        return null;
    }

    /**
     * Save markdown file content
     */
    public function saveMarkdownContent(string $content, ?string $locale = null): bool
    {
        if (!$this->isMarkdownFile()) {
            return false;
        }

        $locale = $locale ?? app()->getLocale();

        // Generate file path if not exists
        if (!$this->file_path) {
            $lesson = $this->lesson;
            $module = $lesson->module;
            $course = $module->course;

            $courseSlug = \Illuminate\Support\Str::slug($course->slug);
            $fileName = 'lesson-' . $lesson->id . '.md';

            $this->file_path = "courses/{$courseSlug}/{$fileName}";
        }

        $filePath = storage_path('app/' . $this->file_path);
        $localeFilePath = str_replace('.md', ".{$locale}.md", $filePath);

        // Create directory if not exists
        $directory = dirname($localeFilePath);
        if (!is_dir($directory)) {
            mkdir($directory, 0755, true);
        }

        // Save file
        $saved = file_put_contents($localeFilePath, $content) !== false;

        if ($saved) {
            $this->file_size = strlen($content);
            $this->save();
        }

        return $saved;
    }

    /**
     * Get formatted file size
     */
    public function getFormattedFileSizeAttribute(): ?string
    {
        if ($this->file_size === null) {
            return null;
        }

        $units = ['B', 'KB', 'MB', 'GB'];
        $bytes = $this->file_size;
        $i = 0;

        while ($bytes >= 1024 && $i < count($units) - 1) {
            $bytes /= 1024;
            $i++;
        }

        return round($bytes, 2) . ' ' . $units[$i];
    }

    /**
     * Get formatted duration
     */
    public function getFormattedDurationAttribute(): ?string
    {
        if ($this->duration_seconds === null) {
            return null;
        }

        $minutes = floor($this->duration_seconds / 60);
        $seconds = $this->duration_seconds % 60;

        return sprintf('%d:%02d', $minutes, $seconds);
    }
}