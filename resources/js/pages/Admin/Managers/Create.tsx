import AdminLayout from '@/layouts/AdminLayout';
import type { ManagerCreatePageProps } from '@/types/Manager';
import { Head } from '@inertiajs/react';
import ManagerForm from '../../../components/ManagerForm';

export default function Create({ faculties, departments }: ManagerCreatePageProps) {
    return (
        <AdminLayout title={'Create Manager'}>
            <Head title="Create Manager" />

            <div className="mx-auto mt-10 max-w-3xl rounded-2xl bg-white p-6 shadow-lg">
                <h1 className="mb-4 text-2xl font-semibold">Create Manager</h1>
                <ManagerForm
                    faculties={faculties}
                    departments={departments}
                />
            </div>
        </AdminLayout>
    );
}
