import Layout from '@/components/Layout';
import Pagination from '@/components/Pagination';
import { Link, router } from '@inertiajs/react';
import { useCallback, useEffect, useState } from 'react';

interface LocalizedName {
    en: string;
    uz: string;
    ru: string;
    [key: string]: string | undefined;
}

interface Department {
    id: number;
    name: LocalizedName;
    feedback_count: number;
    average_grade: number | null;
    good_feedback_count: number;
    average_feedback_count: number;
    bad_feedback_count: number;
}

interface Faculty {
    id: number;
    name: LocalizedName;
    department_count: number;
    feedback_count: number;
    average_grade: number | null;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedDepartments {
    data: Department[];
    links: PaginationLink[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface FacultyPageProps {
    faculty: Faculty;
    departments: PaginatedDepartments;
    locale: 'en' | 'uz' | 'ru';
    translations: Record<string, string>;
}

export default function FacultyPage({
    faculty,
    departments,
    locale,
    translations,
}: FacultyPageProps) {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = useCallback((query: string): void => {
        router.get(
            window.location.pathname,
            { search: query },
            { preserveState: true },
        );
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            handleSearch(searchQuery);
        }, 300);

        return () => clearTimeout(timer);
    }, [searchQuery, handleSearch]);

    return (
        <Layout locale={locale} translations={translations}>
            <div className="bg-gradient-to-br from-blue-50 to-gray-100">
                {/* Faculty name */}
                <div className="mb-6 rounded-lg bg-blue-900 p-6 text-white shadow">
                    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                        <h2 className="flex items-center text-2xl font-semibold">
                            <i className="fas fa-building mr-2 text-yellow-400"></i>
                            {faculty.name?.[locale] ?? faculty.name?.en ?? '—'}
                        </h2>
                    </div>
                </div>

                {/* Statistics */}
                <div className="mb-6 grid gap-4 sm:grid-cols-3">
                    <div className="rounded-lg bg-gray-100 p-4 text-center shadow">
                        <i className="fas fa-list fa-2x mb-2 text-blue-600"></i>
                        <h4 className="text-xl font-bold text-blue-600">
                            {faculty.department_count ?? '—'}
                        </h4>
                        <p className="text-gray-600">
                            {translations.departments_sections}
                        </p>
                    </div>

                    <div className="rounded-lg bg-gray-100 p-4 text-center shadow">
                        <i className="fas fa-comments fa-2x mb-2 text-green-600"></i>
                        <h4 className="text-xl font-bold text-green-600">
                            {faculty.feedback_count ?? '—'}
                        </h4>
                        <p className="text-gray-600">
                            {translations.feedbacks}
                        </p>
                    </div>

                    <div className="rounded-lg bg-gray-100 p-4 text-center shadow">
                        <i className="fas fa-star fa-2x mb-2 text-yellow-500"></i>
                        <h4 className="text-xl font-bold text-yellow-500">
                            {faculty.average_grade ?? '-'}
                        </h4>
                        <p className="text-gray-600">
                            {translations.average_grade}
                        </p>
                    </div>
                </div>

                {/* Departments list */}
                <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <h3 className="flex items-center text-xl font-semibold text-blue-800">
                        <i className="fas fa-sitemap mr-2 text-yellow-500"></i>
                        {translations.departments_sections}
                    </h3>
                    <div className="relative w-full md:w-96">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={
                                translations.search_departments ||
                                'Search departments...'
                            }
                            className="w-full rounded-lg border border-gray-300 py-2 pr-10 pl-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        />
                        <div className="absolute top-1/2 right-2 -translate-y-1/2 text-gray-500">
                            <i className="fas fa-search"></i>
                        </div>
                    </div>
                </div>

                {departments.data?.length ? (
                    <>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {departments.data.map((dept: Department) => (
                                <div
                                    key={dept.id}
                                    className="flex h-full flex-col rounded-lg border bg-white shadow transition hover:shadow-lg"
                                >
                                    <div className="p-4">
                                        <h5 className="mb-3 text-lg font-medium text-blue-700">
                                            {dept.name?.[locale] ??
                                                dept.name?.en ??
                                                '—'}
                                        </h5>

                                        <div className="mb-3 grid grid-cols-3 text-center text-sm">
                                            <div>
                                                <div className="font-bold text-blue-600">
                                                    {dept.feedback_count ?? 0}
                                                </div>
                                                <p className="text-gray-500">
                                                    {translations.feedbacks}
                                                </p>
                                            </div>
                                            <div>
                                                <div className="font-bold text-yellow-600">
                                                    {dept.average_grade ?? '—'}
                                                </div>
                                                <p className="text-gray-500">
                                                    {translations.rating}
                                                </p>
                                            </div>
                                            <div>
                                                <div className="font-bold text-green-600">
                                                    {dept.good_feedback_count ??
                                                        0}
                                                </div>
                                                <p className="text-gray-900">
                                                    {translations.good}
                                                </p>
                                            </div>
                                        </div>

                                        <div>
                                            <small className="mb-1 block text-gray-500">
                                                {
                                                    translations.score_distribution
                                                }
                                                :
                                            </small>
                                            <div className="flex gap-2">
                                                <div className="flex-1">
                                                    <div className="h-1.5 w-full rounded bg-gray-200">
                                                        <div
                                                            className="h-1.5 rounded bg-green-500"
                                                            style={{
                                                                width: `${dept.good_feedback_count ?? 0}%`,
                                                            }}
                                                        ></div>
                                                    </div>
                                                    <small className="text-green-600">
                                                        👍{' '}
                                                        {dept.good_feedback_count ??
                                                            0}
                                                    </small>
                                                </div>
                                                <div className="flex-1">
                                                    <div className="h-1.5 w-full rounded bg-gray-200">
                                                        <div
                                                            className="h-1.5 rounded bg-yellow-500"
                                                            style={{
                                                                width: `${dept.average_feedback_count ?? 0}%`,
                                                            }}
                                                        ></div>
                                                    </div>
                                                    <small className="text-yellow-600">
                                                        🤝{' '}
                                                        {dept.average_feedback_count ??
                                                            0}
                                                    </small>
                                                </div>
                                                <div className="flex-1">
                                                    <div className="h-1.5 w-full rounded bg-gray-200">
                                                        <div
                                                            className="h-1.5 rounded bg-red-500"
                                                            style={{
                                                                width: `${dept.bad_feedback_count ?? 0}%`,
                                                            }}
                                                        ></div>
                                                    </div>
                                                    <small className="text-red-600">
                                                        👎{' '}
                                                        {dept.bad_feedback_count ??
                                                            0}
                                                    </small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-auto border-t p-4">
                                        <Link
                                            href={`/feedback/${dept.id}`}
                                            className="block w-full rounded bg-blue-600 px-4 py-2 text-center font-medium text-white hover:bg-blue-700"
                                        >
                                            {translations.give_feedback}
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Pagination
                            links={departments.links}
                            className="mt-8"
                        />
                    </>
                ) : (
                    <div className="rounded-lg bg-white p-8 text-center shadow">
                        <i className="fas fa-inbox mb-4 text-4xl text-gray-400"></i>
                        <p className="text-gray-600">
                            {translations.no_results || 'No faculties found matching your search'}
                        </p>
                    </div>
                )}

                <div className="mt-8">
                    <Link
                        href={`/`}
                        className="inline-flex items-center rounded border border-blue-600 px-4 py-2 text-blue-600 hover:bg-blue-50"
                    >
                        <i className="fas fa-arrow-left mr-2"></i>
                        {translations.back_to_list}
                    </Link>
                </div>
            </div>
        </Layout>
    );
}
