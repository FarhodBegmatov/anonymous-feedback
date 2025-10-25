import AdminLayout from '@/layouts/AdminLayout';
import type { ManagerEditPageProps } from '@/types/Manager';
import { Head } from '@inertiajs/react';
import ManagerForm from '../../../components/ManagerForm';

export default function Edit({
    manager,
    faculties,
    departments,
}: ManagerEditPageProps) {
    return (
        <AdminLayout title={'Edit Manager'}>
            <Head title="Edit Manager" />

            <div className="mx-auto mt-10 max-w-3xl rounded-2xl bg-white p-6 shadow-lg">
                <h1 className="mb-4 text-2xl font-semibold">Edit Manager</h1>
                <ManagerForm
                    manager={manager}
                    faculties={faculties}
                    departments={departments}
                />
            </div>
        </AdminLayout>
    );
}
