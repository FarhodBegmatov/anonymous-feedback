import { Link, useForm } from '@inertiajs/react';

interface Faculty {
    id: number;
    name: {
        uz: string;
        en: string;
        ru: string;
    };
}

export default function Index({ faculties }: { faculties: Faculty[] }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this faculty?')) {
            destroy(`/admin/faculties/${id}`);
        }
    };

    return (
        <div className="mx-auto mt-10 max-w-7xl rounded-2xl bg-white p-6 shadow-lg">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-gray-800">
                    Faculties
                </h1>

                {/* O'ng tomondagi linklar uchun flex container */}
                <div className="flex items-center space-x-3">
                    <Link
                        href="/admin/departments"
                        className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
                    >
                        Departments
                    </Link>
                    <Link
                        href="/admin/faculties/create"
                        className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
                    >
                        + Create Faculty
                    </Link>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200 text-left text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border border-gray-200 px-4 py-2">
                                #
                            </th>
                            <th className="border border-gray-200 px-4 py-2">
                                Name (EN)
                            </th>
                            <th className="border border-gray-200 px-4 py-2">
                                Name (UZ)
                            </th>
                            <th className="border border-gray-200 px-4 py-2">
                                Name (RU)
                            </th>
                            <th className="border border-gray-200 px-4 py-2 text-center">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {faculties.length > 0 ? (
                            faculties.map((faculty, index) => (
                                <tr
                                    key={faculty.id}
                                    className="transition hover:bg-gray-50"
                                >
                                    <td className="border border-gray-200 px-4 py-2">
                                        {index + 1}
                                    </td>
                                    <td className="border border-gray-200 px-4 py-2">
                                        {faculty.name.en}
                                    </td>
                                    <td className="border border-gray-200 px-4 py-2">
                                        {faculty.name.uz}
                                    </td>
                                    <td className="border border-gray-200 px-4 py-2">
                                        {faculty.name.ru}
                                    </td>
                                    <td className="space-x-2 border border-gray-200 px-4 py-2 text-center">
                                        <Link
                                            href={`/admin/faculties/${faculty.id}/edit`}
                                            className="rounded bg-yellow-500 px-3 py-1 text-white transition hover:bg-yellow-600"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleDelete(faculty.id)
                                            }
                                            className="rounded bg-red-600 px-3 py-1 text-white transition hover:bg-red-700"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="px-4 py-4 text-center text-gray-500"
                                >
                                    No faculties found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
