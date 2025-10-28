import type { Department } from '@/types/Department';
import { Link, useForm } from '@inertiajs/react';
import React from 'react';

interface LocalizedName {
    en: string;
    uz: string;
    ru: string;
}

interface DepartmentFormData {
    faculty_id: number;
    name: LocalizedName;
}

interface Faculty {
    id: number;
    name: LocalizedName;
}

interface Props {
    faculties: Faculty[];
    department?: Department;
}

const ROUTE_DEPARTMENTS = '/admin/departments';

export default function DepartmentForm({ faculties, department }: Props) {
    const isEdit = !!department;

    // Initial form data
    const form = useForm<DepartmentFormData>({
        faculty_id: department?.faculty?.id || 0,
        name: department?.name || { en: '', uz: '', ru: '' },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (form.data.faculty_id === 0) {
            return;
        }

        if (isEdit) {
            form.transform((data) => ({
                ...data,
                _method: 'put',
            }));

            form.post(`${ROUTE_DEPARTMENTS}/${department?.id}`);
        } else {
            form.post(ROUTE_DEPARTMENTS);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Faculty selection */}
            <div>
                <label className="mb-1 block font-medium" htmlFor="faculty">
                    Faculty
                </label>
                <select
                    id="faculty"
                    className="w-full rounded border px-3 py-2"
                    value={form.data.faculty_id}
                    onChange={(e) =>
                        form.setData('faculty_id', Number(e.target.value))
                    }
                >
                    <option value={0}>Select Faculty</option>
                    {faculties.map((f) => (
                        <option key={f.id} value={f.id}>
                            {f.name.uz}
                        </option>
                    ))}
                </select>
                {form.errors.faculty_id && (
                    <div className="mt-1 text-sm text-red-600">
                        {form.errors.faculty_id}
                    </div>
                )}
            </div>

            {/* Localized names */}
            {(['en', 'uz', 'ru'] as const).map((lang) => (
                <div key={lang}>
                    <label className="mb-1 block font-medium">
                        Name ({lang.toUpperCase()})
                    </label>
                    <input
                        type="text"
                        className="w-full rounded border px-3 py-2"
                        value={form.data.name[lang]}
                        onChange={(e) =>
                            form.setData('name', {
                                ...form.data.name,
                                [lang]: e.target.value,
                            })
                        }
                    />
                    {form.errors[`name.${lang}`] && (
                        <div className="mt-1 text-sm text-red-600">
                            {form.errors[`name.${lang}`]}
                        </div>
                    )}
                </div>
            ))}

            {/* Action buttons */}
            <div className="mt-4 flex items-center gap-4">
                <button
                    type="submit"
                    className="rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
                >
                    {isEdit ? 'Update' : 'Create'}
                </button>
                <Link
                    href={ROUTE_DEPARTMENTS}
                    className="rounded border px-4 py-2 text-gray-700 transition hover:bg-gray-100"
                >
                    Cancel
                </Link>
            </div>
        </form>
    );
}
