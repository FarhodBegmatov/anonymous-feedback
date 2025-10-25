import FacultyForm from '@/components/FacultyForm';
import AdminLayout from '@/layouts/AdminLayout';
import type { FacultyEditPageProps } from '@/types/Faculty';
import { Head } from '@inertiajs/react';

export default function Edit({ faculty }: FacultyEditPageProps) {
    return (
        <AdminLayout title={'Edit Faculty'}>
            <Head title="Edit Faculty" />

            <div className="mx-auto mt-10 max-w-2xl rounded-2xl bg-white p-6 shadow-lg">
                <h1 className="mb-6 text-2xl font-semibold">Edit Faculty</h1>
                <FacultyForm faculty={faculty} isEditing={true} />
            </div>
        </AdminLayout>
    );
}
