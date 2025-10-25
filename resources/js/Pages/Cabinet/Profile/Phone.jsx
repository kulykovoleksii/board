import { Head, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';
import CabinetLayout from '../../../Layouts/CabinetLayout';

export default function Phone() {
    const { auth, flash } = usePage().props;
    const user = auth.user;
    const [step, setStep] = useState(user.phone_verify_token_expire ? 'verify' : 'request');

    const { post: requestCode, processing: requestProcessing } = useForm({});
    const { data, setData, put, processing: verifyProcessing, errors } = useForm({
        token: '',
    });

    const handleRequest = (e) => {
        e.preventDefault();
        requestCode('/cabinet/profile/phone', {
            preserveScroll: true,
            onSuccess: () => {
                setStep('verify');
            },
        });
    };

    const handleVerify = (e) => {
        e.preventDefault();
        put('/cabinet/profile/phone', {
            preserveScroll: true,
        });
    };

    return (
        <CabinetLayout activeTab="profile">
            <Head title="Phone Verification" />

            <div className="max-w-2xl">
                <div className="bg-white shadow-sm rounded-lg">
                    {/* Header */}
                    <div className="px-6 py-5 border-b border-gray-200">
                        <h2 className="text-2xl font-semibold text-gray-900">Phone Verification</h2>
                        <p className="mt-1 text-sm text-gray-500">
                            Verify your phone number to enable additional features
                        </p>
                    </div>

                    {/* Error Message */}
                    {flash.error && (
                        <div className="mx-6 mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
                            <div className="flex">
                                <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                                <p className="ml-3 text-sm text-red-700">{flash.error}</p>
                            </div>
                        </div>
                    )}

                    <div className="px-6 py-6">
                        {/* Current Phone */}
                        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-600 mb-1">Your Phone Number:</p>
                            <p className="text-lg font-medium text-gray-900">{user.phone || 'Not set'}</p>
                        </div>

                        {step === 'request' ? (
                            /* Request Verification Code */
                            <div>
                                <p className="text-gray-700 mb-6">
                                    Click the button below to receive a verification code via SMS to your phone number.
                                </p>
                                <button
                                    onClick={handleRequest}
                                    disabled={requestProcessing}
                                    className={`w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                                        requestProcessing
                                            ? 'bg-blue-400 cursor-not-allowed'
                                            : 'bg-blue-600 hover:bg-blue-700'
                                    }`}
                                >
                                    {requestProcessing ? (
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
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                            Send Verification Code
                                        </>
                                    )}
                                </button>
                            </div>
                        ) : (
                            /* Enter Verification Code */
                            <form onSubmit={handleVerify}>
                                <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                                    <div className="flex">
                                        <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                        </svg>
                                        <p className="ml-3 text-sm text-blue-700">
                                            A verification code has been sent to your phone number.
                                        </p>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <label htmlFor="token" className="block text-sm font-medium text-gray-700 mb-2">
                                        Verification Code
                                    </label>
                                    <input
                                        type="text"
                                        id="token"
                                        value={data.token}
                                        onChange={(e) => setData('token', e.target.value)}
                                        placeholder="Enter 6-digit code"
                                        maxLength="6"
                                        className={`block w-full px-4 py-3 text-center text-2xl tracking-widest font-mono rounded-md shadow-sm ${
                                            errors.token
                                                ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                                                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                                        }`}
                                        required
                                        autoFocus
                                    />
                                    {errors.token && (
                                        <p className="mt-2 text-sm text-red-600">{errors.token}</p>
                                    )}
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        type="button"
                                        onClick={handleRequest}
                                        disabled={requestProcessing}
                                        className="flex-1 px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                                    >
                                        Resend Code
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={verifyProcessing || data.token.length !== 6}
                                        className={`flex-1 px-4 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                                            verifyProcessing || data.token.length !== 6
                                                ? 'bg-blue-400 cursor-not-allowed'
                                                : 'bg-blue-600 hover:bg-blue-700'
                                        }`}
                                    >
                                        {verifyProcessing ? 'Verifying...' : 'Verify Phone'}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>

                {/* Info Box */}
                <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-gray-900 mb-2">Why verify your phone?</h3>
                    <ul className="space-y-1 text-sm text-gray-600">
                        <li className="flex items-start gap-2">
                            <svg className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>Enable two-factor authentication</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <svg className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>Increase account security</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <svg className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>Recover your account if you forget your password</span>
                        </li>
                    </ul>
                </div>
            </div>
        </CabinetLayout>
    );
}
