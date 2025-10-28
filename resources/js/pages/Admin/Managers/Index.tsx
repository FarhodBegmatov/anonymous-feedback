import PageHeader from '@/components/PageHeader';
import { useDelete } from '@/hooks/useDelete';
import AdminLayout from '@/layouts/AdminLayout';
import type { Manager, ManagersPageProps } from '@/types/Manager';
import { Head, Link, router } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Index({ managers, flash }: ManagersPageProps) {
    const { deleteResource, isDeleting } = useDelete({
        resourceName: 'manager',
    });

    // 🔹 Flash xabarlarni chiqarish
    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);

    // 🔹 Ma'lumotni o'chirish funksiyasi
    const handleDelete = async (id: number) => {
        await deleteResource(`/admin/managers/${id}`);
    };

    // 🔹 Qidiruv funksiyasi — asosiy joy
    const handleSearch = (query: string) => {
        const trimmed = query.trim();

        if (trimmed === '') {
            // Agar input bo‘sh bo‘lsa — search parametrini olib tashlaymiz
            router.get(
                '/admin/managers',
                {},
                { preserveState: true, replace: true },
            );
        } else {
            // Agar inputda matn bo‘lsa — qidiruvni yuboramiz
            router.get(
                '/admin/managers',
                { search: trimmed },
                { preserveState: true, replace: true },
            );
        }
    };

    return (
        <AdminLayout title="Managers">
            <Head title="Managers" />
            <ToastContainer position="top-right" autoClose={3000} />

            <div className="mx-auto mt-10 w-full rounded-2xl bg-white p-6 shadow-lg">
                <PageHeader
                    title="Managers"
                    showSearch={true}
                    searchType="manager"
                    searchPlaceholder="Search managers..."
                    onSearch={handleSearch}
                    actions={[
                        {
                            label: 'Faculties',
                            href: '/admin/faculties',
                            variant: 'primary',
                        },
                        {
                            label: 'Departments',
                            href: '/admin/departments',
                            variant: 'primary',
                        },
                        {
                            label: '+ Create Manager',
                            href: '/admin/managers/create',
                            variant: 'success',
                        },
                    ]}
                />

                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-200 text-left text-sm">
                        <thead className="bg-gray-100">
                        <tr>
                            <th className="border px-4 py-2">#</th>
                            <th className="border px-4 py-2">Name</th>
                            <th className="border px-4 py-2">Email</th>
                            <th className="border px-4 py-2">
                                Faculties | Centers
                            </th>
                            <th className="border px-4 py-2">Manageable</th>
                            <th className="border px-4 py-2 text-center">
                                Actions
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {managers.data.length > 0 ? (
                            managers.data.map((m: Manager, i: number) => (
                                <tr key={m.id} className="hover:bg-gray-50">
                                    <td className="border px-4 py-2">
                                        {i + 1}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {m.name}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {m.email}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {m.manageable
                                            ? m.manageable.name.uz || '-'
                                            : '-'}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {m.manageable
                                            ? 'Faculty/Department'
                                            : '-'}
                                    </td>
                                    <td className="space-x-2 border px-4 py-2 text-center">
                                        <Link
                                            href={`/admin/managers/${m.id}/edit`}
                                            className="rounded bg-yellow-500 px-3 py-1 text-white hover:bg-yellow-600"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() =>
                                                void handleDelete(m.id)
                                            }
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
                                <td
                                    colSpan={6}
                                    className="p-4 text-center text-gray-500"
                                >
                                    No managers found
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
