import PageHeader from '@/components/PageHeader';
import Pagination from '@/components/Pagination';
import { useDelete } from '@/hooks/useDelete';
import AdminLayout from '@/layouts/AdminLayout';
import type { FacultiesPageProps, Faculty } from '@/types/Faculty';
import { Head, Link, router } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Index({
    faculties,
    flash,
    filters = {},
}: FacultiesPageProps) {
    const { deleteResource, isDeleting } = useDelete({
        resourceName: 'faculty',
    });

    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);

    const handleDelete = async (id: number) => {
        await deleteResource(`/admin/faculties/${id}`);
    };

    const handleSearch = (query: string) => {
        const trimmed = query.trim();
        if (filters?.search === trimmed) return;

        router.get(
            '/admin/faculties',
            {
                search: trimmed,
                page: faculties.current_page,
            },
            {
                preserveState: true,
                replace: true,
                preserveScroll: true,
                only: ['faculties'],
            },
        );
    };

    return (
        <AdminLayout title="Faculties">
            <Head title="Faculties" />
            <ToastContainer position="top-right" autoClose={3000} />

            <div className="mx-auto mt-10 w-full rounded-2xl bg-white p-6 shadow-lg">
                <PageHeader
                    title="Faculties"
                    showSearch
                    searchType="faculty"
                    searchPlaceholder="Search faculties..."
                    onSearch={handleSearch}
                    actions={[
                        {
                            label: 'Departments',
                            href: '/admin/departments',
                            variant: 'primary',
                        },
                        {
                            label: 'Managers',
                            href: '/admin/managers',
                            variant: 'primary',
                        },
                        {
                            label: '+ Create Faculty',
                            href: '/admin/faculties/create',
                            variant: 'success',
                        },
                    ]}
                />

                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-200 text-left text-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border px-4 py-2">#</th>
                                <th className="border px-4 py-2">Name (EN)</th>
                                <th className="border px-4 py-2">Name (UZ)</th>
                                <th className="border px-4 py-2">Name (RU)</th>
                                <th className="border px-4 py-2 text-center">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {faculties.data.length ? (
                                faculties.data.map(
                                    (faculty: Faculty, index: number) => (
                                        <tr
                                            key={faculty.id}
                                            className="hover:bg-gray-50"
                                        >
                                            <td className="border px-4 py-2">
                                                {index + 1}
                                            </td>
                                            <td className="border px-4 py-2">
                                                {faculty.name.en}
                                            </td>
                                            <td className="border px-4 py-2">
                                                {faculty.name.uz}
                                            </td>
                                            <td className="border px-4 py-2">
                                                {faculty.name.ru}
                                            </td>
                                            <td className="space-x-2 border px-4 py-2 text-center">
                                                <Link
                                                    href={`/admin/faculties/${faculty.id}/edit`}
                                                    className="rounded bg-yellow-500 px-3 py-1 text-white hover:bg-yellow-600"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() =>
                                                        void handleDelete(
                                                            faculty.id,
                                                        )
                                                    }
                                                    disabled={isDeleting}
                                                    className="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700 disabled:opacity-50"
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
                                        colSpan={5}
                                        className="p-4 text-center text-gray-500"
                                    >
                                        No faculties found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {faculties.links.length >= 10 && (
                    <Pagination
                        links={faculties.links}
                        filters={filters}
                        className="mt-6"
                    />
                )}
            </div>
        </AdminLayout>
    );
}
