import AdminLayout from '@/layouts/AdminLayout';
import type { DepartmentCreatePageProps } from '@/types/Department';
import { Head } from '@inertiajs/react';
import DepartmentForm from '../../../components/DepartmentForm';

export default function Create({ faculties }: DepartmentCreatePageProps) {
    return (
        <AdminLayout title={'Create Department'}>
            <Head title="Create Department" />
            <div className="mx-auto mt-10 max-w-2xl rounded-2xl bg-white p-6 shadow-lg">
                <h1 className="mb-6 text-2xl font-semibold">
                    Create Department
                </h1>
                <DepartmentForm faculties={faculties} />
            </div>
        </AdminLayout>
    );
}
