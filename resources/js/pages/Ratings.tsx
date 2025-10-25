import Layout from '@/components/Layout';
import type { RatingColorClass, RatingsPageProps } from '@/types/Ratings';
import { Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Ratings({ faculties, locale, translations }: RatingsPageProps) {
    const getRatingColors = (rating: number): RatingColorClass => {
        if (rating >= 4.0) {
            return { textColor: 'text-green-600', bgColor: 'bg-green-500' };
        } else if (rating < 3.0) {
            return { textColor: 'text-red-600', bgColor: 'bg-red-500' };
        }
        return { textColor: 'text-yellow-600', bgColor: 'bg-yellow-600' };
    };
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
            <h1 className="mb-10 text-center text-3xl font-bold tracking-wide text-blue-900 md:text-4xl">
                {translations.all_faculty_ratings}
            </h1>

            {sortedFaculties.length > 0 ? (
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    {sortedFaculties.map((faculty, index) => (
                        <div
                            key={faculty.id}
                            onMouseEnter={() => setHoveredFaculty(faculty.id)}
                            onMouseLeave={() => setHoveredFaculty(null)}
                            className={`transform rounded-2xl border border-gray-200 bg-white p-6 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl ${
                                hoveredFaculty === faculty.id
                                    ? 'scale-[1.02]'
                                    : ''
                            }`}
                        >
                            <div className="mb-4 flex items-center justify-between border-b pb-2">
                                <h2 className="flex items-center text-xl font-semibold text-blue-800">
                                    <i className="fas fa-building mr-2 text-yellow-500"></i>
                                    {faculty.name[locale] ?? faculty.name.en}
                                </h2>
                                <span className="rounded-full bg-blue-100 px-3 py-1 font-semibold text-blue-800">
                                    #{index + 1}
                                </span>
                            </div>

                            <div className="mb-4">
                                <div className="flex items-center justify-between">
                                    <span className="font-medium text-gray-700">
                                        {translations.average_grade}:
                                    </span>
                                    <span
                                        className={`text-lg font-bold ${getRatingColors(faculty.average_grade ?? 0).textColor}`}
                                    >
                                        {faculty.average_grade
                                            ? Number(faculty.average_grade).toFixed(1)
                                            : '–'}
                                    </span>
                                </div>
                                <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-gray-200">
                                    <div
                                        className={`h-3 transition-all duration-700 ease-out ${getRatingColors(faculty.average_grade ?? 0).bgColor}`}
                                        style={{
                                            width: `${((faculty.average_grade ?? 0) / 5) * 100}%`,
                                        }}
                                    ></div>
                                </div>
                            </div>

                            <div className="mt-4">
                                <h3 className="mb-2 text-lg font-semibold text-gray-700">
                                    {translations.departments}
                                </h3>
                                {faculty.departments.length > 0 ? (
                                    <div className="scrollbar-thin scrollbar-thumb-blue-300 max-h-48 space-y-2 overflow-y-auto">
                                        {faculty.departments
                                            .sort(
                                                (a, b) =>
                                                    (b.average_grade ?? 0) -
                                                    (a.average_grade ?? 0),
                                            )
                                            .map((dept) => (
                                                <div
                                                    key={dept.id}
                                                    className="flex items-center justify-between rounded-lg border bg-gray-50 px-3 py-2 transition hover:bg-blue-50"
                                                >
                                                    <div>
                                                        <span className="font-medium text-gray-800">
                                                            {dept.name[
                                                                locale
                                                            ] ?? dept.name.en}
                                                        </span>
                                                        <p className="text-sm text-gray-500">
                                                            {
                                                                translations.feedback_count
                                                            }
                                                            :{' '}
                                                            {
                                                                dept.feedback_count
                                                            }
                                                        </p>
                                                    </div>
                                                    <div className="text-right">
                                                        <span className="font-semibold text-blue-700">
                                                            {dept.average_grade
                                                                ? Number(
                                                                      dept.average_grade,
                                                                  ).toFixed(1)
                                                                : '–'}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500">
                                        {translations.no_departments}
                                    </p>
                                )}
                            </div>

                            <div className="mt-6 text-right">
                                <Link
                                    href={`/faculty/${faculty.id}`}
                                    className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
                                >
                                    {translations.view_sections}
                                    <i className="fas fa-arrow-right ml-2"></i>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500">
                    {translations.no_faculties}
                </p>
            )}

            {/* Best and Worst Departments */}
            <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
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
                                    <span>{d.name[locale] ?? d.name.en}</span>
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
                                    <span>{d.name[locale] ?? d.name.en}</span>
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
