# Локальна розробка та перевірки

Перевірено за конфігурацією: 2026-09-10. Наведені команди — інструкції для підготовленого середовища, не звіт про успішний запуск.

## Середовище

Docker Compose містить nginx, php-fpm, php-cli, horizon, mysql, redis, node, elasticsearch. Порти хоста: web `8080`, MySQL `33061`, Redis `63791`, Elasticsearch `9201`. Усередині Docker: mysql:3306, redis:6379, elasticsearch:9200.

Nginx слухає HTTP 80: локальна адреса `http://localhost:8080`. У `.env.example` стоїть HTTPS; перед запуском узгодити `APP_URL`. Vite використовує 5173, але node service не публікує цей порт — для HMR потрібна окрема конфігурація або запуск Vite на хості.

PHP dependency requirement — 8.2+, образ — 8.3. Node image/CI — 20; точну сумісність minor-версії перевіряти за engines встановленого Vite. На момент аналізу локально доступний Node 24.2.0, команда `php` відсутня.

## Початкове налаштування

1. Створити `.env` із `.env.example`, лише якщо його ще немає. Заповнити локальні параметри; не перезаписувати наявні секрети.
2. Підготувати Docker images/services: `docker compose build`, `docker compose up -d mysql redis elasticsearch php-cli`.
3. Встановити backend: `docker compose exec php-cli composer install`.
4. Для нового середовища без ключа: `docker compose exec php-cli php artisan key:generate`.
5. Перевірити цільову БД й виконати `docker compose exec php-cli php artisan migrate`.
6. Для public uploads: `docker compose exec php-cli php artisan storage:link`.
7. На хості: `npm ci`, `npm run build`.
8. Запустити web і worker: `docker compose up -d php-fpm nginx horizon`.

Seeders читати перед запуском: [DatabaseSeeder](../database/seeders/DatabaseSeeder.php) і класи в тій самій директорії. Базовий DatabaseSeeder викликає лише UsersTableSeeder, RegionsTableSeeder та AdvertCategoriesTableSeeder; курси й контент мають окремі seeders. Це запис даних; не запускати на робочій БД як діагностику. OAuth keys/client setup потрібні окремо для сценаріїв Passport; самого `migrate` недостатньо для підтвердження token flow.

## Черги, пошук і scheduler

- `docker compose exec php-cli php artisan queue:work` — звичайний worker; Compose вже має окремий Horizon service.
- `php artisan search:init`, `php artisan search:reindex` — команди роботи з індексами. Спочатку переглянути реалізацію та сумісність із ES8; це не read-only перевірки.
- `php artisan schedule:list` — перевірити активний розклад. У старому `app/Console/Kernel.php` задекларовано `banner:expire` щодня і `advert:expire` щогодини, але активність не підтверджена для нового bootstrap.
- Compose не містить scheduler service. Після налаштування активного розкладу потрібен окремий запуск scheduler/cron.
- `php artisan user:verify {email}` і `user:role {email} {role}` змінюють користувачів.

`config/queue.php` читає `QUEUE_CONNECTION` з fallback на `QUEUE_DRIVER`. Конфігурацію інших інтеграцій перевіряти в `config`, а геокодування — також у встановленому пакеті; локальна копія сервісу не є поточною API-залежністю.

## Перевірки змін

| Зміна | Доречна перевірка |
| --- | --- |
| Документація | Відносні посилання, відповідність коду, `git diff --check` |
| React/CSS | `npm run build`; ручний сценарій у браузері |
| PHP | `php -l path/to/file.php`, релевантний PHPUnit test/filter |
| Routes/access | `php artisan route:list`; feature checks гостя, власника, іншого користувача, admin/moderator |
| Схема БД | Міграції та поведінка на окремій тестовій БД |
| Jobs/search/files | Окремі перевірки побічних ефектів відповідного сценарію |

Наявні тести: `tests/Unit/Entity/User/*` (створення, реєстрація, телефон, ролі), `tests/Feature/Auth/*`, `tests/Feature/ExampleTest.php`. У базовому TestCase немає `RefreshDatabase`; деякі тести створюють записи. Перед `vendor/bin/phpunit` або його Docker-еквівалентом перевірити ізоляцію БД і зовнішніх інтеграцій. `phpunit.xml` задає MySQL `app_testing`; не запускати suite проти робочих даних.

CI: [.github/workflows/ci.yml](../.github/workflows/ci.yml) містить PHP tests, frontend build, syntax/debug checks. CI запускає міграції й тести з SQLite env, тоді як PHPUnit XML описує MySQL — узгодженість потребує перевірки. XML також посилається на PHPUnit 9.3 schema за залежності PHPUnit 10.

## Застарілі Make targets

`Makefile` використовує `docker-compose`. `assets-watch` викликає відсутній script `watch`; `assets-rebuild` згадує node-sass, якого немає в package.json. `memory` містить Linux sysctl, непридатний як універсальна команда macOS. `perm` містить абсолютний шлях іншого середовища та широкі chmod. Використовувати перевірені прямі команди замість сліпого запуску цих targets. `test-refresh` видаляє таблиці цільової БД.

## Результат цього аналізу

Backend-тести, міграції, Docker, external services і browser checks не виконувалися. Для створених документів перевірено всі відносні Markdown-посилання (битих немає), кінцеві пробіли та конфліктні маркери; `git diff --check` пройшов для tracked-змін. Нові файли перевірено окремо, оскільки вони ще untracked.
