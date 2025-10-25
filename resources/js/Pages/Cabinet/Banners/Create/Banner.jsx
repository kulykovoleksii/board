import { Head, Link, useForm } from '@inertiajs/react';
import CabinetLayout from '../../../../Layouts/CabinetLayout';

export default function Banner({ category, region, formats }) {
    const storeUrl = region
        ? `/cabinet/banners/create/${category.id}/${region.id}/banner`
        : `/cabinet/banners/create/${category.id}/banner`;

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        limit: '',
        url: '',
        format: formats && formats.length > 0 ? formats[0] : '',
        file: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(storeUrl);
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setData('file', e.target.files[0]);
        }
    };

    return (
        <CabinetLayout activeTab="banners">
            <Head title="Create Banner - Banner Details" />

            <div className="max-w-4xl mx-auto">
                <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                        <Link
                            href={region ? `/cabinet/banners/create/${category.id}/${region.id}/region` : `/cabinet/banners/create/${category.id}/region`}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-900">Create Banner</h1>
                    </div>
                    <p className="text-gray-600">Step 3 of 3: Enter banner details</p>
                </div>

                {/* Progress Indicator */}
                <div className="mb-8">
                    <div className="flex items-center">
                        <div className="flex items-center text-green-600">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-600 text-white">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <span className="ml-2 text-sm font-medium">Category</span>
                        </div>
                        <div className="flex-1 h-0.5 mx-4 bg-green-600"></div>
                        <div className="flex items-center text-green-600">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-600 text-white">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <span className="ml-2 text-sm font-medium">Region</span>
                        </div>
                        <div className="flex-1 h-0.5 mx-4 bg-blue-600"></div>
                        <div className="flex items-center text-blue-600">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-semibold">
                                3
                            </div>
                            <span className="ml-2 text-sm font-medium">Banner Details</span>
                        </div>
                    </div>
                </div>

                {/* Selection Summary */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6 space-y-2">
                    <div className="flex items-center">
                        <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                        <span className="text-sm text-gray-600">Category:</span>
                        <span className="ml-2 text-sm font-semibold text-gray-900">{category.name}</span>
                    </div>
                    <div className="flex items-center">
                        <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        <span className="text-sm text-gray-600">Region:</span>
                        <span className="ml-2 text-sm font-semibold text-gray-900">{region ? region.name : 'All Regions'}</span>
                    </div>
                </div>

                <form onSubmit={handleSubmit} encType="multipart/form-data">
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

                        {/* Format */}
                        <div>
                            <label htmlFor="format" className="block text-sm font-medium text-gray-700 mb-1">
                                Format <span className="text-red-500">*</span>
                            </label>
                            <select
                                id="format"
                                value={data.format}
                                onChange={(e) => setData('format', e.target.value)}
                                className={`mt-1 block w-full rounded-md shadow-sm ${
                                    errors.format
                                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                                        : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                                }`}
                                required
                            >
                                {formats && formats.map((format) => (
                                    <option key={format} value={format}>
                                        {format}
                                    </option>
                                ))}
                            </select>
                            {errors.format && (
                                <p className="mt-1 text-sm text-red-600">{errors.format}</p>
                            )}
                        </div>

                        {/* File Upload */}
                        <div>
                            <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-1">
                                Banner File <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="file"
                                id="file"
                                onChange={handleFileChange}
                                className={`mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 ${
                                    errors.file ? 'border-red-300' : ''
                                }`}
                                accept="image/*"
                                required
                            />
                            {errors.file && (
                                <p className="mt-1 text-sm text-red-600">{errors.file}</p>
                            )}
                            <p className="mt-2 text-sm text-gray-500">
                                Upload an image file for your banner. Make sure the dimensions match the selected format.
                            </p>
                        </div>

                        {/* Info Box */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <div className="flex">
                                <svg className="h-5 w-5 text-blue-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                </svg>
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-blue-800">
                                        What happens next?
                                    </h3>
                                    <div className="mt-2 text-sm text-blue-700">
                                        <ul className="list-disc list-inside space-y-1">
                                            <li>Your banner will be created as a draft</li>
                                            <li>You can edit it before sending to moderation</li>
                                            <li>Once approved, you can order it for payment</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between mt-6">
                        <Link
                            href={region ? `/cabinet/banners/create/${category.id}/${region.id}/region` : `/cabinet/banners/create/${category.id}/region`}
                            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back
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
                                    Creating...
                                </>
                            ) : (
                                <>
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Create Banner
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </CabinetLayout>
    );
}