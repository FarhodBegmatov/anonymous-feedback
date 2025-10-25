# Feedback Management System

A modern web application built with Laravel, React, TypeScript, and Inertia.js for managing feedback and surveys.

## 🚀 Features

- **User Authentication** - Secure login and registration system
- **Role-based Access Control** - Different dashboards for admins, managers, and regular users
- **Feedback Management** - Create, view, and manage feedback entries
- **Department Management** - Organize users and feedback by departments
- **Responsive Design** - Works on desktop and mobile devices
- **Real-time Updates** - Using Laravel's broadcasting features

## 🛠 Tech Stack

- **Backend**: Laravel 10+
- **Frontend**: React 18 with TypeScript
- **UI Framework**: Shadcn UI
- **State Management**: React Context API
- **Authentication**: Laravel Fortify
- **API**: Laravel Sanctum
- **Database**: MySQL/PostgreSQL
- **Build Tool**: Vite

## 📋 Prerequisites

- PHP 8.2+
- Composer
- Node.js 18+
- npm or Yarn
- MySQL/PostgreSQL

## 🚀 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/feedback-system.git
   cd feedback-system
   ```

2. Install PHP dependencies:
   ```bash
   composer install
   ```

3. Install JavaScript dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

4. Copy the environment file:
   ```bash
   cp .env.example .env
   ```

5. Generate application key:
   ```bash
   php artisan key:generate
   ```

6. Configure your database in `.env`:
   ```
   DB_CONNECTION=sqlite
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=database_name
   DB_USERNAME=root
   DB_PASSWORD=
   ```

7. Run migrations and seeders:
   ```bash
   php artisan migrate --seed
   ```

8. Build assets:
   ```bash
   npm run build
   # or for development
   npm run dev
   ```

9. Start the development server:
   ```bash
   php artisan serve
   ```

## 🔒 Default Admin User

After running the seeders, you can log in with:

- **name**: admin
- **Password**: password123

## 🧪 Testing

Run the test suite:

```bash
php artisan test
```

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Laravel](https://laravel.com/)
- [React](https://reactjs.org/)
- [Inertia.js](https://inertiajs.com/)
- [Shadcn UI](https://ui.shadcn.com/)
