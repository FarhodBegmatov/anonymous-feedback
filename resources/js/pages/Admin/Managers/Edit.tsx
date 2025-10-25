import ManagerForm, {
    Department,
    Faculty,
    Manager,
} from './ManagerForm';
import AdminLayout from '@/layouts/AdminLayout';
import { Head, router } from '@inertiajs/react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Props {
    manager: Manager;
    faculties: Faculty[];
    departments: Department[];
    flash?: { success?: string; error?: string };
}

export default function Edit({
    manager,
    faculties,
    departments,
    flash,
}: Props) {
    // Flash messages
    if (flash?.success) toast.success(flash.success);
    if (flash?.error) toast.error(flash.error);

    return (
        <AdminLayout>
            <Head title="Edit Manager" />
            <ToastContainer position="top-right" autoClose={3000} />

            <div className="mx-auto mt-10 max-w-3xl rounded-2xl bg-white p-6 shadow-lg">
                <h1 className="mb-4 text-2xl font-semibold">Edit Manager</h1>
                <ManagerForm
                    manager={manager}
                    faculties={faculties}
                    departments={departments}
                    onSuccess={() => {
                        router.visit('/admin/managers', {
                            onSuccess: () => {
                                toast.success('Manager updated successfully!');
                            },
                        });
                    }}
                />
            </div>
        </AdminLayout>
    );
}
