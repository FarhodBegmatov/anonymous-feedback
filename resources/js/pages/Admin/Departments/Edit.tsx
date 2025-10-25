import { Head } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DepartmentForm from './DepartmentForm';

interface Faculty {
    id: number;
    name: {
        en: string;
        uz: string;
        ru: string;
    };
}

interface Department {
    id: number;
    faculty_id: number;
    name: {
        en: string;
        uz: string;
        ru: string;
    };
}

interface Props {
    faculties: Faculty[];
    department: Department;
    flash?: {
        success?: string;
        error?: string;
    };
}

export default function Edit({ faculties, department, flash }: Props) {
    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);

    return (
        <>
            <Head title="Edit Department" />
            <ToastContainer position="top-right" autoClose={3000} />

            <div className="mx-auto mt-10 max-w-2xl rounded-2xl bg-white p-6 shadow-lg">
                <h1 className="mb-6 text-2xl font-semibold text-gray-800">
                    Edit Department
                </h1>

                <DepartmentForm faculties={faculties} department={department} />
            </div>
        </>
    );
}
