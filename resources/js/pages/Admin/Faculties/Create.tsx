import FacultyForm from '@/components/FacultyForm';
import AdminLayout from '@/layouts/AdminLayout';
import { Head } from '@inertiajs/react';

export default function Create() {
    return (
        <AdminLayout title={'Create Faculty'}>
            <Head title="Create Faculty" />

            <div className="mx-auto mt-10 max-w-2xl rounded-2xl bg-white p-6 shadow-lg">
                <h1 className="mb-6 text-2xl font-semibold">
                    Create New Faculty
                </h1>
                <FacultyForm />
            </div>
        </AdminLayout>
    );
}
