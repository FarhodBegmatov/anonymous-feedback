import { Form, Head } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import AuthLayout from '@/layouts/auth-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { route } from 'ziggy-js';

export default function ForgotPassword({ status }: { status?: string }) {
    return (
        <AuthLayout
            title="Forgot password"
            description="Enter your email to receive a password reset link"
        >
            <Head title="Forgot password" />

            {status && (
                <div className="mb-4 text-center text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <div className="space-y-6">
                <Form
                    method="post"
                    action={route('password.email')}
                    className="space-y-6"
                >
                    {({ processing, errors }) => (
                        <div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    autoComplete="off"
                                    autoFocus
                                    required
                                    placeholder="email@example.com"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="mt-6">
                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={processing}
                                    data-test="email-password-reset-link-button"
                                >
                                    {processing ? (
                                        <>
                                            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                                            Sending Reset Link...
                                        </>
                                    ) : 'Email Password Reset Link'}
                                </Button>
                            </div>
                        </div>
                    )}
                </Form>

                <div className="text-center text-sm text-muted-foreground">
                    Remember your password?{' '}
                    <TextLink href={route('login')}>
                        Sign in
                    </TextLink>
                </div>
            </div>
        </AuthLayout>
    );
}
