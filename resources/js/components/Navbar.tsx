import { Link, router } from '@inertiajs/react';
import { useState } from 'react';

interface Props {
    locale: 'en' | 'uz' | 'ru';
    translations: Record<string, string>;
}

export default function Navbar({ locale, translations }: Props) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const languages = ['en', 'uz', 'ru'] as const;

    const switchLang = (lang: 'en' | 'uz' | 'ru') => {
        router.visit(window.location.pathname, {
            preserveScroll: true,
            preserveState: true,
            data: { lang },
        });
        setDropdownOpen(false);
    };

    return (
        <nav className="bg-[#0E104B] text-white shadow-md">
            <div className="container mx-auto flex items-center justify-between px-4 py-4">
                {/* 🔷 Brand */}
                <Link
                    href="/"
                    className="flex items-center text-xl font-bold tracking-wide transition hover:text-yellow-400"
                >
                    <i className="fas fa-university mr-2 text-yellow-400"></i>
                    {translations.app_name || 'Universitet Feedback'}
                </Link>

                {/* 🔹 Mobile toggle */}
                <button
                    className="rounded focus:ring-2 focus:ring-yellow-400 focus:outline-none md:hidden"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <i className="fas fa-bars"></i>
                </button>

                {/* 🔸 Menu items */}
                <div
                    className={`${
                        menuOpen ? 'block' : 'hidden'
                    } w-full transition-all duration-300 md:flex md:w-auto md:items-center`}
                >
                    <ul className="mt-3 flex flex-col space-y-2 md:mt-0 md:flex-row md:space-y-0 md:space-x-8">
                        <li>
                            <Link
                                href="/"
                                className="flex items-center px-2 py-1 transition hover:text-yellow-400"
                            >
                                <i className="fas fa-home mr-1"></i>{' '}
                                {locale === 'uz'
                                    ? 'Bosh sahifa'
                                    : locale === 'ru'
                                      ? 'Главная'
                                      : 'Home'}
                            </Link>
                        </li>

                        <li>
                            <Link
                                href="/ratings"
                                className="flex items-center px-2 py-1 transition hover:text-yellow-400"
                            >
                                <i className="fas fa-chart-bar mr-1"></i>{' '}
                                {translations.rating}
                            </Link>
                        </li>

                        {/* 🌐 Til tanlash dropdown */}
                        <li className="relative">
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="flex items-center px-2 py-1 transition hover:text-yellow-400"
                            >
                                <i className="fas fa-language mr-1"></i>
                                {locale.toUpperCase()}
                                <i className="fas fa-chevron-down ml-1 text-xs"></i>
                            </button>

                            {dropdownOpen && (
                                <ul className="absolute right-0 z-50 mt-2 w-40 rounded bg-white text-gray-800 shadow-md">
                                    {languages.map((lang) => (
                                        <li key={lang}>
                                            <button
                                                onClick={() => switchLang(lang)}
                                                className={`block w-full px-4 py-2 text-left hover:bg-gray-100 ${
                                                    locale === lang
                                                        ? 'bg-gray-100 font-semibold'
                                                        : ''
                                                }`}
                                            >
                                                {lang === 'uz'
                                                    ? "O'zbekcha"
                                                    : lang === 'ru'
                                                      ? 'Русский'
                                                      : 'English'}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>

                        <li>
                            <Link
                                href="/login"
                                className="flex items-center px-2 py-1 transition hover:text-yellow-400"
                            >
                                <i className="fas fa-sign-in-alt mr-1"></i>{' '}
                                {locale === 'uz'
                                    ? 'Kirish'
                                    : locale === 'ru'
                                      ? 'Вход'
                                      : 'Login'}
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
