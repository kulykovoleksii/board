import { Head, useForm } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';

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
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <div>
                                <label htmlFor="token" className="block text-sm font-medium text-gray-700 mb-1">
                                    SMS Code <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="token"
                                    value={data.token}
                                    onChange={(e) => setData('token', e.target.value)}
                                    className={`mt-1 block w-full rounded-md shadow-sm ${
                                        errors.token
                                            ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                                            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                                    }`}
                                    placeholder="Enter verification code"
                                    required
                                    autoFocus
                                    autoComplete="one-time-code"
                                />
                                {errors.token && (
                                    <p className="mt-1 text-sm text-red-600">{errors.token}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={processing}
                                className={`w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
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
                                        Verifying...
                                    </>
                                ) : (
                                    'Verify'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
