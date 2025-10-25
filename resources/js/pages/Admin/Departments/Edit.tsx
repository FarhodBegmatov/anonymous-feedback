import AdminLayout from '@/layouts/AdminLayout';
import type { DepartmentEditPageProps } from '@/types/Department';
import { Head } from '@inertiajs/react';
import DepartmentForm from '../../../components/DepartmentForm';

export default function Edit({ faculties, department }: DepartmentEditPageProps) {
    return (
        <AdminLayout title={'Edit Department'}>
            <Head title="Edit Department" />

            <div className="mx-auto mt-10 max-w-2xl rounded-2xl bg-white p-6 shadow-lg">
                <h1 className="mb-6 text-2xl font-semibold text-gray-800">
                    Edit Department
                </h1>

                <DepartmentForm faculties={faculties} department={department} />
            </div>
        </AdminLayout>
    );
}
