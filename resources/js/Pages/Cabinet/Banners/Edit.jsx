import { Head, Link, useForm } from '@inertiajs/react';
import CabinetLayout from '../../../Layouts/CabinetLayout';

export default function Edit({ banner }) {
    const { data, setData, put, processing, errors } = useForm({
        name: banner.name || '',
        limit: banner.limit || '',
        url: banner.url || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/cabinet/banners/${banner.id}`);
    };

    return (
        <CabinetLayout activeTab="banners">
            <Head title="Edit Banner" />

            <div className="max-w-3xl mx-auto">
                <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                        <Link
                            href={`/cabinet/banners/${banner.id}`}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-900">Edit Banner</h1>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
                        {/* Name */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                Name <span className="text-red-500">*</span>
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
                                placeholder="Enter banner name"
                                required
                            />
                            {errors.name && (
                                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                            )}
                        </div>

                        {/* Views Limit */}
                        <div>
                            <label htmlFor="limit" className="block text-sm font-medium text-gray-700 mb-1">
                                Views Limit <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                id="limit"
                                value={data.limit}
                                onChange={(e) => setData('limit', e.target.value)}
                                className={`mt-1 block w-full rounded-md shadow-sm ${
                                    errors.limit
                                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                                        : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                                }`}
                                placeholder="Maximum number of views"
                                required
                            />
                            {errors.limit && (
                                <p className="mt-1 text-sm text-red-600">{errors.limit}</p>
                            )}
                            <p className="mt-2 text-sm text-gray-500">
                                Specify the maximum number of times this banner should be displayed.
                            </p>
                        </div>

                        {/* URL */}
                        <div>
                            <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
                                URL <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="url"
                                id="url"
                                value={data.url}
                                onChange={(e) => setData('url', e.target.value)}
                                className={`mt-1 block w-full rounded-md shadow-sm ${
                                    errors.url
                                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                                        : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                                }`}
                                placeholder="https://example.com"
                                required
                            />
                            {errors.url && (
                                <p className="mt-1 text-sm text-red-600">{errors.url}</p>
                            )}
                            <p className="mt-2 text-sm text-gray-500">
                                The URL where users will be redirected when clicking the banner.
                            </p>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between mt-6">
                        <Link
                            href={`/cabinet/banners/${banner.id}`}
                            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Cancel
                        </Link>

                        <button
                            type="submit"
                            disabled={processing}
                            className={`inline-flex items-center px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
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
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Save Changes
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </CabinetLayout>
    );
}
