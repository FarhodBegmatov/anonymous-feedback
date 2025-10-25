import AdminLayout from '@/layouts/AdminLayout';
import FacultyForm from './FacultyForm';

export default function Create() {
    return (
        <AdminLayout>
                {/* FacultyForm create rejimi uchun props bo‘sh qoldiriladi */}
                <FacultyForm />
        </AdminLayout>
    );
}
