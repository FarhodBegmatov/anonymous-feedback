// import { Link } from '@inertiajs/react';

interface Props {
    locale: 'en' | 'uz' | 'ru';
    translations: Record<string, string>;
}

export default function Footer({ locale, translations }: Props) {
    return (
        <footer className="mt-16 bg-[#0E104B] text-white shadow-inner">
            <div className="container mx-auto flex flex-col items-center justify-between space-y-6 px-4 py-8 md:flex-row md:space-y-0">
                {/* Chap qism */}
                <div className="text-center md:text-left">
                    <h2 className="text-lg font-semibold text-yellow-400">
                        {translations.app_name || 'Universitet Feedback'}
                    </h2>
                    <p className="mt-2 text-sm text-gray-300">
                        {translations.app_description ||
                            'System for evaluating educational and administrative services'}
                    </p>
                </div>

                {/* O‘ng qism — ijtimoiy tarmoqlar */}
                <div className="flex space-x-4 text-xl">
                    <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition hover:text-yellow-400"
                        aria-label="Facebook"
                    >
                        <i className="fab fa-facebook-f"></i>
                    </a>
                    <a
                        href="https://telegram.org"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition hover:text-yellow-400"
                        aria-label="Telegram"
                    >
                        <i className="fab fa-telegram-plane"></i>
                    </a>
                    <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition hover:text-yellow-400"
                        aria-label="Instagram"
                    >
                        <i className="fab fa-instagram"></i>
                    </a>
                </div>
            </div>

            {/* Pastki chiziq */}
            <div className="border-t border-gray-700 py-6 text-center text-sm text-gray-400">
                © {new Date().getFullYear()} {translations.namangan_state_technical_university}.{' '}
                {translations.all_rights_reserved ||
                    (locale === 'uz'
                        ? 'Barcha huquqlar himoyalangan.'
                        : locale === 'ru'
                            ? 'Все права защищены.'
                            : 'All rights reserved.')}
            </div>
        </footer>
    );
}
