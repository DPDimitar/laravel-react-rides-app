<img src="https://raw.githubusercontent.com/nursandiid/messenger-clone/main/public/images/preview.png">

## Overview
This app offers real-time rides seeking and publishing with a sleek UI design. It supports rides filtering, users functionalities as publishing and editing rides and so on.

## Features:
- Rides filtering, publishing, editing
- Multilanguage support
- User settings
- Light and dark themes

## Installation
For the installation you need to do the follow.

Install required packages.
```bash
composer install
npm install
```

Create a new .env file and edit the database credentials.
```bash
cp .env.example .env
```

## Configuration

### Application Settings
```bash
APP_NAME="Prevozi"
APP_TIMEZONE="Europe/Ljubljana"
APP_URL="http://127.0.0.1:8000" # OR ELSE
```

### Database Connection (SQLite just for testing purposes)
```bash
DB_CONNECTION=sqlite
#DB_HOST=127.0.0.1
#DB_PORT=3306
#DB_DATABASE=messenger_clone
#DB_USERNAME=root
#DB_PASSWORD=
```

## Run Commands
Generate new app key:
```bash
php artisan key:generate
```

Run migrations:
```bash
php artisan migrate
```

Run seeders:
```bash
php artisan db:seed
```

Generate a symlink to view files in storage:
```bash
php artisan storage:link
```

Build assets with NPM:
```bash
npm run prod
```

Alternatively, run in development mode:
```bash
npm run dev
```

Run your app:
```bash
php artisan serve
```

## Run Tests

Run your Laravel tests:
```bash
php artisan test
```

Run your tests:
```bash
npx cypress open
```
Choose E2E testing and run the test you want

That's it! Launch the main URL at http://127.0.0.1:8000 (or else)
