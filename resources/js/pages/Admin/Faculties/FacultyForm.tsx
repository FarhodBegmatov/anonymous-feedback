import { useForm } from '@inertiajs/react';
import { FormEvent } from 'react';
import { toast } from 'react-toastify';

interface LocalizedName {
    en: string;
    uz: string;
    ru: string;
}

interface Faculty {
    id?: number;
    name: LocalizedName;
}

interface Props {
    faculty?: Faculty; // edit rejimi uchun
}

export default function FacultyForm({ faculty }: Props) {
    const isEdit = !!faculty;

    const { data, setData, post, put, processing, errors } = useForm({
        name: faculty?.name || { en: '', uz: '', ru: '' },
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (isEdit && faculty?.id) {
            put(`/admin/faculties/${faculty.id}`, {
                onSuccess: () => toast.success('Faculty updated successfully'),
            });
        } else {
            post('/admin/faculties', {
                onSuccess: () => {
                    toast.success('Faculty created successfully');
                    setData('name', { en: '', uz: '', ru: '' });
                },
            });
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="mx-auto mt-5 max-w-md space-y-5 rounded-2xl bg-white p-6 shadow-lg"
        >
            <h2 className="text-xl font-semibold text-gray-800">
                {isEdit ? 'Update Faculty' : 'Create New Faculty'}
            </h2>

            {(['en', 'uz', 'ru'] as const).map((lang) => (
                <div key={lang}>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Name ({lang.toUpperCase()})
                    </label>
                    <input
                        type="text"
                        value={data.name[lang]}
                        onChange={(e) =>
                            setData(`name.${lang}`, e.target.value)
                        }
                        placeholder={`Enter ${lang.toUpperCase()} name`}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                    />
                    {errors[`name.${lang}`] && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors[`name.${lang}`]}
                        </p>
                    )}
                </div>
            ))}

            <button
                type="submit"
                disabled={processing}
                className={`w-full rounded-lg px-4 py-2 font-medium text-white transition-colors ${
                    processing ? 'cursor-not-allowed bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
                }`}
            >
                {isEdit ? 'Update Faculty' : 'Create Faculty'}
            </button>
        </form>
    );
}
