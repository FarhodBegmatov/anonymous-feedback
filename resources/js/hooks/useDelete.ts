import { ApiService } from '@/lib/api';
import { useState } from 'react';
import { toast } from 'react-toastify';

interface UseDeleteOptions {
    resourceName: string;
    onSuccess?: () => void;
}

export function useDelete({ resourceName, onSuccess }: UseDeleteOptions) {
    const [isDeleting, setIsDeleting] = useState(false);

    const deleteResource = async (url: string) => {
        if (!confirm(`Are you sure you want to delete this ${resourceName}?`)) {
            return;
        }

        setIsDeleting(true);

        try {
            const response = await ApiService.delete(url);

            if (response.ok) {
                const data = await response.json();
                toast.success(data.message || `${resourceName} deleted successfully`);
                
                // Reload the page after a short delay to show the success message
                setTimeout(() => {
                    if (onSuccess) {
                        onSuccess();
                    } else {
                        window.location.reload();
                    }
                }, 500);
            } else {
                const errorData = await response.json().catch(() => ({}));
                toast.error(
                    errorData.message || `Error deleting ${resourceName}`,
                );
            }
        } catch (error) {
            console.error('Delete error:', error);
            toast.error(`An error occurred while deleting the ${resourceName}`);
        } finally {
            setIsDeleting(false);
        }
    };

    return { deleteResource, isDeleting };
}
