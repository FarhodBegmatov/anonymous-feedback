import PageHeader from '@/components/PageHeader';
import { useDelete } from '@/hooks/useDelete';
import AdminLayout from '@/layouts/AdminLayout';
import type { Department, DepartmentsPageProps } from '@/types/Department';
import { Head, Link, router } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Index({ departments, filters: initialFilters, flash }: DepartmentsPageProps) {
    const { deleteResource, isDeleting } = useDelete({
        resourceName: 'department',
    });

    // Flash messages
    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);

    const handleDelete = async (id: number) => {
        await deleteResource(`/admin/departments/${id}`);
    };

    const handleSearch = (query: string) => {
        const trimmed = query.trim();

        router.get(
            '/admin/departments',
            trimmed ? { search: trimmed } : {},
            { preserveState: true, replace: true }
        );
    };

    const goToPage = (page: number) => {
        router.get(
            '/admin/departments',
            { ...initialFilters, page },
            { preserveState: true, replace: true }
        );
    };

    const departmentList: Department[] = departments.data;

    return (
        <AdminLayout title="Departments">
            <Head title="Departments" />
            <ToastContainer position="top-right" autoClose={3000} />

            <div className="mx-auto mt-10 w-full rounded-2xl bg-white p-6 shadow-lg">
                <PageHeader
                    title="Departments"
                    showSearch={true}
                    searchType="department"
                    searchPlaceholder="Search departments..."
                    onSearch={handleSearch}
                    actions={[
                        { label: 'Faculties', href: '/admin/faculties', variant: 'primary' },
                        { label: 'Managers', href: '/admin/managers', variant: 'primary' },
                        { label: '+ Create Department', href: '/admin/departments/create', variant: 'success' },
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
                            <th className="border px-4 py-2">Faculty</th>
                            <th className="border px-4 py-2 text-center">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {departmentList.length > 0 ? (
                            departmentList.map((department: Department, index: number) => (
                                <tr key={department.id} className="hover:bg-gray-50">
                                    <td className="border px-4 py-2">{index + 1 + (departments.current_page - 1) * departments.per_page}</td>
                                    <td className="border px-4 py-2">{department.name.en}</td>
                                    <td className="border px-4 py-2">{department.name.uz}</td>
                                    <td className="border px-4 py-2">{department.name.ru}</td>
                                    <td className="border px-4 py-2">{department.faculty?.name.en || '-'}</td>
                                    <td className="space-x-2 border px-4 py-2 text-center">
                                        <Link
                                            href={`/admin/departments/${department.id}/edit`}
                                            className="rounded bg-yellow-500 px-3 py-1 text-white hover:bg-yellow-600"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => void handleDelete(department.id)}
                                            disabled={isDeleting}
                                            className="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700 disabled:opacity-50"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="p-4 text-center text-gray-500">
                                    No departments found
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                    <button
                        onClick={() => goToPage(departments.current_page - 1)}
                        disabled={departments.current_page === 1}
                        className="rounded bg-gray-200 px-3 py-1 hover:bg-gray-300 disabled:opacity-50"
                    >
                        Previous
                    </button>

                    <div className="flex space-x-2">
                        {Array.from({ length: departments.last_page }, (_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => goToPage(i + 1)}
                                className={`rounded px-3 py-1 ${
                                    departments.current_page === i + 1
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-200 hover:bg-gray-300'
                                }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => goToPage(departments.current_page + 1)}
                        disabled={departments.current_page === departments.last_page}
                        className="rounded bg-gray-200 px-3 py-1 hover:bg-gray-300 disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </AdminLayout>
    );
}
