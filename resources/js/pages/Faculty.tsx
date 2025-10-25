import Layout from '@/components/Layout';
import type { FacultyPageProps } from '@/types/FacultyPage';
import { Link } from '@inertiajs/react';

export default function FacultyPage({
    faculty,
    departments,
    locale,
    translations,
}: FacultyPageProps) {
    return (
        <Layout locale={locale} translations={translations}>
            <div className="bg-gradient-to-br from-blue-50 to-gray-100">
                {/* Faculty name */}
                <div className="mb-6 rounded-lg bg-blue-900 p-6 text-white shadow">
                    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                        <h2 className="flex items-center text-2xl font-semibold">
                            <i className="fas fa-building mr-2 text-yellow-400"></i>
                            {faculty.name[locale] ?? faculty.name['en']}
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
                <h3 className="mb-4 flex items-center text-xl font-semibold text-blue-800">
                    <i className="fas fa-sitemap mr-2 text-yellow-500"></i>
                    {translations.departments_sections}
                </h3>

                {departments.length > 0 ? (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {departments.map((dept) => (
                            <div
                                key={dept.id}
                                className="flex h-full flex-col rounded-lg border bg-white shadow transition hover:shadow-lg"
                            >
                                <div className="p-4">
                                    <h5 className="mb-3 text-lg font-medium text-blue-700">
                                        {dept.name[locale] ?? dept.name['en']}
                                    </h5>

                                    {/* Statistics */}
                                    <div className="mb-3 grid grid-cols-3 text-center text-sm">
                                        <div>
                                            <div className="font-bold text-blue-600">
                                                {dept.feedback_count}
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
                                                    '-'}
                                            </div>
                                            <p className="text-gray-900">
                                                {translations.good}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Rating distribution */}
                                    <div>
                                        <small className="mb-1 block text-gray-500">
                                            {translations.score_distribution}:
                                        </small>
                                        <div className="flex gap-2">
                                            <div className="flex-1">
                                                <div className="h-1.5 w-full rounded bg-gray-200">
                                                    <div
                                                        className="h-1.5 rounded bg-green-500"
                                                        style={{
                                                            width: '58.3%',
                                                        }}
                                                    ></div>
                                                </div>
                                                <small className="text-green-600">
                                                    👍{' '}
                                                    {dept.good_feedback_count ??
                                                        '-'}
                                                </small>
                                            </div>
                                            <div className="flex-1">
                                                <div className="h-1.5 w-full rounded bg-gray-200">
                                                    <div
                                                        className="h-1.5 rounded bg-yellow-500"
                                                        style={{
                                                            width: '16.7%',
                                                        }}
                                                    ></div>
                                                </div>
                                                <small className="text-yellow-600">
                                                    🤝{' '}
                                                    {dept.average_feedback_count ??
                                                        '-'}
                                                </small>
                                            </div>
                                            <div className="flex-1">
                                                <div className="h-1.5 w-full rounded bg-gray-200">
                                                    <div
                                                        className="h-1.5 rounded bg-red-500"
                                                        style={{
                                                            width: '25%',
                                                        }}
                                                    ></div>
                                                </div>
                                                <small className="text-red-600">
                                                    👎{' '}
                                                    {dept.bad_feedback_count ??
                                                        '-'}
                                                </small>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Action button */}
                                <div className="mt-auto border-t p-4">
                                    <Link
                                        href={`/feedback/${dept.id}/`}
                                        className="flex w-full items-center justify-center rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
                                    >
                                        <i className="fas fa-star mr-2"></i>
                                        {translations.give_feedback}
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">
                        {translations.no_departments}
                    </p>
                )}

                {/* Back button */}
                <div className="mt-6">
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
