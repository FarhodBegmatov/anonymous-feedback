import { Link } from '@inertiajs/react';

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginationProps {
    links: PaginationLink[];
    className?: string;
}

/**
 * Reusable Pagination Component
 * Follows DRY principle - used across all paginated views
 */
export default function Pagination({ links, className = '' }: PaginationProps) {
    // Don't render if there are no links or only one page
    if (!links || links.length <= 3) {
        return null;
    }

    return (
        <nav className={`mt-6 flex justify-center ${className}`} role="navigation">
            <ul className="inline-flex items-center space-x-1 rounded-lg border border-gray-200 bg-white shadow-sm">
                {links.map((link, index) => {
                    const isFirst = index === 0;
                    const isLast = index === links.length - 1;

                    // Parse label to remove HTML entities
                    const getCleanLabel = (label: string): string => {
                        if (label.includes('Previous')) return '‹';
                        if (label.includes('Next')) return '›';
                        return label.replace(/&laquo;|&raquo;/g, '');
                    };

                    const cleanLabel = getCleanLabel(link.label);

                    // Base button styles
                    const baseStyles = 'px-4 py-2 text-sm font-medium transition-colors duration-200';
                    
                    // Active state styles
                    const activeStyles = link.active
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100';

                    // Disabled state styles
                    const disabledStyles = !link.url
                        ? 'cursor-not-allowed text-gray-400'
                        : 'cursor-pointer';

                    // Border radius for first and last items
                    const borderStyles = isFirst
                        ? 'rounded-l-lg'
                        : isLast
                          ? 'rounded-r-lg'
                          : '';

                    return (
                        <li key={index} className="inline-flex">
                            {link.url ? (
                                <Link
                                    href={link.url}
                                    className={`${baseStyles} ${activeStyles} ${borderStyles}`}
                                    preserveScroll
                                    preserveState
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
