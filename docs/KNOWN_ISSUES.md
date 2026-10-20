# Відомі обмеження та питання для перевірки

Дата: 2026-09-10. Це результати статичного аналізу, не автоматично затверджений backlog. Пріоритети розвитку визначає власник. Виправлення не входили до задачі створення документації.

## Виявлено в коді

| ID | Спостереження та наслідок | Джерело / наступна перевірка |
| --- | --- | --- |
| K01 | Публічний `CourseController::show()` не викликає `view-course` і не обмежує курс published scope; завантажує contents незалежно від enrollment. Потенційний доступ до чернетки та матеріалів через props. | `app/Http/Controllers/CourseController.php`, `routes/web.php`; перевірити guest/non-enrolled/draft/paid сценарії. |
| K02 | `Course::scopeFree()` додає незгрупований `orWhere(price <= 0)`. У комбінації з published/category/search SQL OR може обійти попередні умови. | `app/Entity/Course/Course.php`; тест неопублікованого курсу з нульовою ціною та активними фільтрами. |
| K03 | Enrollment/progress/payment/certificate мають модельні методи, але немає маршрутів запису й оновлення прогресу. `Enroll Now` без обробника. | `routes/web.php`, `routes/api.php`, `resources/js/Pages/Courses/Show.jsx`; спочатку визначити потрібний навчальний сценарій. |
| K04 | Вкладені course/module/lesson/content приймаються незалежними model bindings; у контролерах немає явної перевірки їх належності, у routes немає `scopeBindings()`. | `app/Http/Controllers/Admin/Courses/{ModuleController,LessonController,ContentController}.php`; негативні тести змішаних ID. |
| K05 | Автоматичне ім'я Markdown-файла містить lesson ID, але не content ID: два блоки одного уроку можуть перезаписати файл. `file_path` приймається як довільний string і додається до storage path. | `CourseLessonContent::saveMarkdownContent()`, `Admin/Courses/ContentController`; перевірити унікальність і допустимі межі шляхів. |
| K06 | API геокодування використовує Composer-пакет; локальна копія збереглася. У локальній копії п'ятизначний код спершу визначається як US, тому UA-гілка недосяжна. | `Api/PostalCodeController`, `app/Services/Geocoding/GeocodingService.php`; не переносити цей висновок на пакет без його перевірки. |
| K07 | Старий `PaymentController` містить вбудований signing secret, порожні success/fail та не підключений у web/API routes. | `app/Http/Controllers/PaymentController.php`; не вважати його готовою оплатою курсів чи банерів, не переносити secret у docs. |
| K08 | Frontend читає поля `duration`, `requirements` і `course.enrollments?.length`; поточна модель використовує `duration_minutes`, а show не завантажує course.enrollments. | `resources/js/Pages/Courses/Show.jsx`, `CourseController`, `Course`; звірити всі props і відображення статистики. |
| K09 | У перевірених індексаторах і search calls залишилися параметри `type` та старі mappings за залежностей ES8. | `app/Services/Search`, `app/UseCases/Adverts/SearchService.php`, `app/UseCases/Banners/BannerService.php`, `app/Console/Commands/Search`; перевірити на цільовому client/server. |

## Потребує runtime-підтвердження

- **K10 — Bootstrap і розклад.** Laravel 11 bootstrap співіснує зі старими Kernels та RouteServiceProvider. Не припускати, що middleware/commands/schedule зі старих класів активні. Перевірити `route:list`, `schedule:list`, доступність custom commands і bindings.
- **K11 — Оновлення пошуку.** У явній event map переіндексація прив'язана до `ModerationPassed`. Перевірити, як зміни, закриття й видалення оголошень/банерів синхронізуються з ES; не вважати всі записи автоматично синхронізованими.
- **K12 — Тестове середовище.** PHPUnit XML/CI описують різні БД, XML старої schema; немає автоматичного очищення БД в базовому TestCase. Потрібен відтворюваний ізольований запуск.
- **K13 — Історична документація.** `GEOCODING_TESTS.md` не є доказом наявності описаних тестів у поточному `tests`; кореневий readme та Makefile містять історичні інструкції.
- **K14 — Ролі курсів.** Gate `instruct-courses` існує, але admin panel допускає admin/moderator; список instructors у перевіреному admin index вибирає admin/moderator. Узгодити реальну роль викладача з продуктом.

## Як оновлювати

Для закритої проблеми залишити ID, додати статус «виправлено», дату, посилання на зміну та спосіб перевірки. Якщо припущення спростовано, описати результат. Нові продуктові рішення записувати в [DECISIONS](DECISIONS.md), а реалізовану поведінку — у тематичний документ.
