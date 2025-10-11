import Layout from '@/components/Layout';
import { useForm, usePage, Link } from '@inertiajs/react';
import { FormEvent, useEffect, useState } from 'react';

interface Department {
    id: number;
    name: { en: string; uz: string; ru: string };
}

interface Feedback {
    id: number;
    grade: string;
    comment: string;
    created_at: string;
}

interface PaginatedFeedback {
    data: Feedback[];
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
}

interface Props {
    department: Department;
    feedbacks: PaginatedFeedback;
    locale: 'en' | 'uz' | 'ru';
    translations: Record<string, string>;
}

interface FlashMessages {
    success?: string;
    error?: string;
}

export default function FeedbackForm({
                                         department,
                                         feedbacks,
                                         locale,
                                         translations,
                                     }: Props) {
    const { flash } = usePage<{ flash: FlashMessages }>().props;
    const [showFlash, setShowFlash] = useState(!!(flash?.success || flash?.error));

// ✅ Flash xabardan keyin avtomatik yashirish
    useEffect(() => {
        if (flash?.success || flash?.error) {
            setShowFlash(true);
            const timer = setTimeout(() => setShowFlash(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [flash]);

    const { data, setData, post, processing, errors, reset } = useForm({
        department_id: department.id,
        grade: '',
        comment: '',
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post('/feedback', {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <Layout locale={locale} translations={translations}>
            <div className="mx-auto max-w-xl rounded bg-white p-6 shadow">
                {showFlash && (flash?.success || flash?.error) && (
                    <div
                        className={`mb-4 rounded border p-3 ${
                            flash.success
                                ? 'border-green-300 bg-green-100 text-green-700'
                                : 'border-red-300 bg-red-100 text-red-700'
                        }`}
                    >
                        {flash.success || flash.error}
                    </div>
                )}

                <h1 className="mb-4 text-2xl font-semibold">
                    {department.name[locale] ?? department.name.en}
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="mb-1 block text-gray-700">{translations.grade}</label>
                        <div className="flex space-x-2">
                            {['good', 'average', 'bad'].map((grade) => {
                                const isActive = data.grade === grade;
                                return (
                                    <button
                                        key={grade}
                                        type="button"
                                        onClick={() => setData('grade', grade)}
                                        className={`rounded-full text-white transition font-medium
        ${
                                            grade === 'good'
                                                ? isActive
                                                    ? 'bg-green-600 px-4 py-2 shadow-lg scale-105'
                                                    : 'bg-green-500 px-3 py-1.5 hover:bg-green-600'
                                                : grade === 'average'
                                                    ? isActive
                                                        ? 'bg-yellow-600 px-4 py-2 shadow-lg scale-105'
                                                        : 'bg-yellow-500 px-3 py-1.5 hover:bg-yellow-600'
                                                    : isActive
                                                        ? 'bg-red-600 px-4 py-2 shadow-lg scale-105'
                                                        : 'bg-red-400 px-3 py-1.5 hover:bg-red-600'
                                        }
    `}
                                    >
                                        {translations[grade]}
                                    </button>

                                );
                            })}
                        </div>
                        {errors.grade && <p className="text-sm text-red-500">{errors.grade}</p>}
                    </div>

                    <div>
                        <label className="mb-1 block text-gray-700">{translations.comment}</label>
                        <textarea
                            className="w-full rounded border p-2"
                            rows={4}
                            value={data.comment}
                            onChange={(e) => setData('comment', e.target.value)}
                            placeholder={translations.comment_placeholder}
                        />
                        {errors.comment && <p className="text-sm text-red-500">{errors.comment}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full rounded bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
                    >
                        {translations.submit}
                    </button>
                </form>
            </div>

            <div className="mx-auto mt-10 max-w-4xl">
                <h2 className="mb-4 text-xl font-semibold">
                    {translations.all_feedbacks}
                </h2>

                {feedbacks.data.length > 0 ? (
                    <div className="space-y-4">
                        {feedbacks.data.map((f) => (
                            f.comment && (
                                <div key={f.id} className="rounded-lg border p-4 shadow-sm bg-white">
                                    <p className="text-gray-800">{f.comment}</p>
                                    <span className="text-sm text-gray-500">
                                        {new Date(f.created_at).toLocaleDateString('uz-UZ')}
                                    </span>
                                </div>
                            )
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 italic">{translations.no_feedbacks}</p>
                )}

                <div className="mt-6 flex justify-center space-x-2">
                    {feedbacks.links.map((link, index) => (
                        <Link
                            key={index}
                            href={link.url || '#'}
                            className={`px-3 py-1 rounded ${
                                link.active ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
                            }`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            </div>
        </Layout>
    );
}
