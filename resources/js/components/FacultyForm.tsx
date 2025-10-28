import type { Faculty, FacultyFormData } from '@/types/Faculty';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { motion } from 'framer-motion';

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
        <motion.form
            onSubmit={submit}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mx-auto w-full max-w-2xl space-y-8 rounded-xl bg-white p-8 shadow-lg"
        >
            <h2 className="text-2xl font-semibold text-gray-800">
                {isEditing ? 'Edit Faculty' : 'Create Faculty'}
            </h2>
            <p className="text-sm text-gray-500">
                Please fill in the multilingual names for this faculty.
            </p>

            {/* English */}
            <div>
                <label
                    htmlFor="name_en"
                    className="block text-sm font-medium text-gray-700 mb-1"
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
                    placeholder="Enter English name..."
                    className={`block w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors['name.en']
                            ? 'border-red-500 animate-[shake_0.3s_ease-in-out]'
                            : 'border-gray-300'
                    }`}
                    required
                />
                {errors['name.en'] && (
                    <p className="mt-1 text-sm text-red-600">
                        {errors['name.en']}
                    </p>
                )}
            </div>

            {/* Uzbek */}
            <div>
                <label
                    htmlFor="name_uz"
                    className="block text-sm font-medium text-gray-700 mb-1"
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
                    placeholder="Masalan: Axborot texnologiyalari fakulteti"
                    className={`block w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors['name.uz']
                            ? 'border-red-500 animate-[shake_0.3s_ease-in-out]'
                            : 'border-gray-300'
                    }`}
                    required
                />
                {errors['name.uz'] && (
                    <p className="mt-1 text-sm text-red-600">
                        {errors['name.uz']}
                    </p>
                )}
            </div>

            {/* Russian */}
            <div>
                <label
                    htmlFor="name_ru"
                    className="block text-sm font-medium text-gray-700 mb-1"
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
                    placeholder="Введите название на русском..."
                    className={`block w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors['name.ru']
                            ? 'border-red-500 animate-[shake_0.3s_ease-in-out]'
                            : 'border-gray-300'
                    }`}
                    required
                />
                {errors['name.ru'] && (
                    <p className="mt-1 text-sm text-red-600">
                        {errors['name.ru']}
                    </p>
                )}
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t">
                <button
                    type="button"
                    onClick={() => window.history.back()}
                    className="rounded-lg border border-gray-300 px-5 py-2 text-gray-700 hover:bg-gray-100 transition"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={processing}
                    className="rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 px-5 py-2 text-white font-medium shadow hover:from-blue-700 hover:to-blue-600 focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
                >
                    {processing ? 'Saving...' : isEditing ? 'Update' : 'Create'}
                </button>
            </div>
        </motion.form>
    );
}
