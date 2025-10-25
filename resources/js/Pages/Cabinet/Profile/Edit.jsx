import { Head, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';
import CabinetLayout from '../../../Layouts/CabinetLayout';

export default function Edit() {
    const { auth, errors: serverErrors } = usePage().props;
    const user = auth.user;

    const { data, setData, put, processing, errors } = useForm({
        name: user.name || '',
        last_name: user.last_name || '',
        phone: user.phone || '',
    });

    const [success, setSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSuccess(false);

        put('/cabinet/profile/update', {
            preserveScroll: true,
            onSuccess: () => {
                setSuccess(true);
                setTimeout(() => setSuccess(false), 3000);
            },
        });
    };

    return (
        <CabinetLayout activeTab="profile">
            <Head title="Edit Profile" />

            <div className="max-w-3xl">
                <div className="bg-white shadow-sm rounded-lg">
                    {/* Header */}
                    <div className="px-6 py-5 border-b border-gray-200">
                        <h2 className="text-2xl font-semibold text-gray-900">Edit Profile</h2>
                        <p className="mt-1 text-sm text-gray-500">
                            Update your profile information
                        </p>
                    </div>

                    {/* Success Message */}
                    {success && (
                        <div className="mx-6 mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
                            <div className="flex">
                                <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <p className="ml-3 text-sm text-green-700">
                                    Profile updated successfully
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="px-6 py-6 space-y-6">
                        {/* First Name */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                First Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className={`mt-1 block w-full rounded-md shadow-sm ${
                                    errors.name
                                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                                        : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                                }`}
                                required
                            />
                            {errors.name && (
                                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                            )}
                        </div>

                        {/* Last Name */}
                        <div>
                            <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-1">
                                Last Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="last_name"
                                value={data.last_name}
                                onChange={(e) => setData('last_name', e.target.value)}
                                className={`mt-1 block w-full rounded-md shadow-sm ${
                                    errors.last_name
                                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                                        : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                                }`}
                                required
                            />
                            {errors.last_name && (
                                <p className="mt-1 text-sm text-red-600">{errors.last_name}</p>
                            )}
                        </div>

                        {/* Email (read-only) */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={user.email}
                                disabled
                                className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 text-gray-500 shadow-sm cursor-not-allowed"
                            />
                            <p className="mt-1 text-xs text-gray-500">
                                Email cannot be changed
                            </p>
                        </div>

                        {/* Phone */}
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                Phone Number <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                                placeholder="380501234567"
                                className={`mt-1 block w-full rounded-md shadow-sm ${
                                    errors.phone
                                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                                        : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                                }`}
                                required
                            />
                            {errors.phone && (
                                <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                            )}
                            <p className="mt-1 text-xs text-gray-500">
                                Enter only digits (e.g., 380501234567)
                            </p>
                        </div>

                        {/* Buttons */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                            <button
                                type="button"
                                onClick={() => window.history.back()}
                                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={processing}
                                className={`px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                                    processing
                                        ? 'bg-blue-400 cursor-not-allowed'
                                        : 'bg-blue-600 hover:bg-blue-700'
                                }`}
                            >
                                {processing ? (
                                    <span className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Saving...
                                    </span>
                                ) : (
                                    'Save Changes'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </CabinetLayout>
    );
}
