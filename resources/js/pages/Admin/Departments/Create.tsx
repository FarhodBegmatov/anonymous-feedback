import { Link, useForm } from '@inertiajs/react';

type Faculty = { id: number; name: { en: string } };

type Props = {
    faculties: Faculty[];
};

export default function Create({ faculties }: Props) {
    const form = useForm({
        faculty_id: 0,
        name: { en: '', uz: '', ru: '' },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (form.data.faculty_id === 0) {
            alert('Please select a faculty.');
            return;
        }
        form.post('/admin/departments');
    };

    return (
        <div className="mx-auto mt-10 max-w-2xl rounded-2xl bg-white p-6 shadow-lg">
            <h1 className="mb-6 text-2xl font-semibold">Create Department</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Faculty select */}
                <div>
                    <label className="mb-1 block font-medium">Faculty</label>
                    <select
                        className="w-full rounded border px-3 py-2"
                        value={form.data.faculty_id}
                        onChange={(e) =>
                            form.setData('faculty_id', Number(e.target.value))
                        }
                    >
                        <option value={0}>Select Faculty</option>
                        {faculties.map((f) => (
                            <option key={f.id} value={f.id}>
                                {f.name.en}
                            </option>
                        ))}
                    </select>
                    {form.errors.faculty_id && (
                        <div className="mt-1 text-sm text-red-600">
                            {form.errors.faculty_id}
                        </div>
                    )}
                </div>

                {/* Name (EN) */}
                <div>
                    <label className="mb-1 block font-medium">Name (EN)</label>
                    <input
                        type="text"
                        className="w-full rounded border px-3 py-2"
                        value={form.data.name.en}
                        onChange={(e) =>
                            form.setData('name.en', e.target.value)
                        }
                    />
                    {form.errors['name.en'] && (
                        <div className="mt-1 text-sm text-red-600">
                            {form.errors['name.en']}
                        </div>
                    )}
                </div>

                {/* Name (UZ) */}
                <div>
                    <label className="mb-1 block font-medium">Name (UZ)</label>
                    <input
                        type="text"
                        className="w-full rounded border px-3 py-2"
                        value={form.data.name.uz}
                        onChange={(e) =>
                            form.setData('name.uz', e.target.value)
                        }
                    />
                    {form.errors['name.uz'] && (
                        <div className="mt-1 text-sm text-red-600">
                            {form.errors['name.uz']}
                        </div>
                    )}
                </div>

                {/* Name (RU) */}
                <div>
                    <label className="mb-1 block font-medium">Name (RU)</label>
                    <input
                        type="text"
                        className="w-full rounded border px-3 py-2"
                        value={form.data.name.ru}
                        onChange={(e) =>
                            form.setData('name.ru', e.target.value)
                        }
                    />
                    {form.errors['name.ru'] && (
                        <div className="mt-1 text-sm text-red-600">
                            {form.errors['name.ru']}
                        </div>
                    )}
                </div>

                {/* Buttons */}
                <div className="mt-4 flex items-center gap-4">
                    <button
                        type="submit"
                        className="rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
                    >
                        Create
                    </button>
                    <Link
                        href="/admin/departments"
                        className="rounded border px-4 py-2 text-gray-700 transition hover:bg-gray-100"
                    >
                        Cancel
                    </Link>
                </div>
            </form>
        </div>
    );
}
