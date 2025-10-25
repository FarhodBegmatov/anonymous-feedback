import AdminLayout from '@/layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import DepartmentForm from './DepartmentForm';

interface Faculty {
    id: number;
    name: {
        en: string;
        uz: string;
        ru: string;
    };
}

interface Props {
    faculties: Faculty[];
}

export default function Create({ faculties }: Props) {
    return (
        <AdminLayout>
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
