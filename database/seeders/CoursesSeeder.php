<?php

namespace Database\Seeders;

use App\Entity\Course\Course;
use App\Entity\Course\CourseCategory;
use App\Entity\Tag\Tag;
use App\Entity\User\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CoursesSeeder extends Seeder
{
    public function run(): void
    {
        // Create tags first
        $tags = [
            ['name_uk' => 'Початківці', 'name_en' => 'Beginners', 'slug' => 'beginners'],
            ['name_uk' => 'Веб-розробка', 'name_en' => 'Web Development', 'slug' => 'web-development'],
            ['name_uk' => 'PHP', 'name_en' => 'PHP', 'slug' => 'php'],
            ['name_uk' => 'Laravel', 'name_en' => 'Laravel', 'slug' => 'laravel'],
            ['name_uk' => 'JavaScript', 'name_en' => 'JavaScript', 'slug' => 'javascript'],
            ['name_uk' => 'React', 'name_en' => 'React', 'slug' => 'react'],
            ['name_uk' => 'Vue.js', 'name_en' => 'Vue.js', 'slug' => 'vuejs'],
            ['name_uk' => 'Database', 'name_en' => 'Database', 'slug' => 'database'],
            ['name_uk' => 'MySQL', 'name_en' => 'MySQL', 'slug' => 'mysql'],
            ['name_uk' => 'Docker', 'name_en' => 'Docker', 'slug' => 'docker'],
        ];

        foreach ($tags as $tagData) {
            Tag::create($tagData);
        }

        // Create course categories
        $webDev = CourseCategory::create([
            'name_uk' => 'Веб-розробка',
            'name_en' => 'Web Development',
            'slug' => 'web-development',
            'description_uk' => 'Курси з веб-розробки',
            'description_en' => 'Web development courses',
            'sort_order' => 1,
        ]);

        $backend = CourseCategory::create([
            'name_uk' => 'Backend',
            'name_en' => 'Backend',
            'slug' => 'backend',
            'description_uk' => 'Backend розробка',
            'description_en' => 'Backend development',
            'sort_order' => 1,
            'parent_id' => $webDev->id,
        ]);

        $frontend = CourseCategory::create([
            'name_uk' => 'Frontend',
            'name_en' => 'Frontend',
            'slug' => 'frontend',
            'description_uk' => 'Frontend розробка',
            'description_en' => 'Frontend development',
            'sort_order' => 2,
            'parent_id' => $webDev->id,
        ]);

        // Create instructors
        $instructor1 = User::factory()->create([
            'name' => 'John',
            'last_name' => 'Smith',
            'email' => 'instructor1@example.com',
            'password' => bcrypt('password'),
            'role' => User::ROLE_INSTRUCTOR,
            'status' => User::STATUS_ACTIVE,
            'verify_token' => null,
            'phone_verified' => true,
        ]);

        $instructor2 = User::factory()->create([
            'name' => 'Jane',
            'last_name' => 'Doe',
            'email' => 'instructor2@example.com',
            'password' => bcrypt('password'),
            'role' => User::ROLE_INSTRUCTOR,
            'status' => User::STATUS_ACTIVE,
            'verify_token' => null,
            'phone_verified' => true,
        ]);

        // Create students
        for ($i = 1; $i <= 5; $i++) {
            User::factory()->create([
                'name' => "Student{$i}",
                'last_name' => 'User',
                'email' => "student{$i}@example.com",
                'password' => bcrypt('password'),
                'role' => User::ROLE_STUDENT,
                'status' => User::STATUS_ACTIVE,
                'verify_token' => null,
                'phone_verified' => true,
            ]);
        }

        // Create courses
        $course1 = Course::create([
            'instructor_id' => $instructor1->id,
            'category_id' => $backend->id,
            'title_uk' => 'Laravel для початківців',
            'title_en' => 'Laravel for Beginners',
            'slug' => 'laravel-for-beginners',
            'short_description_uk' => 'Вивчіть основи Laravel з нуля',
            'short_description_en' => 'Learn Laravel basics from scratch',
            'description_uk' => 'Повний курс Laravel для початківців. Ви навчитесь створювати веб-додатки на PHP.',
            'description_en' => 'Complete Laravel course for beginners. You will learn to build web applications with PHP.',
            'level' => Course::LEVEL_BEGINNER,
            'language' => Course::LANGUAGE_BOTH,
            'price' => 1999.00,
            'duration_minutes' => 1200,
            'is_published' => true,
            'published_at' => now()->subDays(10),
        ]);
        $course1->syncTags([1, 2, 3, 4]); // beginners, web-dev, php, laravel

        $course2 = Course::create([
            'instructor_id' => $instructor2->id,
            'category_id' => $frontend->id,
            'title_uk' => 'React.js - Сучасна фронтенд розробка',
            'title_en' => 'React.js - Modern Frontend Development',
            'slug' => 'react-modern-frontend',
            'short_description_uk' => 'Освойте React.js та створюйте інтерактивні інтерфейси',
            'short_description_en' => 'Master React.js and build interactive interfaces',
            'description_uk' => 'Комплексний курс по React.js з практичними прикладами.',
            'description_en' => 'Comprehensive React.js course with practical examples.',
            'level' => Course::LEVEL_INTERMEDIATE,
            'language' => Course::LANGUAGE_EN,
            'price' => 2499.00,
            'duration_minutes' => 1800,
            'is_published' => true,
            'published_at' => now()->subDays(5),
        ]);
        $course2->syncTags([2, 5, 6]); // web-dev, javascript, react

        $course3 = Course::create([
            'instructor_id' => $instructor1->id,
            'category_id' => $backend->id,
            'title_uk' => 'Безкоштовний вступ до PHP',
            'title_en' => 'Free Introduction to PHP',
            'slug' => 'free-php-intro',
            'short_description_uk' => 'Безкоштовний курс для знайомства з PHP',
            'short_description_en' => 'Free course to get started with PHP',
            'description_uk' => 'Почніть своє навчання PHP з цього безкоштовного курсу.',
            'description_en' => 'Start your PHP learning journey with this free course.',
            'level' => Course::LEVEL_BEGINNER,
            'language' => Course::LANGUAGE_UK,
            'price' => null, // free
            'duration_minutes' => 300,
            'is_published' => true,
            'published_at' => now()->subDays(15),
        ]);
        $course3->syncTags([1, 2, 3]); // beginners, web-dev, php

        $course4 = Course::create([
            'instructor_id' => $instructor2->id,
            'category_id' => $backend->id,
            'title_uk' => 'Docker для розробників (чернетка)',
            'title_en' => 'Docker for Developers (Draft)',
            'slug' => 'docker-for-developers',
            'short_description_uk' => 'Курс в розробці',
            'short_description_en' => 'Course in development',
            'description_uk' => 'Цей курс ще не опубліковано.',
            'description_en' => 'This course is not yet published.',
            'level' => Course::LEVEL_INTERMEDIATE,
            'language' => Course::LANGUAGE_BOTH,
            'price' => 1799.00,
            'duration_minutes' => 900,
            'is_published' => false,
            'published_at' => null,
        ]);
        $course4->syncTags([2, 10]); // web-dev, docker

        // Enroll students in courses
        $students = User::where('role', User::ROLE_STUDENT)->get();

        // Course 1 - 3 students enrolled
        $course1->enroll($students[0]->id, 1999.00, 'card', 'tx_' . Str::random(10));
        $course1->enroll($students[1]->id, 1999.00, 'card', 'tx_' . Str::random(10));
        $course1->enroll($students[2]->id);

        // Update progress for first student
        $enrollment = $students[0]->enrollments()->where('course_id', $course1->id)->first();
        $enrollment->updateProgress(45);

        // Course 2 - 2 students enrolled
        $course2->enroll($students[0]->id, 2499.00, 'paypal', 'tx_' . Str::random(10));
        $course2->enroll($students[3]->id, 2499.00, 'card', 'tx_' . Str::random(10));

        // Course 3 (free) - 5 students enrolled
        foreach ($students as $student) {
            $course3->enroll($student->id);
        }

        // Mark one as completed
        $enrollment = $students[1]->enrollments()->where('course_id', $course3->id)->first();
        $enrollment->updateProgress(100);
    }
}