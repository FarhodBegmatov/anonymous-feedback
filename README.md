# Anonymous Feedback System

A secure web application built with Laravel, React, TypeScript, and Inertia.js for submitting and managing anonymous feedback about faculties and departments.

## 🚀 Features

- **Anonymous Feedback** - Submit feedback without revealing identity
- **Faculty & Department Search** - Find and rate faculties and departments
- **Multi-language Support** - Built-in support for multiple languages
- **Responsive Design** - Works on desktop and mobile devices
- **Secure** - Built with security best practices in mind

## 🛠 Tech Stack

- **Backend**: Laravel
- **Frontend**: React with TypeScript
- **UI Framework**: Headless UI with custom components
- **State Management**: React Hooks
- **Authentication**: Laravel Breeze
- **Database**: MySQL
- **Build Tool**: Vite

## 📋 Prerequisites

- PHP 8.1+
- Composer
- Node.js 16+
- npm or Yarn
- MySQL 5.7+ or MariaDB
- XAMPP/WAMP (recommended for Windows)

## 🚀 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/anonymous-feedback.git
   cd anonymous-feedback
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
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=anonymous_feedback
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

## 🔒 Admin User

After running the migrations and seeders, you can log in with the default admin account:

- **Name**: admin
- **Password**: admin123

## 🧪 Testing

Run the test suite:

```bash
php artisan test
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request with a clear description of changes

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Laravel](https://laravel.com/)
- [React](https://reactjs.org/)
- [Inertia.js](https://inertiajs.com/)
- [Headless UI](https://headlessui.com/)
