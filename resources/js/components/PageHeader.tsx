import { debounce } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';

interface ActionButton {
    label: string;
    href: string;
    variant?: 'primary' | 'success' | 'danger';
}

interface PageHeaderProps {
    title: string;
    showSearch?: boolean;
    searchType?: string;
    searchPlaceholder?: string;
    onSearch?: (query: string) => void;
    actions?: ActionButton[];
}

const PageHeader: React.FC<PageHeaderProps> = ({
    title,
    showSearch = false,
    searchPlaceholder = 'Search...',
    onSearch,
    actions = [],
}) => {
    const [query, setQuery] = useState('');

    // 🔹 1. Debounce yordamida qidiruvni kechiktirib yuboramiz
    const debouncedSearch = useCallback(
        debounce((value: string) => {
            if (onSearch) onSearch(value);
        }, 400),
        [onSearch],
    );

    // 🔹 2. Har safar input o‘zgarganda debounced funksiyani chaqiramiz
    useEffect(() => {
        debouncedSearch(query);
        return () => {
            debouncedSearch.cancel(); // komponent unmount bo‘lsa to‘xtatish
        };
    }, [query, debouncedSearch]);

    // 🔹 3. Input qiymatini boshqarish
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
    };

    // 🔹 4. Harakat tugmalari uchun ranglar
    const getVariantStyle = (variant?: string) => {
        switch (variant) {
            case 'success':
                return 'bg-green-600 hover:bg-green-700 text-white';
            case 'danger':
                return 'bg-red-600 hover:bg-red-700 text-white';
            default:
                return 'bg-blue-600 hover:bg-blue-700 text-white';
        }
    };

    return (
        <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            {/* 🔸 Sarlavha */}
            <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>

            {/* 🔸 Qidiruv inputi va tugmalar */}
            <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
                {showSearch && (
                    <input
                        type="text"
                        placeholder={searchPlaceholder}
                        value={query}
                        onChange={handleChange}
                        className="rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                    />
                )}

                <div className="flex flex-wrap justify-end gap-2">
                    {actions.map((action, i) => (
                        <a
                            key={i}
                            href={action.href}
                            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${getVariantStyle(action.variant)}`}
                        >
                            {action.label}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PageHeader;
