import FacultyForm from '@/components/FacultyForm';
import AdminLayout from '@/layouts/AdminLayout';
import { Head } from '@inertiajs/react';

export default function Create() {
    return (
        <AdminLayout title={'Create Faculty'}>

            <Head title="Create Faculty" />

                <FacultyForm />

        </AdminLayout>
    );
}
