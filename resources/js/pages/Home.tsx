import Layout from '@/components/Layout';
import Pagination from '@/components/Pagination';
import SearchInput from '@/components/SearchInput';
import type { HomePageProps, Faculty, RatingColors } from '@/types/Home';
import { Link } from '@inertiajs/react';
import { useState, useMemo } from 'react';

// 🔹 Debounce hook — input yozilganda ortiqcha renderni kamaytiradi
function useDebounce<T>(value: T, delay = 400): T {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useMemo(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(timer);
    }, [value, delay]);
    return debouncedValue;
}

export default function Home({
                                 faculties,
                                 locale,
                                 translations,
                                 total_faculties,
                                 total_feedbacks,
                                 global_average_grade,
                             }: HomePageProps) {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const debouncedQuery = useDebounce(searchQuery);

    // 🔹 Local qidiruv (client-side filtering)
    const facultiesToShow = useMemo<Faculty[]>(() => {
        if (!debouncedQuery) return faculties.data as Faculty[];

        const query = debouncedQuery.toLowerCase();

        return (faculties.data as Faculty[]).filter((faculty) => {
            const name =
                faculty.name[locale as keyof typeof faculty.name] ||
                faculty.name.en ||
                '';
            return name.toLowerCase().includes(query);
        });
    }, [debouncedQuery, faculties.data, locale]);

    // 🔹 Reyting bo‘yicha ranglar
    const getRatingColors = (rating: number): RatingColors => {
        if (rating >= 4)
            return { ratingColor: 'text-green-600', barColor: 'bg-green-500' };
        if (rating >= 3)
            return { ratingColor: 'text-yellow-500', barColor: 'bg-yellow-500' };
        if (rating > 0)
            return { ratingColor: 'text-red-500', barColor: 'bg-red-500' };
        return { ratingColor: 'text-gray-500', barColor: 'bg-gray-400' };
    };

    return (
        <Layout translations={translations} locale={locale}>
            {/* 🔹 Hero Section */}
            <div className="mx-auto mt-10 mb-12 max-w-7xl px-4 text-center">
                <h4 className="text-3xl md:text-5xl font-extrabold text-blue-700 leading-snug">
                    {translations.hero_title}
                </h4>
                <p className="mt-4 text-lg font-semibold text-gray-600">
                    {translations.hero_subtitle}
                </p>
            </div>

            {/* 🔹 Global Statistics */}
            <div className="mx-auto mb-10 max-w-7xl px-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                    <StatCard
                        icon="fas fa-city"
                        value={total_faculties}
                        title={translations.total_faculties || 'Total Faculties'}
                        gradient="from-blue-600 to-indigo-500"
                    />
                    <StatCard
                        icon="fas fa-comments"
                        value={total_feedbacks}
                        title={translations.total_feedbacks || 'Total Feedbacks'}
                        gradient="from-green-500 to-emerald-600"
                    />
                    <StatCard
                        icon="fas fa-star"
                        value={global_average_grade ?? '-'}
                        title={translations.global_average_grade || 'Global Average'}
                        gradient="from-orange-400 to-pink-500"
                    />
                </div>
            </div>

            {/* 🔹 Faculties Section */}
            <div className="mx-auto max-w-7xl px-4">
                <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <h1 className="text-3xl font-semibold text-gray-800">
                        {translations.faculties_centers}
                    </h1>
                    <div className="w-full md:w-96">
                        <SearchInput
                            searchType="faculty"
                            placeholder={translations.search_faculties || 'Search faculties...'}
                            className="w-full"
                            onSearch={setSearchQuery}
                        />
                    </div>
                </div>

                {/* 🔹 Faculties List */}
                {facultiesToShow.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {facultiesToShow.map((faculty) => {
                                const rating = faculty.average_grade ?? 0;
                                const progressWidth = `${(rating / 5) * 100}%`;
                                const { ratingColor, barColor } = getRatingColors(rating);

                                return (
                                    <div
                                        key={faculty.id}
                                        className="flex flex-col h-full rounded-xl border bg-white shadow-sm transform transition hover:scale-[1.02] hover:shadow-xl"
                                    >
                                        {/* Header */}
                                        <div className="rounded-t-xl bg-blue-900 px-4 py-3 text-white">
                                            <h2 className="flex items-center text-lg font-semibold">
                                                <i className="fas fa-building mr-2 text-yellow-300"></i>
                                                {faculty.name[
                                                    locale as keyof typeof faculty.name
                                                    ] ?? faculty.name.en}
                                            </h2>
                                        </div>

                                        {/* Body */}
                                        <div className="flex-1 p-5">
                                            <div className="mb-4 grid grid-cols-3 text-center">
                                                <StatColumn
                                                    value={faculty.departments_count}
                                                    label={translations.departments_count}
                                                    color="text-blue-600"
                                                />
                                                <StatColumn
                                                    value={faculty.feedback_count}
                                                    label={translations.feedback_count}
                                                    color="text-green-600"
                                                />
                                                <StatColumn
                                                    value={
                                                        faculty.average_grade != null
                                                            ? faculty.average_grade.toFixed(1)
                                                            : translations.no_feedback
                                                    }
                                                    label={translations.average_grade}
                                                    color={ratingColor}
                                                />
                                            </div>

                                            {/* Progress bar */}
                                            <div className="mb-3 h-3 w-full rounded-full bg-gray-200">
                                                <div
                                                    className={`${barColor} h-3 rounded-full`}
                                                    style={{ width: progressWidth }}
                                                />
                                            </div>
                                        </div>

                                        {/* Footer */}
                                        <div className="rounded-b-xl bg-gray-50 px-4 py-3">
                                            <Link
                                                href={`/faculty/${faculty.id}`}
                                                className="inline-flex w-full items-center justify-center rounded-lg bg-blue-900 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
                                            >
                                                {translations.view_sections}
                                                <i className="fas fa-arrow-right ml-2"></i>
                                            </Link>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Pagination — faqat search bo‘lmaganda */}
                        {!debouncedQuery && <Pagination links={faculties.links} />}
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center py-12">
                        <i className="fas fa-search text-4xl text-gray-400 mb-4"></i>
                        <p className="text-lg text-gray-500">
                            {translations.no_results || 'No faculties found matching your search'}
                        </p>
                    </div>
                )}
            </div>
        </Layout>
    );
}

/* --- Helper Components --- */
interface StatCardProps {
    icon: string;
    value: string | number;
    title: string;
    gradient: string;
}
function StatCard({ icon, value, title, gradient }: StatCardProps) {
    return (
        <div
            className={`relative overflow-hidden rounded-2xl bg-gradient-to-r ${gradient} p-6 text-white shadow-lg transition-transform duration-300 hover:scale-105`}
        >
            <div className="absolute m-3 rounded-full bg-white/20 p-3">
                <i className={`${icon} text-3xl text-white`}></i>
            </div>
            <div className="text-4xl font-extrabold">{value}</div>
            <div className="mt-2 text-lg opacity-90">{title}</div>
        </div>
    );
}

interface StatColumnProps {
    value: string | number;
    label: string;
    color: string;
}
function StatColumn({ value, label, color }: StatColumnProps) {
    return (
        <div>
            <div className={`text-xl font-bold ${color}`}>{value}</div>
            <small className="text-gray-500">{label}</small>
        </div>
    );
}
