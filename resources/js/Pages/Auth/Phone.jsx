import { Head, useForm } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';
import { Button, Card, Input } from '../../Components';

export default function Phone() {
    const { data, setData, post, processing, errors } = useForm({
        token: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/login/phone');
    };

    return (
        <AppLayout>
            <Head title="SMS Verification" />

            <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
                            SMS Verification
                        </h2>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            Enter the verification code sent to your phone
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                        <Card>
                            <Input
                                label="SMS Code"
                                type="text"
                                value={data.token}
                                onChange={(e) => setData('token', e.target.value)}
                                error={errors.token}
                                placeholder="Enter verification code"
                                required
                                autoFocus
                                autoComplete="one-time-code"
                            />
                        </Card>

                        <Button
                            type="submit"
                            loading={processing}
                            className="w-full"
                        >
                            {processing ? 'Verifying...' : 'Verify'}
                        </Button>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
