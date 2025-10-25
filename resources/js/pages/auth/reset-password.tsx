import { Form, Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import AuthLayout from '@/layouts/auth-layout';
import TextLink from '@/components/text-link';
import { route } from 'ziggy-js';

export default function ResetPassword({ token, email }: { token: string; email?: string }) {
    return (
        <AuthLayout title="Reset Password" description="Set your new password">
            <Head title="Reset Password" />

            <Form method="post" action="/reset-password">
                {({ processing, errors }) => (
                    <div>
                        <input type="hidden" name="token" value={token} />
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                defaultValue={email}
                                autoComplete="off"
                            />
                            <InputError message={errors.email} />

                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                name="password"
                                autoComplete="new-password"
                            />
                            <InputError message={errors.password} />

                            <Label htmlFor="password_confirmation">Confirm Password</Label>
                            <Input
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                autoComplete="new-password"
                            />
                            <InputError message={errors.password_confirmation} />
                        </div>

                        <div className="mt-4">
                            <Button type="submit" disabled={processing} className="w-full">
                                {processing ? 'Resetting...' : 'Reset Password'}
                            </Button>
                        </div>
                    </div>
                )}
            </Form>

            <div className="mt-4 text-center text-sm text-muted-foreground">
                <TextLink href={route('login')}>Back to login</TextLink>
            </div>
        </AuthLayout>
    );
}
