import { Link } from '@inertiajs/react';

interface Action {
    label: string;
    href: string;
    variant?: 'primary' | 'success' | 'secondary';
}

interface PageHeaderProps {
    title: string;
    actions?: Action[];
}

export default function PageHeader({ title, actions = [] }: PageHeaderProps) {
    const getButtonClass = (variant: Action['variant'] = 'primary'): string => {
        const baseClass = 'rounded px-4 py-2 text-white transition';
        
        const variants = {
            primary: 'bg-blue-600 hover:bg-blue-700',
            success: 'bg-green-600 hover:bg-green-700',
            secondary: 'bg-gray-600 hover:bg-gray-700',
        };

        return `${baseClass} ${variants[variant]}`;
    };

    return (
        <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-semibold">{title}</h1>
            {actions.length > 0 && (
                <div className="flex items-center space-x-3">
                    {actions.map((action, index) => (
                        <Link
                            key={index}
                            href={action.href}
                            className={getButtonClass(action.variant)}
                        >
                            {action.label}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
