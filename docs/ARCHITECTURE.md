# Архітектура та карта репозиторію

Перевірено за кодом: 2026-09-10.

## Призначення і стек

У manifests проєкт називається EduPlatform. Код поєднує каталог і адміністрування навчальних курсів із дошкою оголошень, рекламними банерами, обраним, профілем і підтримкою. Пріоритет розвитку цих напрямів поки не зафіксований власником.

| Частина | Залежності/конфігурація репозиторію |
| --- | --- |
| Backend | PHP `^8.2`, Laravel `^11.0`; Docker PHP 8.3 |
| UI | React 19, Inertia 2, Ziggy 2, Vite 7, Tailwind CSS 4 |
| БД | MySQL 8 у Docker; Eloquent, міграції |
| Черги та кеш | Redis 7, Horizon 5 |
| Пошук | Elasticsearch server 8.11.0; PHP client `^8.11` |
| Авторизація | Сесійний web guard, Passport 12 API guard, Socialite |
| Контент | Tiptap, react-markdown, локальні Markdown-файли |
| Інтеграції | SMS, email, Sentry, пакет `kulykovoleksii/laravel-geocoding` |

Це версійні вимоги/образи, а не гарантія конкретних встановлених версій. Точні залежності фіксують [composer.lock](../composer.lock) і [package-lock.json](../package-lock.json).

## Шлях запиту

`public/index.php` → [bootstrap/app.php](../bootstrap/app.php) → web/API routes → middleware та controller → use case/model/service → БД/черга/зовнішній сервіс → Inertia або JSON.

`bootstrap/app.php` використовує Laravel 11 `Application::configure`, підключає web/API, console/channels, health `/up` і додає `HandleInertiaRequests` до web middleware. Старі `app/Http/Kernel.php` і `app/Console/Kernel.php` залишилися: сам факт їх наявності не доводить активності цих налаштувань. Провайдери перелічено в [config/app.php](../config/app.php); також залишився `RouteServiceProvider` із bindings `adverts_path` і `page_path`.

## Карта коду

| Шлях | Відповідальність |
| --- | --- |
| `app/Entity` | Eloquent-моделі, зв'язки, стани й доменні методи |
| `app/UseCases` | Операції Auth, Profile, Adverts, Banners, Tickets |
| `app/Http/Controllers` | Публічні, Cabinet, Admin та API сценарії |
| `app/Http/Requests` | FormRequest-валідація; курси також використовують inline validation |
| `app/Http/Resources` | JSON-контракти профілю та оголошень |
| `app/Http/Router` | Розбір ієрархічних URL сторінок та оголошень |
| `app/Providers` | DI, Gate, listeners, SMS, кеш, пошук |
| `app/Jobs`, `app/Events`, `app/Listeners` | Асинхронні й подієві побічні ефекти |
| `resources/js/Pages`, `Layouts`, `Components` | React-сторінки, оболонки, спільні компоненти |
| `resources/views` | Blade, зокрема початковий Inertia HTML |
| `database/migrations`, `seeders`, `factories` | Схема, початкові дані та тестові фабрики |
| `docker`, `docker-compose.yml`, `.github/workflows/ci.yml` | Локальна інфраструктура та CI |

## Інтеграції та побічні ефекти

- `RegisterService` створює користувача, dispatch-ить `SendVerificationEmail` та `Registered`.
- `AdvertService::moderate()` публікує оголошення й генерує `ModerationPassed`. У `EventServiceProvider` подія пов'язана з постановкою `ReindexAdvert` у чергу та notification користувачу.
- `SearchService` шукає оголошення в Elasticsearch і отримує моделі з БД. Курси фільтруються SQL-запитами.
- `CacheServiceProvider` скидає tagged cache регіонів на події Eloquent. Заміна cache driver може змінити підтримку tags.
- Зображення оголошень/банерів та admin upload використовують диск `public`; Markdown уроків пишеться під `storage/app/courses`.
- API геокодування інжектує сервіс зовнішнього Composer-пакета. Локальний `App\Services\Geocoding\GeocodingService` — інша реалізація; не плутати їх.

Детальні обмеження та місця, де потрібна runtime-перевірка: [KNOWN_ISSUES](KNOWN_ISSUES.md).
