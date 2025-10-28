import type { Faculty} from '@/types/Ratings';
import { Link } from '@inertiajs/react';

interface FacultyCardProps {
    faculty: Faculty;
    locale: string;
    translations: Record<string, string>;
    index: number;
    hoveredFaculty: number | null;
    setHoveredFaculty: (id: number | null) => void;
}

const getRatingColors = (rating: number) => {
    if (rating >= 4.0)
        return { textColor: 'text-green-600', bgColor: 'bg-green-500' };
    if (rating < 3.0)
        return { textColor: 'text-red-600', bgColor: 'bg-red-500' };
    return { textColor: 'text-yellow-600', bgColor: 'bg-yellow-500' };
};

export default function FacultyCard({
    faculty,
    locale,
    translations,
    index,
    hoveredFaculty,
    setHoveredFaculty,
}: FacultyCardProps) {
    return (
        <div
            onMouseEnter={() => setHoveredFaculty(faculty.id)}
            onMouseLeave={() => setHoveredFaculty(null)}
            className={`transform rounded-2xl border border-gray-200 bg-white p-6 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl ${
                hoveredFaculty === faculty.id ? 'scale-[1.02]' : ''
            }`}
        >
            <div className="mb-4 flex items-center justify-between border-b pb-2">
                <h2 className="flex items-center text-xl font-semibold text-blue-800">
                    <i className="fas fa-building mr-2 text-yellow-500"></i>
                    {faculty.name[locale] ?? faculty.name.uz ?? faculty.name.en}
                </h2>
                <span className="rounded-full bg-blue-100 px-3 py-1 font-semibold text-blue-800">
                    #{index + 1}
                </span>
            </div>

            {/* Fakultet o‘rtacha bahosi */}
            <div className="mb-4">
                <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-700">
                        {translations.average_grade}:
                    </span>
                    <span
                        className={`text-lg font-bold ${
                            getRatingColors(faculty.average_grade ?? 0)
                                .textColor
                        }`}
                    >
                        {faculty.average_grade
                            ? faculty.average_grade.toFixed(1)
                            : '–'}
                    </span>
                </div>
                <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-gray-200">
                    <div
                        className={`h-3 transition-all duration-700 ease-out ${
                            getRatingColors(faculty.average_grade ?? 0).bgColor
                        }`}
                        style={{
                            width: `${((faculty.average_grade ?? 0) / 5) * 100}%`,
                        }}
                    ></div>
                </div>
            </div>

            {/* Bo‘limlar ro‘yxati */}
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
                                            {dept.name[locale] ??
                                                dept.name.uz ??
                                                dept.name.en}
                                        </span>
                                        <p className="text-sm text-gray-500">
                                            {translations.feedback_count}:{' '}
                                            {dept.feedback_count}
                                        </p>
                                    </div>
                                    <div className="text-right font-semibold text-blue-700">
                                        {dept.average_grade
                                            ? dept.average_grade.toFixed(1)
                                            : '–'}
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
    );
}
