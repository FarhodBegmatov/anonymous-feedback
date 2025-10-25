import axios from 'axios';
import { ChangeEvent, FormEvent, useState } from 'react';
import { toast } from 'react-toastify';

export interface Faculty {
    id: number;
    name: { uz: string };
}

export interface Department {
    id: number;
    name: { uz: string };
}

export interface Manager {
    id?: number;
    name: string;
    email: string;
    manageable_type: 'faculty' | 'department';
    manageable_id: number;
}

interface Props {
    manager?: Manager; // mavjud manager bo‘lsa edit
    faculties: Faculty[];
    departments: Department[];
    onSuccess?: () => void;
}

export default function ManagerForm({
    manager,
    faculties,
    departments,
    onSuccess,
}: Props) {
    const isEdit = !!manager?.id;

    const [form, setForm] = useState({
        name: manager?.name || '',
        email: manager?.email || '',
        manageable_type: manager?.manageable_type || 'faculty',
        manageable_id: manager?.manageable_id || 0,
        password: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [processing, setProcessing] = useState(false);

    const options =
        form.manageable_type === 'faculty' ? faculties : departments;

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: name === 'manageable_id' ? Number(value) : value,
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        try {
            if (isEdit && manager?.id) {
                // Update manager (PUT)
                await axios.put(`/admin/managers/${manager.id}`, form);
            } else {
                // Create new manager (POST)
                await axios.post('/admin/managers', form);
                setForm({
                    name: '',
                    email: '',
                    manageable_type: 'faculty',
                    manageable_id: 0,
                    password: '',
                });
            }
            onSuccess?.();
        } catch (err: unknown) {
            if (axios.isAxiosError(err) && err.response) {
                if (err.response.status === 422) {
                    // Validation errors
                    setErrors(err.response.data.errors);
                } else {
                    toast.error('Server error, please try again.');
                    console.error(err);
                }
            } else {
                toast.error('An unexpected error occurred');
                console.error(err);
            }
        } finally {
            setProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
                <label className="mb-1 block font-medium">Name</label>
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full rounded border px-3 py-2"
                />
                {errors.name && (
                    <div className="text-red-600">{errors.name}</div>
                )}
            </div>

            {/* Email */}
            <div>
                <label className="mb-1 block font-medium">Email</label>
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full rounded border px-3 py-2"
                />
                {errors.email && (
                    <div className="text-red-600">{errors.email}</div>
                )}
            </div>

            {/* Type */}
            <div>
                <label className="mb-1 block font-medium">Type</label>
                <select
                    name="manageable_type"
                    value={form.manageable_type}
                    onChange={handleChange}
                    className="w-full rounded border px-3 py-2"
                >
                    <option value="faculty">Faculty</option>
                    <option value="department">Department</option>
                </select>
                {errors.manageable_type && (
                    <div className="text-red-600">{errors.manageable_type}</div>
                )}
            </div>

            {/* Manageable */}
            <div>
                <label className="mb-1 block font-medium">
                    Manageable (O'zbekcha)
                </label>
                <select
                    name="manageable_id"
                    value={form.manageable_id}
                    onChange={handleChange}
                    className="w-full rounded border px-3 py-2"
                >
                    <option value={0}>Select {form.manageable_type}</option>
                    {options.map((opt) => (
                        <option key={opt.id} value={opt.id}>
                            {opt.name.uz}
                        </option>
                    ))}
                </select>
                {errors.manageable_id && (
                    <div className="text-red-600">{errors.manageable_id}</div>
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
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full rounded border px-3 py-2"
                    placeholder={
                        isEdit
                            ? 'Leave blank to keep current password'
                            : 'Enter password'
                    }
                />
                {errors.password && (
                    <div className="text-red-600">{errors.password}</div>
                )}
            </div>

            {/* Submit */}
            <div className="flex gap-4">
                <button
                    type="submit"
                    disabled={processing}
                    className={`rounded px-4 py-2 text-white ${
                        processing
                            ? 'bg-blue-400'
                            : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                >
                    {processing ? 'Saving...' : isEdit ? 'Update' : 'Create'}
                </button>
            </div>
        </form>
    );
}
