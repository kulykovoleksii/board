# 🎓 Educational Platform (Board)

> **Full-stack educational platform built with Laravel 11**
> Transforming from a classifieds board into a comprehensive online learning management system

[![Laravel](https://img.shields.io/badge/Laravel-11.x-FF2D20?style=flat&logo=laravel)](https://laravel.com)
[![PHP](https://img.shields.io/badge/PHP-8.2+-777BB4?style=flat&logo=php)](https://php.net)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=flat&logo=mysql)](https://www.mysql.com)
[![Elasticsearch](https://img.shields.io/badge/Elasticsearch-8.x-005571?style=flat&logo=elasticsearch)](https://www.elastic.co)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=flat&logo=docker)](https://www.docker.com)

---

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [System Requirements](#system-requirements)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Test Accounts](#test-accounts)
- [Development](#development)
- [Roadmap](#roadmap)
- [Troubleshooting](#troubleshooting)
- [License](#license)

---

## 🎯 About

Educational Platform is a feature-rich learning management system that enables instructors to create and manage courses, while students can enroll, track progress, and earn certificates. The platform supports multilingual content (Ukrainian/English), advanced search capabilities, and comprehensive user management.

**Project Status:** 🚧 Active Development

---

## ✨ Features

### ✅ Implemented Features

#### **Course Management**
- 📚 Create and manage courses with multilingual support (UK/EN)
- 🏷️ Hierarchical course categories with nested set structure
- 🎯 Course levels: Beginner, Intermediate, Advanced
- 💰 Free and paid courses with payment tracking
- 🎬 Course thumbnails and trailer videos
- 📊 Real-time student enrollment statistics
- ⭐ Rating and review system
- 🏷️ Polymorphic tagging system

#### **User Roles & Permissions**
- 👤 **Users** - Basic platform access
- 🎓 **Students** - Course enrollment and progress tracking
- 👨‍🏫 **Instructors** - Course creation and management
- 🛡️ **Moderators** - Content moderation
- 👑 **Admins** - Full system access

#### **Enrollment & Progress Tracking**
- ✅ Course enrollment with status tracking
- 📈 Progress percentage monitoring (0-100%)
- 🎫 Certificate generation upon completion
- 💳 Payment tracking (amount, method, transaction ID)
- 📅 Enrollment history and timestamps

#### **Search & Discovery**
- 🔍 Elasticsearch-powered full-text search
- 🔎 Filter by category, level, language, price
- 🎯 Tag-based course discovery
- 📊 Sort by popularity, rating, or date

#### **Legacy Features (From Classifieds Board)**
- 📢 Advert posting and management
- 🗺️ Regional categorization
- 🎫 Support ticket system
- 🎪 Banner advertising
- 💬 Notifications system

#### **Infrastructure**
- 🐳 Docker containerization (Nginx, PHP-FPM, MySQL, Redis, Elasticsearch)
- 🔐 Laravel Passport OAuth2 authentication
- 📨 Email verification
- 📱 Phone verification with SMS
- 🌐 Social login (Network authentication)
- 🔄 Laravel Horizon for queue management
- 📊 Sentry error tracking

---

## 🛠️ Tech Stack

### Backend
- **Framework:** Laravel 11.x
- **Language:** PHP 8.2+
- **Database:** MySQL 8.0
- **Search:** Elasticsearch 8.x
- **Cache/Queue:** Redis
- **Authentication:** Laravel Passport (OAuth2)

### Frontend
- **Build Tool:** Laravel Mix / Webpack
- **Package Manager:** Yarn / NPM
- **UI:** Blade Templates

### DevOps
- **Containerization:** Docker & Docker Compose
- **Web Server:** Nginx
- **Process Monitor:** Laravel Horizon
- **Error Tracking:** Sentry

### Key Dependencies
- `kalnoy/nestedset` - Nested set pattern for hierarchical data
- `elasticsearch/elasticsearch` - Full-text search
- `laravel/passport` - API authentication
- `laravel/horizon` - Queue monitoring
- `laravel/socialite` - Social authentication
- `predis/predis` - Redis client
- `davejamesmiller/laravel-breadcrumbs` - Navigation breadcrumbs

---

## 💻 System Requirements

- **OS:** Linux, macOS, or Windows with WSL2
- **Docker:** 20.10+ with Docker Compose
- **RAM:** Minimum 4GB (8GB recommended for Elasticsearch)
- **Storage:** 5GB free space
- **Ports:** 8080 (HTTP), 3306 (MySQL), 9200 (Elasticsearch), 6379 (Redis)

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd board
```

### 2. Copy Environment File

```bash
cp .env.example .env
```

### 3. Configure Environment Variables

Edit `.env` file with your settings:

```env
APP_NAME="Educational Platform"
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8080

DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=app
DB_USERNAME=app
DB_PASSWORD=secret

REDIS_HOST=redis
REDIS_PORT=6379

ELASTICSEARCH_HOSTS=elasticsearch:9200
```

### 4. Build and Start Docker Containers

```bash
# Increase memory limit for Elasticsearch
make memory

# Build and start containers
make docker-build

# Or simply start if already built
make docker-up
```

### 5. Install Dependencies

```bash
# Install PHP dependencies
docker-compose exec php-cli composer install

# Install frontend dependencies
docker-compose exec node yarn install
```

### 6. Generate Application Key

```bash
docker-compose exec php-cli php artisan key:generate
```

### 7. Run Migrations

```bash
docker-compose exec php-cli php artisan migrate
```

### 8. Seed Database (Optional)

```bash
# Seed all data including test users and courses
docker-compose exec php-cli php artisan db:seed

# Or seed only specific seeders
docker-compose exec php-cli php artisan db:seed --class=UsersTableSeeder
docker-compose exec php-cli php artisan db:seed --class=CoursesSeeder
```

### 9. Initialize Elasticsearch Indices

```bash
docker-compose exec php-cli php artisan search:init
```

### 10. Install Passport Keys

```bash
docker-compose exec php-cli php artisan passport:install
```

### 11. Set Permissions

```bash
make perm
```

### 12. Build Frontend Assets

```bash
# Development build
docker-compose exec node yarn run dev

# Watch for changes
make assets-watch

# Production build
docker-compose exec node yarn run production
```

### 13. Access the Application

🌐 **URL:** http://localhost:8080

---

## ⚙️ Configuration

### Email Configuration

Update `.env` with your mail settings:

```env
MAIL_MAILER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=your_username
MAIL_PASSWORD=your_password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=noreply@example.com
MAIL_FROM_NAME="${APP_NAME}"
```

### SMS Configuration

Configure SMS provider for phone verification:

```env
SMS_DRIVER=your_provider
SMS_API_KEY=your_api_key
```

### Social Login

Configure OAuth providers:

```env
# Google
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
GOOGLE_REDIRECT_URI=http://localhost:8080/login/google/callback

# Facebook
FACEBOOK_CLIENT_ID=your_client_id
FACEBOOK_CLIENT_SECRET=your_client_secret
FACEBOOK_REDIRECT_URI=http://localhost:8080/login/facebook/callback
```

---

## 📖 Usage

### Makefile Commands

```bash
# Docker Management
make docker-up          # Start containers
make docker-down        # Stop containers
make docker-build       # Build and start containers

# Development
make test               # Run PHPUnit tests
make perm               # Fix permissions

# Frontend Assets
make assets-install     # Install node dependencies
make assets-dev         # Build assets (development)
make assets-watch       # Watch for changes
make assets-rebuild     # Rebuild node-sass

# Queue Workers
make queue              # Start queue worker
make horizon            # Start Horizon dashboard
make horizon-pause      # Pause Horizon
make horizon-continue   # Resume Horizon
make horizon-terminate  # Terminate Horizon

# System
make memory            # Increase vm.max_map_count for Elasticsearch
```

### Artisan Commands

```bash
# Access PHP CLI container
docker-compose exec php-cli bash

# Common artisan commands
php artisan migrate                    # Run migrations
php artisan db:seed                    # Seed database
php artisan search:init               # Initialize Elasticsearch
php artisan search:reindex            # Reindex search data
php artisan passport:install          # Install Passport
php artisan horizon                   # Start Horizon
php artisan queue:work                # Process queue jobs
php artisan tinker                    # Interactive shell
```

### Accessing Services

- **Application:** http://localhost:8080
- **Horizon Dashboard:** http://localhost:8080/horizon
- **Admin Panel:** http://localhost:8080/admin
- **API:** http://localhost:8080/api

---

## 📁 Project Structure

```
board/
├── app/
│   ├── Console/              # Artisan commands
│   ├── Entity/               # Domain models
│   │   ├── Adverts/         # Legacy adverts system
│   │   ├── Course/          # Course management
│   │   │   ├── Course.php
│   │   │   ├── CourseCategory.php
│   │   │   └── CourseEnrollment.php
│   │   ├── Tag/             # Tagging system
│   │   │   ├── Tag.php
│   │   │   └── Taggable.php (trait)
│   │   ├── User/            # User management
│   │   └── ...
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Admin/       # Admin panel controllers
│   │   │   │   ├── Courses/
│   │   │   │   └── ...
│   │   │   ├── Cabinet/     # User dashboard
│   │   │   ├── Api/         # API endpoints
│   │   │   └── ...
│   │   └── Middleware/
│   ├── Providers/           # Service providers
│   └── UseCases/            # Business logic
├── database/
│   ├── migrations/          # Database migrations
│   ├── seeders/            # Database seeders
│   └── factories/          # Model factories
├── docker/                  # Docker configuration
├── public/                  # Public assets
├── resources/
│   ├── views/              # Blade templates
│   ├── js/                 # JavaScript
│   └── css/                # Stylesheets
├── routes/
│   ├── web.php             # Web routes
│   ├── api.php             # API routes
│   └── ...
├── storage/                 # Application storage
├── tests/                   # Tests
├── docker-compose.yml       # Docker services
├── Makefile                # Make commands
└── README.md               # This file
```

---

## 🔌 API Documentation

### Authentication

**Endpoint:** `POST /api/login`

```json
{
  "email": "user@example.com",
  "password": "password"
}
```

**Response:**
```json
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJh...",
  "token_type": "Bearer",
  "expires_in": 31536000
}
```

### Course Endpoints

- `GET /api/courses` - List courses
- `GET /api/courses/{id}` - Get course details
- `POST /api/courses/{id}/enroll` - Enroll in course
- `GET /api/user/courses` - Get user's enrolled courses
- `PUT /api/user/courses/{id}/progress` - Update course progress

### Query Parameters (Courses)

```bash
GET /api/courses?
  category_id=1&          # Filter by category
  level=beginner&         # Filter by level
  language=uk&            # Filter by language
  price=free&             # Filter by price (free/paid)
  tag=php&                # Filter by tag
  search=laravel&         # Search query
  sort=popular            # Sort (popular/rating/newest)
```

---

## 👥 Test Accounts

After running seeders, you can login with these accounts:

### Admin
- **Email:** admin@example.com
- **Password:** password
- **Access:** Full system access

### Moderator
- **Email:** moderator@example.com
- **Password:** password
- **Access:** Content moderation

### Instructors
- **Email:** instructor1@example.com / instructor2@example.com
- **Password:** password
- **Access:** Create and manage courses

### Students
- **Email:** student1@example.com - student5@example.com
- **Password:** password
- **Access:** Enroll in courses

### Regular User
- **Email:** user@example.com
- **Password:** password
- **Access:** Basic platform features

---

## 🔨 Development

### Running Tests

```bash
# Run all tests
make test

# Or directly
docker-compose exec php-cli vendor/bin/phpunit

# Run specific test
docker-compose exec php-cli vendor/bin/phpunit --filter=CourseTest
```

### Code Style

```bash
# Run Laravel Pint (code formatter)
docker-compose exec php-cli ./vendor/bin/pint
```

### Debugging

- **Laravel Debugbar** is enabled in development mode
- **Logs:** `storage/logs/laravel.log`
- **Horizon Dashboard:** http://localhost:8080/horizon

### Database

```bash
# Access MySQL
docker-compose exec mysql mysql -uapp -psecret app

# Access Redis CLI
docker-compose exec redis redis-cli

# Tinker (Laravel REPL)
docker-compose exec php-cli php artisan tinker
```

---

## 🗺️ Roadmap

### ✅ Phase 1: Foundation (Completed)
- [x] Laravel 11 migration
- [x] Course management system
- [x] User roles (Student/Instructor)
- [x] Enrollment and progress tracking
- [x] Tagging system
- [x] Basic admin controllers

### 🚧 Phase 2: Core Features (In Progress)
- [ ] Course modules and lessons
- [ ] Video content management
- [ ] Quiz and assignments
- [ ] Discussion forums
- [ ] Live streaming integration
- [ ] Certificate generation

### 📋 Phase 3: Enhanced Learning
- [ ] Course reviews and ratings (user-facing)
- [ ] Instructor dashboard with analytics
- [ ] Student dashboard with progress
- [ ] Gamification (badges, achievements)
- [ ] Learning paths
- [ ] Course recommendations

### 🎯 Phase 4: Business Features
- [ ] Payment gateway integration (Stripe/PayPal)
- [ ] Subscription plans
- [ ] Course bundles
- [ ] Affiliate program
- [ ] Coupon system
- [ ] Revenue sharing

### 🌐 Phase 5: Platform Enhancement
- [ ] Mobile app (React Native)
- [ ] Progressive Web App (PWA)
- [ ] Multi-tenant support
- [ ] White-labeling
- [ ] Advanced analytics
- [ ] AI-powered recommendations

### 🔄 Legacy Migration
- [ ] Migrate existing advert functionality
- [ ] Transform regions into course delivery locations
- [ ] Repurpose banner system for course promotions
- [ ] Archive old ticket system

---

## 🐛 Troubleshooting

### Docker Issues

**Problem:** Port already in use
```bash
# Find process using port
sudo lsof -i :8080

# Kill process
sudo kill -9 <PID>
```

**Problem:** Elasticsearch not starting
```bash
# Increase vm.max_map_count
sudo sysctl -w vm.max_map_count=262144

# Make permanent (add to /etc/sysctl.conf)
vm.max_map_count=262144
```

**Problem:** Permission denied errors
```bash
# Fix permissions
make perm

# Or manually
sudo chgrp -R www-data storage bootstrap/cache
sudo chmod -R ug+rwx storage bootstrap/cache
```

### Application Issues

**Problem:** "Class not found" errors
```bash
# Clear cache and regenerate autoload
docker-compose exec php-cli php artisan cache:clear
docker-compose exec php-cli composer dump-autoload
```

**Problem:** Migration errors
```bash
# Rollback and re-migrate
docker-compose exec php-cli php artisan migrate:rollback
docker-compose exec php-cli php artisan migrate
```

**Problem:** Search not working
```bash
# Reinitialize Elasticsearch
docker-compose exec php-cli php artisan search:init
docker-compose exec php-cli php artisan search:reindex
```

### Database Issues

**Problem:** Can't connect to MySQL
```bash
# Check if MySQL is running
docker-compose ps

# Check MySQL logs
docker-compose logs mysql

# Restart MySQL
docker-compose restart mysql
```

**Problem:** Database doesn't exist
```bash
# Access MySQL and create database
docker-compose exec mysql mysql -uroot -psecret
CREATE DATABASE app;
GRANT ALL PRIVILEGES ON app.* TO 'app'@'%';
FLUSH PRIVILEGES;
```

---

## 📝 License

This project is licensed under the MIT License.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📞 Support

For issues and questions:
- Open an issue on GitHub
- Contact: [your-email@example.com]

---

## 🙏 Acknowledgments

- Laravel Framework
- Docker Community
- Elasticsearch
- All contributors and open-source libraries used in this project

---

**Made with ❤️ using Laravel and Claude Code**