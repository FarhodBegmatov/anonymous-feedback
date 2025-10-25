import AdminLayout from '@/layouts/AdminLayout';
import { Head, Link} from '@inertiajs/react';
import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Manager interface
interface Manager {
    id: number;
    name: string;
    email: string;
    manageable: {
        name: { en?: string; uz?: string; ru?: string };
    } | null;
}

// Pagination interfaces
interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginationMeta {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface ManagersProps {
    data: Manager[];
    links: PaginationLink[];
    meta: PaginationMeta;
}

interface Props {
    managers: ManagersProps;
    flash?: { success?: string; error?: string };
}

export default function Index({ managers, flash }: Props) {
    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this manager?')) {
            return;
        }

        console.log('Attempting to delete manager with ID:', id);

        try {
            const formData = new FormData();
            formData.append('_method', 'DELETE');

            const response = await fetch(`/admin/managers/${id}`, {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                    'X-Requested-With': 'XMLHttpRequest',
                    'Accept': 'application/json',
                },
                body: formData
            });

            console.log('Delete response status:', response.status);

            if (response.ok) {
                const data = await response.json();
                console.log('Delete successful, response:', data);
                toast.success('Manager deleted successfully', {
                    onClose: () => window.location.reload()
                });
            } else {
                const errorData = await response.json();
                console.error('Delete failed:', errorData);
                toast.error(errorData.message || 'Error deleting manager');
            }
        } catch (error) {
            console.error('Delete error:', error);
            toast.error('An error occurred while deleting the manager');
        }
    };

    return (
        <AdminLayout title={'Managers'}>
            <Head title="Managers" />
            <ToastContainer position="top-right" autoClose={3000} />

            <div className="mx-auto mt-10 max-w-7xl rounded-2xl bg-white p-6 shadow-lg">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Managers</h1>
                    <div className="flex items-center space-x-3">
                    <Link
                        href="/admin/faculties"
                        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                    >
                        Faculties
                    </Link>
                    <Link
                        href="/admin/departments"
                        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                    >
                        Departments
                    </Link>
                    <Link
                        href="/admin/managers/create"
                        className="rounded bg-green-600 px-4 py-2 text-white hover:bg-blue-700"
                    >
                        + Create Manager
                    </Link>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-200 text-left text-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border px-4 py-2">#</th>
                                <th className="border px-4 py-2">Name</th>
                                <th className="border px-4 py-2">Email</th>
                                <th className="border px-4 py-2">
                                    Faculties|Centers
                                </th>
                                <th className="border px-4 py-2">Manageable</th>
                                <th className="border px-4 py-2 text-center">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {managers.data.length > 0 ? (
                                managers.data.map((m, i) => (
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
                                                    handleDelete(m.id)
                                                }
                                                className="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700"
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
