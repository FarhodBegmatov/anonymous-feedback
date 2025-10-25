import AdminLayout from '@/layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Department = {
    id: number;
    faculty?: { name?: { en: string; uz?: string; ru?: string } };
    name: { en: string; uz: string; ru: string };
};

interface Props {
    departments: Department[];
    flash?: {
        success?: string;
        error?: string;
    };
}

export default function Index({ departments, flash }: Props) {
    const { delete: destroy } = useForm();

    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this department?')) {
            destroy(`/admin/departments/${id}`, {
                onSuccess: () => {
                    toast.success('Department deleted successfully');
                },
                onError: () => {
                    toast.error('Error deleting department');
                },
                preserveScroll: true,
            });
        }
    };

    return (
        <AdminLayout title={'Departments'}>
            <Head title="Departments" />
            <ToastContainer position="top-right" autoClose={3000} />

            <div className="mx-auto mt-10 max-w-7xl rounded-2xl bg-white p-6 shadow-lg">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-semibold text-gray-800">
                        Departments
                    </h1>
                    <div className="flex items-center space-x-3">
                        <Link
                            href="/admin/managers"
                            className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
                        >
                            Managers
                        </Link>
                        <Link
                            href="/admin/faculties"
                            className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
                        >
                            Faculties
                        </Link>
                        <Link
                            href="/admin/departments/create"
                            className="rounded-lg bg-green-600 px-4 py-2 text-white transition hover:bg-green-700"
                        >
                            + Create Department
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
                                    Faculty
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
                            {departments.length > 0 ? (
                                departments.map((dep, index) => (
                                    <tr
                                        key={dep.id}
                                        className="transition hover:bg-gray-50"
                                    >
                                        <td className="border border-gray-200 px-4 py-2">
                                            {index + 1}
                                        </td>
                                        <td className="border border-gray-200 px-4 py-2">
                                            {dep.faculty?.name?.en || '-'}
                                        </td>
                                        <td className="border border-gray-200 px-4 py-2">
                                            {dep.name.en}
                                        </td>
                                        <td className="border border-gray-200 px-4 py-2">
                                            {dep.name.uz}
                                        </td>
                                        <td className="border border-gray-200 px-4 py-2">
                                            {dep.name.ru}
                                        </td>
                                        <td className="space-x-2 border border-gray-200 px-4 py-2 text-center">
                                            <Link
                                                href={`/admin/departments/${dep.id}/edit`}
                                                className="rounded bg-yellow-500 px-3 py-1 text-white transition hover:bg-yellow-600"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() =>
                                                    handleDelete(dep.id)
                                                }
                                                type="button"
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
                                        colSpan={6}
                                        className="px-4 py-4 text-center text-gray-500"
                                    >
                                        No departments found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}
