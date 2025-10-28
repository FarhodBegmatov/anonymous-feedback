import FacultyCard from '@/components/FacultyCard';
import Layout from '@/components/Layout';
import StatCard from '@/components/StatCard';
import type { RatingsPageProps } from '@/types/Ratings';
import { useState } from 'react';

export default function Ratings({
    faculties,
    locale,
    translations,
    statistics,
}: RatingsPageProps) {
    const [hoveredFaculty, setHoveredFaculty] = useState<number | null>(null);

    const sortedFaculties = [...faculties].sort(
        (a, b) => (b.average_grade ?? 0) - (a.average_grade ?? 0),
    );

    const allDepartments = faculties.flatMap((f) => f.departments);
    const bestDepartments = allDepartments.filter(
        (d) => (d.average_grade ?? 0) >= 4.5,
    );
    const worstDepartments = allDepartments.filter(
        (d) => (d.average_grade ?? 0) <= 3,
    );

    return (
        <Layout translations={translations} locale={locale}>
            <h1 className="mb-6 text-center text-3xl font-bold text-blue-900 md:text-4xl">
                {translations.all_faculty_ratings}
            </h1>

            {/* Stat Cards */}
            <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    icon="fa-university"
                    label={translations.total_faculties}
                    value={statistics?.total_faculties || 0}
                    gradient="from-blue-600 to-indigo-500"
                />
                <StatCard
                    icon="fa-building"
                    label={translations.total_departments}
                    value={statistics?.total_departments || 0}
                    gradient="from-green-500 to-emerald-600"
                />
                <StatCard
                    icon="fa-comment-alt"
                    label={translations.total_feedbacks}
                    value={statistics?.total_feedbacks || 0}
                    gradient="from-purple-500 to-pink-500"
                />
                <StatCard
                    icon="fa-star"
                    label={translations.average_rating}
                    value={
                        statistics?.average_faculty_rating?.toFixed(1) ?? '0.0'
                    }
                    gradient="from-yellow-400 to-orange-500"
                />
            </div>

            {/* Faculties */}
            {sortedFaculties.length > 0 ? (
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    {sortedFaculties.map((faculty, index) => (
                        <FacultyCard
                            key={faculty.id}
                            faculty={faculty}
                            locale={locale}
                            translations={translations}
                            index={index}
                            hoveredFaculty={hoveredFaculty}
                            setHoveredFaculty={setHoveredFaculty}
                        />
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500">
                    {translations.no_faculties}
                </p>
            )}

            {/* Best & Worst Departments */}
            <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
                {/* Best */}
                <div className="rounded-2xl border border-green-200 bg-green-50 p-6 shadow-inner">
                    <h2 className="mb-4 text-2xl font-bold text-green-700">
                        🌟 {translations.best_departments}
                    </h2>
                    {bestDepartments.length > 0 ? (
                        <ul className="space-y-2">
                            {bestDepartments.map((d) => (
                                <li
                                    key={d.id}
                                    className="flex justify-between border-b pb-2 font-medium text-green-800"
                                >
                                    <span>
                                        {d.name[locale] ??
                                            d.name.uz ??
                                            d.name.en}
                                    </span>
                                    <span>{d.average_grade?.toFixed(1)}</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-600">
                            {translations.no_results}
                        </p>
                    )}
                </div>

                {/* Worst */}
                <div className="rounded-2xl border border-red-200 bg-red-50 p-6 shadow-inner">
                    <h2 className="mb-4 text-2xl font-bold text-red-700">
                        ⚠️ {translations.worst_departments}
                    </h2>
                    {worstDepartments.length > 0 ? (
                        <ul className="space-y-2">
                            {worstDepartments.map((d) => (
                                <li
                                    key={d.id}
                                    className="flex justify-between border-b pb-2 font-medium text-red-800"
                                >
                                    <span>
                                        {d.name[locale] ??
                                            d.name.uz ??
                                            d.name.en}
                                    </span>
                                    <span>{d.average_grade?.toFixed(1)}</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-600">
                            {translations.no_results}
                        </p>
                    )}
                </div>
            </div>
        </Layout>
    );
}
