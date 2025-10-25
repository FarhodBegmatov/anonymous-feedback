import PageHeader from '@/components/PageHeader';
import { useDelete } from '@/hooks/useDelete';
import AdminLayout from '@/layouts/AdminLayout';
import type { Department, DepartmentsPageProps } from '@/types/Department';
import { Head, Link } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Index({ departments, flash }: DepartmentsPageProps) {
    const { deleteResource, isDeleting } = useDelete({
        resourceName: 'department',
    });

    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);

    const handleDelete = async (id: number) => {
        await deleteResource(`/admin/departments/${id}`);
    };

    return (
        <AdminLayout title={'Departments'}>
            <Head title="Departments" />
            <ToastContainer position="top-right" autoClose={3000} />

            <div className="mx-auto mt-10 max-w-7xl rounded-2xl bg-white p-6 shadow-lg">
                <PageHeader
                    title="Departments"
                    actions={[
                        { label: 'Managers', href: '/admin/managers', variant: 'primary' },
                        { label: 'Faculties', href: '/admin/faculties', variant: 'primary' },
                        { label: '+ Create Department', href: '/admin/departments/create', variant: 'success' },
                    ]}
                />

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
                                departments.map(
                                    (dep: Department, index: number) => (
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
                                                        void handleDelete(
                                                            dep.id,
                                                        )
                                                    }
                                                    disabled={isDeleting}
                                                    type="button"
                                                    className="rounded bg-red-600 px-3 py-1 text-white transition hover:bg-red-700 disabled:opacity-50"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ),
                                )
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
