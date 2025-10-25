import ManagerForm, { Department, Faculty } from './ManagerForm';
import AdminLayout from '@/layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Props {
    faculties: Faculty[];
    departments: Department[];
    flash?: { success?: string; error?: string };
}

export default function Create({ faculties, departments, flash }: Props) {
    // Flash message
    if (flash?.success) toast.success(flash.success);
    if (flash?.error) toast.error(flash.error);

    const handleSuccess = () => {
        toast.success('Manager created successfully!', {
            onClose: () => window.location.href = '/admin/managers'
        });
    };

    return (
        <AdminLayout>
            <Head title="Create Manager" />
            <ToastContainer position="top-right" autoClose={3000} />

            <div className="mx-auto mt-10 max-w-3xl rounded-2xl bg-white p-6 shadow-lg">
                <h1 className="mb-4 text-2xl font-semibold">Create Manager</h1>
                <ManagerForm
                    faculties={faculties}
                    departments={departments}
                    onSuccess={handleSuccess}
                />
            </div>
        </AdminLayout>
    );
}
