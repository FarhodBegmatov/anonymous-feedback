import { Link } from '@inertiajs/react';

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

export interface PaginationProps {
    links: PaginationLink[];
    filters?: {
        search?: string;
        type?: string;
    };
    className?: string;
}

export default function Pagination({ links, className = '' }: PaginationProps) {
    if (!links || links.length <= 1) return null;

    return (
        <nav
            className={`mt-6 flex justify-center ${className}`}
            role="navigation"
        >
            <ul className="inline-flex items-center space-x-1 rounded-lg border border-gray-200 bg-white shadow-sm">
                {links.map((link, index) => {
                    const isFirst = index === 0;
                    const isLast = index === links.length - 1;

                    const getCleanLabel = (label: string) => {
                        if (label.includes('Previous')) return '‹';
                        if (label.includes('Next')) return '›';
                        return label.replace(/&laquo;|&raquo;/g, '');
                    };

                    const cleanLabel = getCleanLabel(link.label);

                    const baseStyles =
                        'px-4 py-2 text-sm font-medium transition-colors duration-200';
                    const activeStyles = link.active
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100';
                    const disabledStyles = !link.url
                        ? 'cursor-not-allowed text-gray-400'
                        : 'cursor-pointer';
                    const borderStyles = isFirst
                        ? 'rounded-l-lg'
                        : isLast
                          ? 'rounded-r-lg'
                          : '';

                    return (
                        <li key={index} className="inline-flex">
                            {link.url ? (
                                <Link
                                    href={link.url!} // URL should always exist
                                    className={`${baseStyles} ${link.active ? activeStyles : ''} ${borderStyles}`}
                                    preserveScroll
                                    replace={false} // don't replace the page
                                    only={['faculties', 'departments', 'managers']}
                                >
                                    {cleanLabel}
                                </Link>
                            ) : (
                                <span
                                    className={`${baseStyles} ${disabledStyles} ${borderStyles}`}
                                >
                                    {cleanLabel}
                                </span>
                            )}
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
