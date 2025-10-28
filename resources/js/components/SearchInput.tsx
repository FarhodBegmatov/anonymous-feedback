import { router } from '@inertiajs/react';
import React, { useCallback, useEffect, useRef, useState } from 'react';

interface SearchInputProps {
    searchType: 'faculty' | 'department' | 'feedback' | 'manager';
    placeholder?: string;
    className?: string;
    onSearch?: (query: string) => void;
}

interface Suggestion {
    id: number;
    name: Record<string, string> | string;
}

const SearchInput: React.FC<SearchInputProps> = ({
                                                     searchType,
                                                     placeholder = 'Search...',
                                                     className = '',
                                                     onSearch,
                                                 }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);
    const suggestionsTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const searchDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const locale = document.documentElement.lang || 'en';

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                searchRef.current &&
                !searchRef.current.contains(event.target as Node)
            ) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Debounced auto-search: harf kiritilgandan 300ms keyin onSearch chaqiriladi
    useEffect(() => {
        // Clear old debounce
        if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);

        // Agar onSearch berilgan bo'lsa, debounce bilan chaqiramiz
        if (onSearch) {
            // Agar qator bo'sh bo'lsa, agar kerak bo'lsa bo'sh qidiruv yuborish yoki yubormaslikni tanlang.
            // Bu yerda bo'sh qator uchun onSearch chaqirilmaydi (agar kerak bo'lsa o'zgartiring).
            if (!query.trim()) {
                // agar siz bo'sh inputda ham backendga bo'sh qidiruv yuborishni xohlasangiz:
                // onSearch('');
                return;
            }

            searchDebounceRef.current = setTimeout(() => {
                try {
                    onSearch(query.trim());
                } catch (e) {
                    console.error('onSearch error:', e);
                }
            }, 5); // 300ms debounce — kerak bo'lsa o'zgartiring
        }
        return () => {
            if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
        };
    }, [query, onSearch]);

    // Tavsiyalarni olish (alohida debounce)
    const getSuggestions = useCallback(async (q: string) => {
        if (!q || q.length < 2) {
            setSuggestions([]);
            return;
        }

        if (suggestionsTimeout.current) clearTimeout(suggestionsTimeout.current);

        setIsLoading(true);
        suggestionsTimeout.current = setTimeout(async () => {
            try {
                const response = await fetch(
                    `/api/suggestions?q=${encodeURIComponent(q)}&type=${searchType}`,
                );
                if (response.ok) {
                    const data = await response.json();
                    setSuggestions(data);
                }
            } catch (error) {
                console.error('Error fetching suggestions:', error);
            } finally {
                setIsLoading(false);
            }
        }, 250);
    }, [searchType]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value); // setQuery faqat holatni yangilaydi; onSearch useEffect orqali chaqiriladi
        setShowSuggestions(true);

        if (value.length >= 2) {
            getSuggestions(value).catch(console.error);
        } else {
            setSuggestions([]);
        }
    };

    const searchNow = (forceQuery?: string) => {
        const q = (forceQuery ?? query).trim();
        if (!q) return;

        // Agar parent onSearch bersa, chaqiramiz — odatda parent Inertia router.get ni ishlatadi.
        if (onSearch) {
            onSearch(q);
        } else {
            // Fallback: bevosita router orqali yuborish
            router.get('/search', { q, type: searchType });
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            // Enter bosilganda darhol qidiruv
            if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
            searchNow();
        }
    };

    const selectSuggestion = (item: Suggestion) => {
        const name =
            typeof item.name === 'string'
                ? item.name
                : item.name[locale] ||
                item.name.en ||
                Object.values(item.name)[0];
        setQuery(name);
        setShowSuggestions(false);
        setSuggestions([]);
        // darhol tanlangan qiymat bilan qidiruv
        if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
        searchNow(name);
    };

    return (
        <div className="relative" ref={searchRef}>
            <div className="relative">
                <input
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    className={`w-full rounded-lg border border-gray-300 py-2 pr-10 pl-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 ${className}`}
                />
                <div className="absolute top-1/2 right-2 flex -translate-y-1/2 items-center space-x-2">
                    {isLoading && (
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>
                    )}
                    <button
                        onClick={() => {
                            if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
                            searchNow();
                        }}
                        className="text-gray-500 hover:text-blue-600 focus:outline-none"
                    >
                        <i className="fas fa-search"></i>
                    </button>
                </div>
            </div>

            {suggestions.length > 0 && showSuggestions && (
                <div className="absolute z-10 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg">
                    <ul className="max-h-60 overflow-auto py-1">
                        {suggestions.map((item, index) => {
                            const name =
                                typeof item.name === 'string'
                                    ? item.name
                                    : item.name[locale] ||
                                    item.name.en ||
                                    Object.values(item.name)[0];
                            return (
                                <li
                                    key={`${item.id}-${index}`}
                                    onClick={() => selectSuggestion(item)}
                                    className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                                >
                                    {name}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SearchInput;
