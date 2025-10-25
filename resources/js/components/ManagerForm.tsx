import type { Manager } from '@/types/Manager';
import { Link, useForm } from '@inertiajs/react';
import React from 'react';

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
    name: {
        en: string;
        uz: string;
        ru: string;
    };
}

interface ManagerFormData {
    name: string;
    email: string;
    manageable_type: string;
    manageable_id: number;
    password: string;
}

interface Props {
    manager?: Manager;
    faculties: Faculty[];
    departments: Department[];
}

const ROUTE_MANAGERS = '/admin/managers';

export default function ManagerForm({
    manager,
    faculties,
    departments,
}: Props) {
    const isEdit = !!manager?.id;

    const form = useForm<ManagerFormData>({
        name: manager?.name || '',
        email: manager?.email || '',
        manageable_type: manager?.manageable_type || 'faculty',
        manageable_id: manager?.manageable_id || 0,
        password: '',
    });

    const options =
        form.data.manageable_type === 'faculty' ? faculties : departments;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (form.data.manageable_id === 0) {
            return;
        }

        if (isEdit && manager?.id) {
            form.transform((data) => ({
                ...data,
                _method: 'put',
            }));

            form.post(`${ROUTE_MANAGERS}/${manager.id}`);
        } else {
            form.post(ROUTE_MANAGERS);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
                <label className="mb-1 block font-medium">Name</label>
                <input
                    type="text"
                    className="w-full rounded border px-3 py-2"
                    value={form.data.name}
                    onChange={(e) => form.setData('name', e.target.value)}
                />
                {form.errors.name && (
                    <div className="mt-1 text-sm text-red-600">
                        {form.errors.name}
                    </div>
                )}
            </div>

            {/* Email */}
            <div>
                <label className="mb-1 block font-medium">Email</label>
                <input
                    type="email"
                    className="w-full rounded border px-3 py-2"
                    value={form.data.email}
                    onChange={(e) => form.setData('email', e.target.value)}
                />
                {form.errors.email && (
                    <div className="mt-1 text-sm text-red-600">
                        {form.errors.email}
                    </div>
                )}
            </div>

            {/* Type */}
            <div>
                <label className="mb-1 block font-medium">Type</label>
                <select
                    className="w-full rounded border px-3 py-2"
                    value={form.data.manageable_type}
                    onChange={(e) =>
                        form.setData('manageable_type', e.target.value)
                    }
                >
                    <option value="faculty">Faculty</option>
                    <option value="department">Department</option>
                </select>
                {form.errors.manageable_type && (
                    <div className="mt-1 text-sm text-red-600">
                        {form.errors.manageable_type}
                    </div>
                )}
            </div>

            {/* Manageable */}
            <div>
                <label className="mb-1 block font-medium">
                    Manageable (Uzbek)
                </label>
                <select
                    className="w-full rounded border px-3 py-2"
                    value={form.data.manageable_id}
                    onChange={(e) =>
                        form.setData('manageable_id', Number(e.target.value))
                    }
                >
                    <option value={0}>
                        Select {form.data.manageable_type}
                    </option>
                    {options.map((opt) => (
                        <option key={opt.id} value={opt.id}>
                            {opt.name.uz}
                        </option>
                    ))}
                </select>
                {form.errors.manageable_id && (
                    <div className="mt-1 text-sm text-red-600">
                        {form.errors.manageable_id}
                    </div>
                )}
            </div>

            {/* Password */}
            <div>
                <label className="mb-1 block font-medium">
                    {isEdit
                        ? 'New Password (leave blank to keep current)'
                        : 'Password'}
                </label>
                <input
                    type="password"
                    className="w-full rounded border px-3 py-2"
                    value={form.data.password}
                    onChange={(e) => form.setData('password', e.target.value)}
                    placeholder={
                        isEdit
                            ? 'Leave blank to keep current password'
                            : 'Enter password'
                    }
                />
                {form.errors.password && (
                    <div className="mt-1 text-sm text-red-600">
                        {form.errors.password}
                    </div>
                )}
            </div>

            {/* Action buttons */}
            <div className="mt-4 flex items-center gap-4">
                <button
                    type="submit"
                    disabled={form.processing}
                    className="rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 disabled:opacity-50"
                >
                    {isEdit ? 'Update' : 'Create'}
                </button>
                <Link
                    href={ROUTE_MANAGERS}
                    className="rounded border px-4 py-2 text-gray-700 transition hover:bg-gray-100"
                >
                    Cancel
                </Link>
            </div>
        </form>
    );
}
