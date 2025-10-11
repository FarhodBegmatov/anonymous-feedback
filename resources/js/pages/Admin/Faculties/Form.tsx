import { Faculty } from '@/types/Faculty';
import { useForm } from '@inertiajs/react';
import { FormEvent } from 'react';

interface Props {
    faculty?: Faculty;
}

export default function Form({ faculty }: Props) {
    const { data, setData, post, put, processing, errors } = useForm({
        name: faculty?.name || { en: '', uz: '', ru: '' },
    });

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if (faculty && faculty.id) {
            put(`/admin/faculties/${faculty.id}`);
        } else {
            post('/admin/faculties');
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="mx-auto mt-5 max-w-md space-y-5 rounded-2xl bg-white p-6 shadow-lg"
        >
            <h2 className="text-xl font-semibold text-gray-800">
                {faculty ? 'Update Faculty' : 'Create New Faculty'}
            </h2>

            {/* English */}
            <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                    Name (EN)
                </label>
                <input
                    type="text"
                    value={data.name.en}
                    onChange={(e) => setData('name.en', e.target.value)}
                    placeholder="Enter English name"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                />
                {errors['name.en'] && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors['name.en']}
                    </p>
                )}
            </div>

            {/* Uzbek */}
            <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                    Name (UZ)
                </label>
                <input
                    type="text"
                    value={data.name.uz}
                    onChange={(e) => setData('name.uz', e.target.value)}
                    placeholder="Enter Uzbek name"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                />
                {errors['name.uz'] && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors['name.uz']}
                    </p>
                )}
            </div>

            {/* Russian */}
            <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                    Name (RU)
                </label>
                <input
                    type="text"
                    value={data.name.ru}
                    onChange={(e) => setData('name.ru', e.target.value)}
                    placeholder="Enter Russian name"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                />
                {errors['name.ru'] && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors['name.ru']}
                    </p>
                )}
            </div>

            <div className="pt-2">
                <button
                    type="submit"
                    disabled={processing}
                    className={`w-full rounded-lg px-4 py-2 font-medium text-white transition-colors ${
                        processing
                            ? 'cursor-not-allowed bg-blue-400'
                            : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                >
                    {faculty ? 'Update Faculty' : 'Create Faculty'}
                </button>
            </div>
        </form>
    );
}
