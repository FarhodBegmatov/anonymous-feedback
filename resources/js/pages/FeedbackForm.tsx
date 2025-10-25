import Layout from '@/components/Layout';
import type { FeedbackFormProps, FlashMessages, GradeType } from '@/types/FeedbackForm';
import { useForm, usePage } from '@inertiajs/react';
import { FormEvent, useEffect, useState } from 'react';

export default function FeedbackForm({
    department,
    locale,
    translations,
}: FeedbackFormProps) {
    const { flash } = usePage<{ flash: FlashMessages }>().props;
    const [showFlash, setShowFlash] = useState(!!(flash?.success || flash?.error));

    // Auto-hide flash message after 3 seconds
    useEffect(() => {
        if (flash?.success || flash?.error) {
            setShowFlash(true);
            const timer = setTimeout(() => setShowFlash(false), 3000);
            return () => clearTimeout(timer);
        }
        return undefined;
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

    const getGradeButtonClass = (grade: GradeType, isActive: boolean): string => {
        const baseClass = 'rounded-full text-white transition font-medium';
        const activeClass = 'px-4 py-2 shadow-lg scale-105';
        const inactiveClass = 'px-3 py-1.5';

        const colorClasses = {
            good: isActive ? 'bg-green-600' : 'bg-green-500 hover:bg-green-600',
            average: isActive ? 'bg-yellow-600' : 'bg-yellow-500 hover:bg-yellow-600',
            bad: isActive ? 'bg-red-600' : 'bg-red-400 hover:bg-red-600',
        };

        return `${baseClass} ${isActive ? activeClass : inactiveClass} ${colorClasses[grade]}`;
    };

    const grades: GradeType[] = ['good', 'average', 'bad'];

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
                            {grades.map((grade) => {
                                const isActive = data.grade === grade;
                                return (
                                    <button
                                        key={grade}
                                        type="button"
                                        onClick={() => setData('grade', grade)}
                                        className={getGradeButtonClass(grade, isActive)}
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
        </Layout>
    );
}
