import type { Faculty, FacultyFormData } from '@/types/Faculty';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

interface FacultyFormProps {
    faculty?: Faculty;
    isEditing?: boolean;
}

export default function FacultyForm({
    faculty,
    isEditing = false,
}: FacultyFormProps) {
    const { data, setData, post, put, processing, errors } =
        useForm<FacultyFormData>({
            name: {
                en: faculty?.name.en || '',
                uz: faculty?.name.uz || '',
                ru: faculty?.name.ru || '',
            },
        });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (isEditing && faculty) {
            put(`/admin/faculties/${faculty.id}`);
        } else {
            post('/admin/faculties');
        }
    };

    return (
        <form onSubmit={submit} className="space-y-6">
            <div>
                <label
                    htmlFor="name_en"
                    className="block text-sm font-medium text-gray-700"
                >
                    Name (English)
                </label>
                <input
                    id="name_en"
                    type="text"
                    value={data.name.en}
                    onChange={(e) =>
                        setData('name', { ...data.name, en: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                />
                {errors['name.en'] && (
                    <p className="mt-1 text-sm text-red-600">
                        {errors['name.en']}
                    </p>
                )}
            </div>

            <div>
                <label
                    htmlFor="name_uz"
                    className="block text-sm font-medium text-gray-700"
                >
                    Name (Uzbek)
                </label>
                <input
                    id="name_uz"
                    type="text"
                    value={data.name.uz}
                    onChange={(e) =>
                        setData('name', { ...data.name, uz: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                />
                {errors['name.uz'] && (
                    <p className="mt-1 text-sm text-red-600">
                        {errors['name.uz']}
                    </p>
                )}
            </div>

            <div>
                <label
                    htmlFor="name_ru"
                    className="block text-sm font-medium text-gray-700"
                >
                    Name (Russian)
                </label>
                <input
                    id="name_ru"
                    type="text"
                    value={data.name.ru}
                    onChange={(e) =>
                        setData('name', { ...data.name, ru: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                />
                {errors['name.ru'] && (
                    <p className="mt-1 text-sm text-red-600">
                        {errors['name.ru']}
                    </p>
                )}
            </div>

            <div className="flex items-center justify-end space-x-3">
                <button
                    type="button"
                    onClick={() => window.history.back()}
                    className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={processing}
                    className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                >
                    {processing ? 'Saving...' : isEditing ? 'Update' : 'Create'}
                </button>
            </div>
        </form>
    );
}
