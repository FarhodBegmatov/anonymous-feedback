// resources/js/Components/Layout.tsx
import Footer from './Footer';
import Navbar from './Navbar';

interface Props {
    children: React.ReactNode;
    translations: Record<string, string>;
    locale: 'uz' | 'en' | 'ru';
}

export default function Layout({ children, translations, locale }: Props) {
    return (
        <div className="flex min-h-screen flex-col bg-gray-50">
            <Navbar translations={translations} locale={locale} />
            <main className="mx-auto w-full max-w-7xl flex-grow px-4 py-6">
                {children}
            </main>
            <Footer translations={translations} locale={locale}  />
        </div>
    );
}
