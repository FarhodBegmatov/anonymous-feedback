import { PageProps as InertiaPageProps } from '@inertiajs/core';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '@/layouts/AdminLayout';

interface LocalizedName {
    uz: string;
    en?: string;
    ru?: string;
}

interface Feedback {
    id: number;
    comment: string;
    grade: string;
    rating: number;
}

interface Department {
    id: number;
    name: LocalizedName;
    feedback_count?: number;
    average?: number;
    feedbacks?: Feedback[];
}

interface Faculty {
    id: number;
    name: LocalizedName;
}

interface DashboardProps extends InertiaPageProps {
    type?: 'faculty' | 'department';
    faculty?: Faculty | null;
    departments?: Department[];
    department?: Department | null;
    feedbacks?: Feedback[] | null;
    average?: number | null;
    message?: string | null;
}

export default function Dashboard() {
    const { props } = usePage<DashboardProps>();
    const {
        type,
        faculty = null,
        departments = [],
        department = null,
        feedbacks = [],
        average = null,
        message = null,
    } = props;

    const [showFeedbacks, setShowFeedbacks] = useState(false);
    const [selectedDepartment, setSelectedDepartment] =
        useState<Department | null>(null);
    const [deptFeedbacks, setDeptFeedbacks] = useState<Feedback[]>([]);
    const [deptAverage, setDeptAverage] = useState<number | null>(null);

    const showDepartmentStats = (dept: Department) => {
        setSelectedDepartment(dept);
        setDeptFeedbacks(dept.feedbacks ?? []);
        setDeptAverage(dept.average ?? 0);
    };

    if (message) {
        return (
            <AdminLayout title="Xabar">
                <div className="flex items-center justify-center h-[70vh]">
                    <div className="max-w-md rounded-xl bg-white p-8 text-center shadow-lg">
                        <p className="text-lg text-gray-700">{message}</p>
                    </div>
                </div>
            </AdminLayout>
        );
    }

    if (type === 'faculty' && faculty) {
        return (
            <AdminLayout title="Fakultet boshqaruvi">
                <div className="mx-auto max-w-5xl">
                    <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
                        🎓 {faculty.name.uz} fakulteti
                    </h1>

                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                        {departments.map((dept) => (
                            <div
                                key={dept.id}
                                className="rounded-xl bg-white p-6 shadow-md"
                            >
                                <h2 className="text-lg font-semibold">
                                    {dept.name.uz}
                                </h2>
                                <p className="mt-2 text-gray-600">
                                    Feedbacklar: {dept.feedback_count ?? 0}
                                </p>
                                <p className="text-gray-600">
                                    O‘rtacha baho: {dept.average ?? 0}
                                </p>
                                <button
                                    className="mt-3 w-full rounded bg-indigo-500 px-4 py-2 text-white hover:bg-indigo-600"
                                    onClick={() => showDepartmentStats(dept)}
                                >
                                    Ko‘rish
                                </button>
                            </div>
                        ))}
                    </div>

                    {selectedDepartment && (
                        <div className="mt-10 rounded-xl bg-white p-6 shadow-md">
                            <h2 className="mb-4 text-xl font-semibold">
                                🧑‍🏫 {selectedDepartment.name.uz} kafedrasi
                            </h2>
                            <p className="mb-2">
                                O‘rtacha baho: {deptAverage ?? 0}
                            </p>
                            <p className="mb-4">
                                Feedbacklar soni: {deptFeedbacks.length}
                            </p>

                            {deptFeedbacks.length > 0 ? (
                                <ul className="space-y-2">
                                    {deptFeedbacks.map((fb) => (
                                        <li
                                            key={fb.id}
                                            className="rounded border bg-gray-50 p-3"
                                        >
                                            <p>{fb.comment}</p>
                                            <p className="text-sm text-gray-500">
                                                ⭐ {fb.rating}/5
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-500 italic">
                                    Hozircha fikrlar yo‘q.
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </AdminLayout>
        );
    }

    if (type === 'department' && department) {
        return (
            <AdminLayout title="Kafedra boshqaruvi">
                <div className="mx-auto max-w-7xl">
                    <div className="mx-auto mt-10 max-w-7xl rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                        <h1 className="mb-8 text-center text-3xl font-semibold text-gray-800">
                            🧑‍🏫{' '}
                            <span className="text-indigo-600">
                                {department.name.uz}
                            </span>{' '}
                            kafedrasi
                        </h1>

                        <div className="mb-6 grid grid-cols-2 gap-6">
                            <div className="flex flex-col items-center justify-center rounded-xl bg-gray-50 p-5 transition hover:bg-indigo-50">
                                <div className="text-sm text-gray-500 uppercase">
                                    O‘rtacha baho
                                </div>
                                <div className="mt-1 text-4xl font-bold text-indigo-700">
                                    {average ?? 0}
                                </div>
                            </div>

                            <div className="flex flex-col items-center justify-center rounded-xl bg-gray-50 p-5 transition hover:bg-indigo-50">
                                <div className="text-sm text-gray-500 uppercase">
                                    Feedbacklar soni
                                </div>
                                <div className="mt-1 text-4xl font-bold text-indigo-700">
                                    {(feedbacks ?? []).length}
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 text-center">
                            <button
                                onClick={() => setShowFeedbacks(!showFeedbacks)}
                                className="rounded-lg bg-indigo-600 px-6 py-2 font-medium text-white transition hover:bg-indigo-700"
                            >
                                {showFeedbacks
                                    ? 'Yopish'
                                    : 'Feedbacklarni ko‘rish'}
                            </button>
                        </div>
                    </div>

                    {showFeedbacks && (
                        <div className="mt-10">
                            {(feedbacks ?? []).length > 0 ? (
                                <ul className="space-y-3">
                                    {(feedbacks ?? []).map((fb) => (
                                        <li
                                            key={fb.id}
                                            className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md"
                                        >
                                            <p className="text-gray-700">
                                                {fb.comment}
                                            </p>
                                            <p className="mt-1 text-sm text-gray-500">
                                                ⭐ {fb.rating}/5
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="mt-4 text-center text-gray-500 italic">
                                    Hozircha fikrlar yo‘q.
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout title="Ma’lumot topilmadi">
            <div className="flex items-center justify-center h-[70vh]">
                <p className="text-lg text-gray-700">Ma’lumot topilmadi.</p>
            </div>
        </AdminLayout>
    );
}
