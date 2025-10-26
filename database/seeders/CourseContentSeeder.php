<?php

namespace Database\Seeders;

use App\Entity\Course\Course;
use App\Entity\Course\CourseCategory;
use App\Entity\Course\CourseLesson;
use App\Entity\Course\CourseLessonContent;
use App\Entity\Course\CourseModule;
use App\Entity\User\User;
use Illuminate\Database\Seeder;

class CourseContentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get or create instructor
        $instructor = User::where('email', 'admin@example.com')->first();
        if (!$instructor) {
            $instructor = User::first();
        }

        // Get or create categories
        $programmingCategory = CourseCategory::firstOrCreate(
            ['slug' => 'programming'],
            [
                'name_uk' => 'Програмування',
                'name_en' => 'Programming',
                'description_uk' => 'Курси з програмування',
                'description_en' => 'Programming courses',
            ]
        );

        $databaseCategory = CourseCategory::firstOrCreate(
            ['slug' => 'databases'],
            [
                'name_uk' => 'Бази даних',
                'name_en' => 'Databases',
                'description_uk' => 'Курси з баз даних',
                'description_en' => 'Database courses',
            ]
        );

        $hobbiesCategory = CourseCategory::firstOrCreate(
            ['slug' => 'hobbies'],
            [
                'name_uk' => 'Хобі',
                'name_en' => 'Hobbies',
                'description_uk' => 'Курси для хобі та творчості',
                'description_en' => 'Hobby and creativity courses',
            ]
        );

        // Create Python course
        $this->createPythonCourse($instructor, $programmingCategory);

        // Create MySQL course
        $this->createMySQLCourse($instructor, $databaseCategory);

        // Create JavaScript course
        $this->createJavaScriptCourse($instructor, $programmingCategory);

        // Create Knitting course
        $this->createKnittingCourse($instructor, $hobbiesCategory);

        $this->command->info('Course content seeded successfully!');
    }

    private function createPythonCourse(User $instructor, CourseCategory $category): void
    {
        $course = Course::create([
            'instructor_id' => $instructor->id,
            'category_id' => $category->id,
            'title_uk' => 'Основи Python',
            'title_en' => 'Python Fundamentals',
            'slug' => 'python-fundamentals',
            'short_description_uk' => 'Вивчіть основи програмування на Python з нуля',
            'short_description_en' => 'Learn Python programming from scratch',
            'description_uk' => 'Комплексний курс для вивчення Python. Ви навчитесь основним концепціям програмування, роботі з даними та створенню власних програм.',
            'description_en' => 'Comprehensive course for learning Python. You will learn core programming concepts, data manipulation, and building your own programs.',
            'level' => Course::LEVEL_BEGINNER,
            'language' => Course::LANGUAGE_BOTH,
            'price' => 999.00,
            'duration_minutes' => 0,
            'is_published' => true,
            'published_at' => now(),
        ]);

        // Module 1: Introduction
        $module1 = CourseModule::create([
            'course_id' => $course->id,
            'title_uk' => 'Вступ до Python',
            'title_en' => 'Introduction to Python',
            'description_uk' => 'Знайомство з Python та налаштування середовища розробки',
            'description_en' => 'Getting started with Python and setting up your development environment',
            'position' => 1,
            'duration_minutes' => 45,
            'is_published' => true,
        ]);

        $lesson1 = CourseLesson::create([
            'module_id' => $module1->id,
            'title_uk' => 'Що таке Python?',
            'title_en' => 'What is Python?',
            'description_uk' => 'Огляд мови програмування Python',
            'description_en' => 'Overview of Python programming language',
            'position' => 1,
            'duration_minutes' => 15,
            'is_published' => true,
            'is_free' => true,
        ]);

        CourseLessonContent::create([
            'lesson_id' => $lesson1->id,
            'type' => CourseLessonContent::TYPE_VIDEO,
            'position' => 1,
            'file_url' => 'https://www.youtube.com/watch?v=kqtD5dpn9C8',
            'thumbnail' => 'https://img.youtube.com/vi/kqtD5dpn9C8/maxresdefault.jpg',
            'duration_seconds' => 600,
        ]);

        CourseLessonContent::create([
            'lesson_id' => $lesson1->id,
            'type' => CourseLessonContent::TYPE_TEXT,
            'position' => 2,
            'content_uk' => "# Що таке Python?\n\nPython - це високорівнева мова програмування, яка відома своєю простотою та читабельністю. Створена Гвідо ван Россумом у 1991 році.\n\n## Переваги Python:\n- Легкий для вивчення\n- Великий вибір бібліотек\n- Підтримка спільноти\n- Використовується в веб-розробці, data science, AI",
            'content_en' => "# What is Python?\n\nPython is a high-level programming language known for its simplicity and readability. Created by Guido van Rossum in 1991.\n\n## Advantages of Python:\n- Easy to learn\n- Rich library ecosystem\n- Strong community support\n- Used in web development, data science, AI",
        ]);

        $lesson2 = CourseLesson::create([
            'module_id' => $module1->id,
            'title_uk' => 'Встановлення Python',
            'title_en' => 'Installing Python',
            'description_uk' => 'Як встановити Python на вашому комп\'ютері',
            'description_en' => 'How to install Python on your computer',
            'position' => 2,
            'duration_minutes' => 20,
            'is_published' => true,
            'is_free' => false,
        ]);

        CourseLessonContent::create([
            'lesson_id' => $lesson2->id,
            'type' => CourseLessonContent::TYPE_TEXT,
            'position' => 1,
            'content_uk' => "# Встановлення Python\n\nЗавантажте Python з офіційного сайту python.org\n\n## Кроки:\n1. Відкрийте python.org\n2. Завантажте останню версію\n3. Запустіть інсталятор\n4. Не забудьте поставити галочку \"Add Python to PATH\"",
            'content_en' => "# Installing Python\n\nDownload Python from the official website python.org\n\n## Steps:\n1. Go to python.org\n2. Download the latest version\n3. Run the installer\n4. Make sure to check \"Add Python to PATH\"",
        ]);

        // Module 2: Basics
        $module2 = CourseModule::create([
            'course_id' => $course->id,
            'title_uk' => 'Основи синтаксису',
            'title_en' => 'Syntax Basics',
            'description_uk' => 'Вивчення базового синтаксису Python',
            'description_en' => 'Learning basic Python syntax',
            'position' => 2,
            'duration_minutes' => 90,
            'is_published' => true,
        ]);

        $lesson3 = CourseLesson::create([
            'module_id' => $module2->id,
            'title_uk' => 'Змінні та типи даних',
            'title_en' => 'Variables and Data Types',
            'description_uk' => 'Робота зі змінними та типами даних',
            'description_en' => 'Working with variables and data types',
            'position' => 1,
            'duration_minutes' => 30,
            'is_published' => true,
            'is_free' => false,
        ]);

        CourseLessonContent::create([
            'lesson_id' => $lesson3->id,
            'type' => CourseLessonContent::TYPE_TEXT,
            'position' => 1,
            'content_uk' => "# Змінні та типи даних\n\n```python\n# Числа\nage = 25\nprice = 99.99\n\n# Рядки\nname = 'Іван'\ngreeting = \"Привіт!\"\n\n# Булеві значення\nis_student = True\nhas_account = False\n```",
            'content_en' => "# Variables and Data Types\n\n```python\n# Numbers\nage = 25\nprice = 99.99\n\n# Strings\nname = 'John'\ngreeting = \"Hello!\"\n\n# Booleans\nis_student = True\nhas_account = False\n```",
        ]);
    }

    private function createMySQLCourse(User $instructor, CourseCategory $category): void
    {
        $course = Course::create([
            'instructor_id' => $instructor->id,
            'category_id' => $category->id,
            'title_uk' => 'MySQL для початківців',
            'title_en' => 'MySQL for Beginners',
            'slug' => 'mysql-for-beginners',
            'short_description_uk' => 'Освойте основи роботи з базами даних MySQL',
            'short_description_en' => 'Master the basics of MySQL databases',
            'description_uk' => 'Навчіться працювати з реляційними базами даних, писати SQL-запити та оптимізувати продуктивність.',
            'description_en' => 'Learn to work with relational databases, write SQL queries, and optimize performance.',
            'level' => Course::LEVEL_BEGINNER,
            'language' => Course::LANGUAGE_BOTH,
            'price' => 799.00,
            'duration_minutes' => 0,
            'is_published' => true,
            'published_at' => now(),
        ]);

        $module1 = CourseModule::create([
            'course_id' => $course->id,
            'title_uk' => 'Вступ до баз даних',
            'title_en' => 'Introduction to Databases',
            'description_uk' => 'Що таке бази даних та навіщо вони потрібні',
            'description_en' => 'What are databases and why we need them',
            'position' => 1,
            'duration_minutes' => 60,
            'is_published' => true,
        ]);

        $lesson1 = CourseLesson::create([
            'module_id' => $module1->id,
            'title_uk' => 'Основи SQL',
            'title_en' => 'SQL Basics',
            'description_uk' => 'Перші кроки з SQL',
            'description_en' => 'First steps with SQL',
            'position' => 1,
            'duration_minutes' => 30,
            'is_published' => true,
            'is_free' => true,
        ]);

        CourseLessonContent::create([
            'lesson_id' => $lesson1->id,
            'type' => CourseLessonContent::TYPE_TEXT,
            'position' => 1,
            'content_uk' => "# Основи SQL\n\nSQL (Structured Query Language) - мова для роботи з базами даних.\n\n## Основні команди:\n```sql\nSELECT * FROM users;\nINSERT INTO users (name, email) VALUES ('Іван', 'ivan@example.com');\nUPDATE users SET email = 'new@example.com' WHERE id = 1;\nDELETE FROM users WHERE id = 1;\n```",
            'content_en' => "# SQL Basics\n\nSQL (Structured Query Language) - language for working with databases.\n\n## Basic commands:\n```sql\nSELECT * FROM users;\nINSERT INTO users (name, email) VALUES ('John', 'john@example.com');\nUPDATE users SET email = 'new@example.com' WHERE id = 1;\nDELETE FROM users WHERE id = 1;\n```",
        ]);
    }

    private function createJavaScriptCourse(User $instructor, CourseCategory $category): void
    {
        $course = Course::create([
            'instructor_id' => $instructor->id,
            'category_id' => $category->id,
            'title_uk' => 'JavaScript з нуля',
            'title_en' => 'JavaScript from Scratch',
            'slug' => 'javascript-from-scratch',
            'short_description_uk' => 'Повний курс JavaScript для веб-розробки',
            'short_description_en' => 'Complete JavaScript course for web development',
            'description_uk' => 'Вивчіть JavaScript і станьте веб-розробником. Від базових концепцій до сучасних фреймворків.',
            'description_en' => 'Learn JavaScript and become a web developer. From basic concepts to modern frameworks.',
            'level' => Course::LEVEL_BEGINNER,
            'language' => Course::LANGUAGE_BOTH,
            'price' => 1299.00,
            'duration_minutes' => 0,
            'is_published' => true,
            'published_at' => now(),
        ]);

        $module1 = CourseModule::create([
            'course_id' => $course->id,
            'title_uk' => 'Основи JavaScript',
            'title_en' => 'JavaScript Fundamentals',
            'description_uk' => 'Базові концепції мови JavaScript',
            'description_en' => 'Basic JavaScript language concepts',
            'position' => 1,
            'duration_minutes' => 120,
            'is_published' => true,
        ]);

        $lesson1 = CourseLesson::create([
            'module_id' => $module1->id,
            'title_uk' => 'Змінні та константи',
            'title_en' => 'Variables and Constants',
            'description_uk' => 'Робота зі змінними в JavaScript',
            'description_en' => 'Working with variables in JavaScript',
            'position' => 1,
            'duration_minutes' => 25,
            'is_published' => true,
            'is_free' => true,
        ]);

        CourseLessonContent::create([
            'lesson_id' => $lesson1->id,
            'type' => CourseLessonContent::TYPE_TEXT,
            'position' => 1,
            'content_uk' => "# Змінні та константи\n\n```javascript\n// Змінні\nlet name = 'Олексій';\nlet age = 30;\n\n// Константи\nconst PI = 3.14159;\nconst API_URL = 'https://api.example.com';\n\n// var (застаріле)\nvar oldWay = 'не використовуйте';\n```",
            'content_en' => "# Variables and Constants\n\n```javascript\n// Variables\nlet name = 'Alex';\nlet age = 30;\n\n// Constants\nconst PI = 3.14159;\nconst API_URL = 'https://api.example.com';\n\n// var (deprecated)\nvar oldWay = 'do not use';\n```",
        ]);
    }

    private function createKnittingCourse(User $instructor, CourseCategory $category): void
    {
        $course = Course::create([
            'instructor_id' => $instructor->id,
            'category_id' => $category->id,
            'title_uk' => 'В\'язання для початківців',
            'title_en' => 'Knitting for Beginners',
            'slug' => 'knitting-for-beginners',
            'short_description_uk' => 'Навчіться в\'язати красиві речі власними руками',
            'short_description_en' => 'Learn to knit beautiful things with your own hands',
            'description_uk' => 'Повний курс в\'язання від базових петель до складних візерунків. Створюйте унікальні речі для себе та близьких.',
            'description_en' => 'Complete knitting course from basic stitches to complex patterns. Create unique items for yourself and loved ones.',
            'level' => Course::LEVEL_BEGINNER,
            'language' => Course::LANGUAGE_BOTH,
            'price' => null,
            'duration_minutes' => 0,
            'is_published' => true,
            'published_at' => now(),
        ]);

        $module1 = CourseModule::create([
            'course_id' => $course->id,
            'title_uk' => 'Перші кроки',
            'title_en' => 'First Steps',
            'description_uk' => 'Знайомство з інструментами та базовими техніками',
            'description_en' => 'Introduction to tools and basic techniques',
            'position' => 1,
            'duration_minutes' => 90,
            'is_published' => true,
        ]);

        $lesson1 = CourseLesson::create([
            'module_id' => $module1->id,
            'title_uk' => 'Вибір спиць та пряжі',
            'title_en' => 'Choosing Needles and Yarn',
            'description_uk' => 'Як вибрати правильні інструменти',
            'description_en' => 'How to choose the right tools',
            'position' => 1,
            'duration_minutes' => 20,
            'is_published' => true,
            'is_free' => true,
        ]);

        CourseLessonContent::create([
            'lesson_id' => $lesson1->id,
            'type' => CourseLessonContent::TYPE_TEXT,
            'position' => 1,
            'content_uk' => "# Вибір спиць та пряжі\n\n## Типи спиць:\n- **Прямі спиці** - для плоского в'язання\n- **Кругові спиці** - для в'язання по колу\n- **Чулкові спиці** - для дрібних виробів\n\n## Вибір пряжі:\n- Товщина нитки\n- Склад (вовна, бавовна, акрил)\n- Колір та текстура",
            'content_en' => "# Choosing Needles and Yarn\n\n## Types of needles:\n- **Straight needles** - for flat knitting\n- **Circular needles** - for knitting in the round\n- **Double-pointed needles** - for small items\n\n## Choosing yarn:\n- Thread thickness\n- Composition (wool, cotton, acrylic)\n- Color and texture",
        ]);

        CourseLessonContent::create([
            'lesson_id' => $lesson1->id,
            'type' => CourseLessonContent::TYPE_IMAGE,
            'position' => 2,
            'file_url' => 'https://images.unsplash.com/photo-1584473457494-f8539c8e0ca6',
            'thumbnail' => 'https://images.unsplash.com/photo-1584473457494-f8539c8e0ca6?w=400',
            'content_uk' => 'Різні типи спиць для в\'язання',
            'content_en' => 'Different types of knitting needles',
        ]);

        $lesson2 = CourseLesson::create([
            'module_id' => $module1->id,
            'title_uk' => 'Базові петлі',
            'title_en' => 'Basic Stitches',
            'description_uk' => 'Навчіться в\'язати основні петлі',
            'description_en' => 'Learn to knit basic stitches',
            'position' => 2,
            'duration_minutes' => 35,
            'is_published' => true,
            'is_free' => true,
        ]);

        CourseLessonContent::create([
            'lesson_id' => $lesson2->id,
            'type' => CourseLessonContent::TYPE_VIDEO,
            'position' => 1,
            'file_url' => 'https://www.youtube.com/watch?v=p_R1UDsNOMk',
            'thumbnail' => 'https://img.youtube.com/vi/p_R1UDsNOMk/maxresdefault.jpg',
            'duration_seconds' => 780,
        ]);

        CourseLessonContent::create([
            'lesson_id' => $lesson2->id,
            'type' => CourseLessonContent::TYPE_TEXT,
            'position' => 2,
            'content_uk' => "# Базові петлі\n\n## Лицьова петля\nОснова більшості візерунків. Спиця вводиться справа наліво.\n\n## Виворотна петля\nСтворює рельєфну текстуру. Спиця вводиться зліва направо.\n\n## Практика\nСпробуйте зв'язати зразок 10x10 см лицьовими петлями.",
            'content_en' => "# Basic Stitches\n\n## Knit Stitch\nThe foundation of most patterns. Needle is inserted from right to left.\n\n## Purl Stitch\nCreates a textured surface. Needle is inserted from left to right.\n\n## Practice\nTry to knit a 10x10 cm sample with knit stitches.",
        ]);

        CourseLessonContent::create([
            'lesson_id' => $lesson2->id,
            'type' => CourseLessonContent::TYPE_IMAGE,
            'position' => 3,
            'file_url' => 'https://images.unsplash.com/photo-1493106819501-66d381c466f1',
            'thumbnail' => 'https://images.unsplash.com/photo-1493106819501-66d381c466f1?w=400',
            'content_uk' => 'Приклад базових петель',
            'content_en' => 'Example of basic stitches',
        ]);
    }
}