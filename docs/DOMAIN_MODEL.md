# Домени, дані та бізнес-правила

Перевірено за моделями й міграціями: 2026-09-10. Повна схема — [database/migrations](../database/migrations); фактична схема розгорнутої БД не перевірялася.

## Користувачі

[User](../app/Entity/User/User.php): таблиця `users`, стани `wait`/`active`, ролі `user`, `student`, `instructor`, `moderator`, `admin`. Є профіль, підтвердження email, телефону, телефонна автентифікація та social networks (`user_networks`). Самореєстрація створює роль `user`; наявність ролі `student` не означає її автоматичного призначення.

Доступ описано в [AuthServiceProvider](../app/Providers/AuthServiceProvider.php): admin panel і більшість керувань — admin/moderator; pages і regions — admin; `instruct-courses` — instructor/admin. Own-resource Gates порівнюють ID власника, а `manage-own-course` — `instructor_id`. Перевіряти також фактичний виклик Gate у маршруті/контролері.

## Курси

| Модель / таблиця | Зв'язки та важливі поля |
| --- | --- |
| `CourseCategory` / `course_categories` | Nested set, батьківська категорія, локалізовані назви, slug |
| `Course` / `courses` | instructor → users, nullable category, slug, `_uk`/`_en`, price, level, language, публікація, soft delete |
| `CourseModule` / `course_modules` | course, `position`, `is_published` |
| `CourseLesson` / `course_lessons` | module, `position`, `is_published`, `is_free`, duration |
| `CourseLessonContent` / `course_lesson_contents` | lesson, type, `position`, локалізований контент, файл/URL |
| `CourseEnrollment` / `course_enrollments` | student + course (унікальна пара), status, progress, payment і certificate metadata |
| `CourseLessonProgress` / `course_lesson_progress` | enrollment + lesson (унікальна пара), status, completion, video position |
| `Tag` / `tags`, `taggables` | Поліморфні теги, унікальна комбінація tag + object ID + object type |

Джерело моделей: [app/Entity/Course](../app/Entity/Course).

- Курс опублікований, якщо `is_published=true`, `published_at` задано і не в майбутньому.
- Рівні: `beginner`, `intermediate`, `advanced`; мови: `uk`, `en`, `both`. Локалізовані accessors мають fallback на англійське поле.
- `price=null` або `price<=0` означає безкоштовний курс. Див. окрему проблему SQL scope у `KNOWN_ISSUES.md`.
- `Course::enroll()` перевіряє повторний запис, створює enrollment і збільшує `students_count`. Це модельний метод; готового HTTP-сценарію запису немає.
- Enrollment має стани `enrolled`, `in_progress`, `completed`, `dropped`; активними є перші два. `updateProgress()` обмежує значення до 0–100 та змінює стан залежно від прогресу.
- Lesson progress має власні методи початку/завершення. Не припускати автоматичного перерахунку enrollment після кожної зміни уроку.
- Типи блоків: `text`, `video`, `image`, `file`, `quiz`, `markdown_file`. Тип `quiz` не доводить наявності завершеного механізму тестування.
- Markdown читається спочатку з локалізованого файла, потім із базового. Автоматичний шлях: `storage/app/courses/{courseSlug}/lesson-{lessonId}.{locale}.md`. Кілька Markdown-блоків одного уроку можуть отримати той самий шлях.
- `recordPayment()` і `issueCertificate()` зберігають метадані; це не реалізація платіжного шлюзу або генератора сертифікатів.

## Оголошення

[Advert](../app/Entity/Adverts/Advert/Advert.php) → `advert_adverts`, власник, категорія, необов'язковий регіон, фото, значення атрибутів, обране та діалоги. Категорії (`advert_categories`) мають ієрархію й атрибути; `regions` — окрема ієрархія.

Основний шлях: `draft` → `moderation` → `active` → `closed`. Надсилання на модерацію дозволено лише для draft з фото. Публікація встановлює строк на 15 днів; reject повертає draft із причиною. Закриття та expire встановлюють closed. Точні guards кожного переходу визначає модель; вони не всюди симетричні.

[AdvertService](../app/UseCases/Adverts/AdvertService.php) створює оголошення й атрибути в транзакції, працює з фото та викликає доменні методи. DB-транзакція сама собою не відкочує записані файли. Діалоги мають моделі та методи, але це не доказ наявності UI листування.

## Банери

[Banner](../app/Entity/Banner/Banner.php), [BannerService](../app/UseCases/Banners/BannerService.php): власник, категорія/регіон, формат, файл, URL, ліміт, покази/кліки, модерація, замовлення й оплата. Вартість обчислює `CostCalculator` за `config/banner.php`. Перед зміною чи видаленням власником сервіс викликає `canBeChanged()` / `canBeRemoved()`. Не описувати цей модуль як підтверджену платіжну інтеграцію.

## Підтримка і сторінки

[Ticket](../app/Entity/Ticket/Ticket.php): `ticket_tickets`, `ticket_messages`, `ticket_statuses`. Стани `open`, `approved`, `closed`; історія зберігає автора зміни. Закритий ticket не приймає повідомлень; reopen переводить у approved. Метод `canBeRemoved()` дозволяє видалення open.

[Page](../app/Entity/Page.php): CMS-сторінки з ієрархічними URL і порядком. Catch-all route сторінок має залишатися після конкретних маршрутів.
