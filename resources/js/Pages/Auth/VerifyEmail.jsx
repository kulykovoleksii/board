import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';
import AppLayout from '../../Layouts/AppLayout';

export default function VerifyEmail() {
    const { flash } = usePage().props;
    const { post, processing } = useForm({});
    const [sent, setSent] = useState(flash.status === 'verification-link-sent');

    const handleResend = (e) => {
        e.preventDefault();
        post('/email/resend', {
            preserveScroll: true,
            onSuccess: () => {
                setSent(true);
                setTimeout(() => setSent(false), 5000);
            },
        });
    };

    return (
        <AppLayout>
            <Head title="Verify Email" />

            <div className="min-h-[60vh] flex items-center justify-center px-4 py-12">
                <div className="max-w-md w-full">
                    <div className="bg-white rounded-lg shadow-md p-8">
                        {/* Icon */}
                        <div className="flex justify-center mb-6">
                            <div className="rounded-full bg-blue-100 p-3">
                                <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                        </div>

                        {/* Title */}
                        <h2 className="text-2xl font-bold text-center text-gray-900 mb-4">
                            Verify Your Email
                        </h2>

                        {/* Description */}
                        <p className="text-center text-gray-600 mb-6">
                            Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you?
                        </p>

                        {/* Success Message */}
                        {sent && (
                            <div className="mb-4 bg-green-50 border border-green-200 rounded-lg p-4">
                                <div className="flex">
                                    <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <p className="ml-3 text-sm text-green-700">
                                        A new verification link has been sent to your email address.
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Resend Button */}
                        <div className="space-y-4">
                            <button
                                onClick={handleResend}
                                disabled={processing}
                                className={`w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                                    processing
                                        ? 'bg-blue-400 cursor-not-allowed'
                                        : 'bg-blue-600 hover:bg-blue-700'
                                }`}
                            >
                                {processing ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                        </svg>
                                        Resend Verification Email
                                    </>
                                )}
                            </button>

                            {/* Logout Link */}
                            <div className="text-center">
                                <Link
                                    href="/logout"
                                    method="post"
                                    as="button"
                                    className="text-sm text-gray-600 hover:text-gray-900"
                                >
                                    Log Out
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Additional Help */}
                    <div className="mt-6 text-center text-sm text-gray-600">
                        <p>
                            If you didn't receive the email, check your spam folder or{' '}
                            <Link href="/contact" className="text-blue-600 hover:text-blue-700 font-medium">
                                contact support
                            </Link>
                            .
                        </p>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
