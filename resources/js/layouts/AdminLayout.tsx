import { PageProps as InertiaPageProps } from '@inertiajs/core';
import { Link, usePage } from '@inertiajs/react';
import React from 'react';

// ✅ Auth foydalanuvchi tipi
interface AuthUser {
    id: number;
    name: string;
    email: string;
    role?: string; // 👈 qo‘shildi
}

interface PageProps extends InertiaPageProps {
    auth?: {
        user?: AuthUser;
    };
}

interface AdminLayoutProps {
    children: React.ReactNode;
    title: string;
}

export default function AdminLayout({ children, title }: AdminLayoutProps) {
    const page = usePage<PageProps>();
    const { auth } = page.props;
    const role = auth?.user?.role;

    // 👇 Panel nomi rolga qarab belgilanadi
    const panelName =
        role === 'admin'
            ? 'Admin Panel'
            : 'Manager Panel';

    // ✅ HTML sahifa title-ni yangilash
    if (typeof document !== 'undefined') {
        document.title = `${title} | ${panelName}`;
    }

    const today = new Date().toLocaleDateString('uz-UZ', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="mx-auto flex w-full items-center justify-between bg-gradient-to-r from-gray-700 via-black to-gray-700 p-4 shadow-lg">
                <h1 className="text-lg font-semibold text-white tracking-wide">
                    {auth?.user?.role === 'admin' ? '🛠️ Admin Panel' : '🎓 Manager Panel'}
                </h1>

                <div className="flex items-center space-x-4">
                    <span className="text-gray-300">{auth?.user?.name}</span>

                    <Link
                        href="/"
                        method="get"
                        as="button"
                        className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
                    >
                        Saytni ko‘rish
                    </Link>

                    <Link
                        href="/logout"
                        method="post"
                        as="button"
                        className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
                    >
                        Logout
                    </Link>
                </div>
            </header>


            {/* Main content */}
            <main className="w-full p-6">{children}</main>

            {/* Footer (fixed) */}
            <footer className="fixed bottom-0 left-0 w-full bg-gradient-to-r from-gray-700 via-black to-gray-700 py-3 shadow-lg">
                <div className="mx-auto flex max-w-6xl flex-col items-center justify-between space-y-1 px-4 text-sm text-gray-300 sm:flex-row sm:space-y-0">
                    <p className="text-center sm:text-left">
                        © {new Date().getFullYear()} —{' '}
                        <span className="font-medium text-white">
                            Namangan Davlat Texnika Universiteti
                        </span>
                    </p>

                    <p className="text-center sm:text-left">
                        {today} | Created by{' '}
                        <span className="font-semibold text-indigo-400">
                            Farhod Begmatov
                        </span>
                    </p>
                </div>
            </footer>
        </div>
    );
}
