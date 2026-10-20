# HTTP, доступ і frontend

Перевірено за кодом: 2026-09-10. Джерела: [web.php](../routes/web.php), [api.php](../routes/api.php), [AuthServiceProvider](../app/Providers/AuthServiceProvider.php).

## Карта маршрутів

| Група | Призначення / межа доступу |
| --- | --- |
| `/`, `/courses`, `/courses/{course}` | Публічні головна, каталог і сторінка курсу |
| `/login`, `/register`, `/password/*`, `/email/*` | Web authentication; також старий `/register/verify/{token}` |
| `/login/phone`, `/login/{network}` | Телефонний і social login |
| `/adverts/*` | Перегляд, пошук, телефон і операції обраного; перевірки дивитися в контролерах |
| `/banner/get`, `/banner/{banner}/click` | Видача реклами й облік кліків |
| `/cabinet/*` | Група `auth`: профіль, телефон, обране, tickets, оголошення, банери |
| `/admin/*` | Група `auth` + `can:admin-panel`: користувачі, регіони, сторінки, курси, оголошення, банери, tickets, upload |
| `/{page_path}` | Останній catch-all CMS route |
| `/up` | Health route у bootstrap |

Маршрути курсів в admin містять CRUD/publish/unpublish, вкладені CRUD/reorder модулів, уроків і блоків. `position` змінюється для окремого запису, тому не припускати автоматичного перенумерування сусідів. Самостійного кабінету instructor в маршрутах не визначено.

Повний реєстр за готового PHP environment: `php artisan route:list`. Не вважати статичну карту доказом runtime-реєстрації.

## API

Префікс `/api` задається bootstrap. Поза `auth:api` оголошено:

- `GET /api/`, `POST /api/register`.
- `GET /api/postal-codes/{postalCode}`.
- `POST /api/geocode`: `address` required string, `country_code` optional string із двох символів.
- `POST /api/reverse-geocode`: latitude від -90 до 90, longitude від -180 до 180.

Геокодування повертає `postal_code`, `country_code`, `address`, `coordinates`; поштовий lookup також `metadata`. При відсутності результату — JSON `error` зі статусом 404; validation виконується Laravel.

За `auth:api` (Passport): читання оголошень, додавання/видалення favorite, `/api/user` profile, `/api/user/favorites`, CRUD власних оголошень, photos/attributes/send/close. Формат оголошень і профілю дивитися в [app/Http/Resources](../app/Http/Resources). Web-публічність оголошень не означає анонімного доступу до відповідного API.

## Контракт Inertia

[app.jsx](../resources/js/app.jsx) відображає `Inertia::render('X/Y', props)` через `Pages/X/Y.jsx`. Alias `@` веде в `resources/js`. Основні layouts: `AppLayout`, `CabinetLayout`, `AdminLayout`.

[HandleInertiaRequests](../app/Http/Middleware/HandleInertiaRequests.php) надає:

- `auth.user`: null або id, name, last_name, email, phone, phone_verified, role, status.
- `flash.success`, `flash.error`.
- `ziggy`: route metadata та поточний location.

Спільні UI-компоненти: Button, Input, Select, Textarea, Card, Alert, Badge, PageHeader, BackButton, Spinner, RichTextEditor, MarkdownEditor. Перед використанням дивитися props самого компонента та [їхній README](../resources/js/Components/README.md).

## Контракти курсів

`CourseController::index()` повертає `courses`, `categories`, `filters` (`search`, `category`, `level`, `price`). Використовує `get()`, а не pagination.

`show()` повертає `course` із category/instructor/publishedModules.publishedLessons.contents, а також enrollment поточного користувача з lessonProgress та `isEnrolled`. Eloquent-серіалізація зв'язків дає snake_case, наприклад `published_modules`, `lesson_progress`.

У UI кнопка `Enroll Now` не має обробника. Контент, прихований в UI, може вже бути в Inertia props: доступ потрібно обмежувати до серіалізації на сервері. Див. [обмеження](KNOWN_ISSUES.md).
