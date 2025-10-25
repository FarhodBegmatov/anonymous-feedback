import Layout from '@/components/Layout';
import type { HomePageProps, RatingColors } from '@/types/Home';
import { Link } from '@inertiajs/react';

export default function Home({
    faculties,
    locale,
    translations,
    total_faculties,
    total_feedbacks,
    global_average_grade,
}: HomePageProps) {
    const getRatingColors = (rating: number): RatingColors => {
        if (rating >= 4) {
            return { ratingColor: 'text-green-600', barColor: 'bg-green-500' };
        } else if (rating >= 3) {
            return { ratingColor: 'text-yellow-500', barColor: 'bg-yellow-500' };
        } else if (rating > 0) {
            return { ratingColor: 'text-red-500', barColor: 'bg-red-500' };
        }
        return { ratingColor: 'text-gray-500', barColor: 'bg-gray-400' };
    };
    return (
        <Layout translations={translations} locale={locale}>
            {/* Hero Section */}
            <div className="mx-auto mt-10 mb-12 max-w-7xl px-4 text-center">
                <h4 className="text-3xl leading-snug font-extrabold text-blue-700 md:text-5xl">
                    {translations.hero_title}
                </h4>
                <p className="mt-4 text-lg font-semibold text-gray-600">
                    {translations.hero_subtitle}
                </p>
            </div>

            {/* Global Statistics Section */}
            <div className="mx-auto mb-10 max-w-7xl px-4">
                <div className="grid grid-cols-1 gap-6 text-center sm:grid-cols-3">
                    {/* Total Faculties */}
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-500 p-6 text-white shadow-lg transition-transform duration-300 hover:scale-105">
                        <div className="absolute m-3 rounded-full bg-white/20 p-3">
                            <i className="fas fa-city text-3xl text-white"></i>
                        </div>
                        <div className="text-4xl font-extrabold">
                            {total_faculties}
                        </div>
                        <div className="mt-2 text-lg opacity-90">
                            {translations.total_faculties || 'Total Faculties'}
                        </div>
                    </div>

                    {/* Total Feedbacks */}
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white shadow-lg transition-transform duration-300 hover:scale-105">
                        <div className="absolute m-3 rounded-full bg-white/20 p-3">
                            <i className="fas fa-comments text-3xl text-white"></i>
                        </div>
                        <div className="text-4xl font-extrabold">
                            {total_feedbacks}
                        </div>
                        <div className="mt-2 text-lg opacity-90">
                            {translations.total_feedbacks ||
                                'Total Feedbacks'}
                        </div>
                    </div>

                    {/* Global Average Grade */}
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-orange-400 to-pink-500 p-6 text-white shadow-lg transition-transform duration-300 hover:scale-105">
                        <div className="absolute m-3 rounded-full bg-white/20 p-3">
                            <i className="fas fa-star text-3xl text-white"></i>
                        </div>
                        <div className="text-4xl font-extrabold">
                            {global_average_grade ?? '-'}
                        </div>
                        <div className="mt-2 text-lg opacity-90">
                            {translations.global_average_grade || 'Global Average'}
                        </div>
                    </div>
                </div>
            </div>

            {/* Faculties List */}
            <div className="mx-auto max-w-7xl px-4">
                <h1 className="mb-6 border-b pb-2 text-3xl font-semibold text-gray-800">
                    {translations.faculties_centers}
                </h1>

                {faculties.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {faculties.map((faculty) => {
                            const rating = faculty.average_grade ?? 0;
                            const progressWidth = `${(rating / 5) * 100}%`;
                            const { ratingColor, barColor } = getRatingColors(rating);

                            return (
                                <div
                                    key={faculty.id}
                                    className="flex h-full transform flex-col rounded-xl border bg-white shadow-sm transition duration-200 hover:scale-[1.02] hover:shadow-xl"
                                >
                                    {/* Header */}
                                    <div className="rounded-t-xl bg-blue-900 px-4 py-3 text-white">
                                        <h2 className="flex items-center text-lg font-semibold">
                                            <i className="fas fa-building mr-2 text-yellow-400"></i>
                                            {faculty.name[locale] ??
                                                faculty.name.en}
                                        </h2>
                                    </div>

                                    {/* Body */}
                                    <div className="flex-1 p-5">
                                        <div className="mb-4 grid grid-cols-3 text-center">
                                            <div>
                                                <div className="text-xl font-bold text-blue-600">
                                                    {faculty.departments_count}
                                                </div>
                                                <small className="text-gray-500">
                                                    {
                                                        translations.departments_count
                                                    }
                                                </small>
                                            </div>
                                            <div>
                                                <div className="text-xl font-bold text-green-600">
                                                    {faculty.feedback_count}
                                                </div>
                                                <small className="text-gray-500">
                                                    {
                                                        translations.feedback_count
                                                    }
                                                </small>
                                            </div>
                                            <div>
                                                <div
                                                    className={`text-xl font-bold ${ratingColor}`}
                                                >
                                                    {faculty.average_grade !=
                                                    null
                                                        ? faculty.average_grade.toFixed(
                                                              1,
                                                          )
                                                        : translations.no_feedback}
                                                </div>
                                                <small className="text-gray-500">
                                                    {translations.average_grade}
                                                </small>
                                            </div>
                                        </div>

                                        {/* Progress bar */}
                                        <div className="mb-3 h-3 w-full rounded-full bg-gray-200">
                                            <div
                                                className={`${barColor} h-3 rounded-full`}
                                                style={{ width: progressWidth }}
                                            ></div>
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
                ) : (
                    <p className="text-center text-gray-500">
                        {translations.no_faculties}
                    </p>
                )}
            </div>
        </Layout>
    );
}
