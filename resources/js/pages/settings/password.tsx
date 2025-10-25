import { useRef } from 'react';
import { route } from 'ziggy-js';
import { Transition } from '@headlessui/react';
import { Head, useForm, usePage } from '@inertiajs/react';

// Import components
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';

// Types
interface BreadcrumbItem {
    title: string;
    href: string;
}

type PageProps = {
    csrf: string;
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Password settings',
        href: route('password.update'),
    },
];

export default function Password() {
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);
    
    const { csrf } = usePage<PageProps>().props;
    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm<{
        current_password: string;
        password: string;
        password_confirmation: string;
    }>({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Password settings" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall
                        title="Update password"
                        description="Ensure your account is using a long, random password to stay secure"
                    />

                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            put(route('password.update'), {
                                preserveScroll: true,
                                onSuccess: () => reset(),
                                onError: (errors) => {
                                    if (errors.password) {
                                        passwordInput.current?.focus();
                                    }
                                    if (errors.current_password) {
                                        currentPasswordInput.current?.focus();
                                    }
                                },
                            });
                        }}
                        className="space-y-6"
                    >
                        <input type="hidden" name="_token" value={csrf} />
                        <input type="hidden" name="_method" value="PUT" />
                        <div className="grid gap-2">
                                    <Label htmlFor="current_password">
                                        Current password
                                    </Label>

                                    <Input
                                        id="current_password"
                                        ref={currentPasswordInput}
                                        name="current_password"
                                        type="password"
                                        className="mt-1 block w-full"
                                        autoComplete="current-password"
                                        placeholder="Current password"
                                        value={data.current_password}
                                        onChange={(e) => setData('current_password', e.target.value)}
                                    />

                                    <InputError
                                        message={errors.current_password}
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="password">
                                        New password
                                    </Label>

                                    <Input
                                        id="password"
                                        ref={passwordInput}
                                        name="password"
                                        type="password"
                                        className="mt-1 block w-full"
                                        autoComplete="new-password"
                                        placeholder="New password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                    />

                                    <InputError message={errors.password} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="password_confirmation">
                                        Confirm password
                                    </Label>

                                    <Input
                                        id="password_confirmation"
                                        name="password_confirmation"
                                        type="password"
                                        className="mt-1 block w-full"
                                        autoComplete="new-password"
                                        placeholder="Confirm password"
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                    />

                                    <InputError message={errors.password_confirmation} />
                                </div>

                                <div className="flex items-center gap-4">
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        data-test="update-password-button"
                                    >
                                        {processing ? 'Saving...' : 'Save'}
                                    </Button>

                                    <Transition
                                        show={Boolean(recentlySuccessful)}
                                        enter="transition ease-in-out"
                                        enterFrom="opacity-0"
                                        leave="transition ease-in-out"
                                        leaveTo="opacity-0"
                                    >
                                        <p className="text-sm text-green-600">
                                            Saved
                                        </p>
                                    </Transition>
                        </div>
                    </form>
                </div>
            </SettingsLayout>
        </AppLayout>
    )
}
