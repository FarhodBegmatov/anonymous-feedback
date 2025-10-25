import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function FlashMessage() {
    const { props } = usePage();
    const flash = props.flash as { success?: string; error?: string };

    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);

    return <ToastContainer position="top-right" autoClose={3000} />;
}
