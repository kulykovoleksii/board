import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '../../../../../Layouts/AdminLayout';

export default function Edit({ category, attribute, types }) {
    const { data, setData, put, processing, errors } = useForm({
        name: attribute.name || '',
        sort: attribute.sort || '',
        type: attribute.type || 'string',
        variants: attribute.variants ? attribute.variants.join('\n') : '',
        required: attribute.required || false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/admin/adverts/categories/${category.id}/attributes/${attribute.id}`);
    };

    return (
        <AdminLayout>
            <Head title={`Edit Attribute: ${attribute.name}`} />

            <div className="max-w-3xl mx-auto">
                <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                        <Link
                            href={`/admin/adverts/categories/${category.id}/attributes/${attribute.id}`}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Edit Attribute: {attribute.name}
                        </h1>
                    </div>
                    <p className="text-gray-600">
                        Category: {category.name}
                    </p>
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
                                placeholder="Enter attribute name"
                                required
                            />
                            {errors.name && (
                                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                            )}
                        </div>

                        {/* Sort */}
                        <div>
                            <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-1">
                                Sort Order <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                id="sort"
                                value={data.sort}
                                onChange={(e) => setData('sort', e.target.value)}
                                className={`mt-1 block w-full rounded-md shadow-sm ${
                                    errors.sort
                                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                                        : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                                }`}
                                placeholder="0"
                                required
                            />
                            {errors.sort && (
                                <p className="mt-1 text-sm text-red-600">{errors.sort}</p>
                            )}
                            <p className="mt-2 text-sm text-gray-500">
                                Numeric value to control display order (lower numbers appear first).
                            </p>
                        </div>

                        {/* Type */}
                        <div>
                            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                                Type <span className="text-red-500">*</span>
                            </label>
                            <select
                                id="type"
                                value={data.type}
                                onChange={(e) => setData('type', e.target.value)}
                                className={`mt-1 block w-full rounded-md shadow-sm ${
                                    errors.type
                                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                                        : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                                }`}
                                required
                            >
                                {Object.entries(types).map(([value, label]) => (
                                    <option key={value} value={value}>
                                        {label}
                                    </option>
                                ))}
                            </select>
                            {errors.type && (
                                <p className="mt-1 text-sm text-red-600">{errors.type}</p>
                            )}
                            <p className="mt-2 text-sm text-gray-500">
                                Data type for this attribute.
                            </p>
                        </div>

                        {/* Variants */}
                        <div>
                            <label htmlFor="variants" className="block text-sm font-medium text-gray-700 mb-1">
                                Variants
                            </label>
                            <textarea
                                id="variants"
                                value={data.variants}
                                onChange={(e) => setData('variants', e.target.value)}
                                rows={5}
                                className={`mt-1 block w-full rounded-md shadow-sm ${
                                    errors.variants
                                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                                        : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                                }`}
                                placeholder="Enter one variant per line"
                            />
                            {errors.variants && (
                                <p className="mt-1 text-sm text-red-600">{errors.variants}</p>
                            )}
                            <p className="mt-2 text-sm text-gray-500">
                                Optional. Enter predefined values, one per line. If provided, this attribute will be rendered as a select field.
                            </p>
                        </div>

                        {/* Required */}
                        <div>
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={data.required}
                                    onChange={(e) => setData('required', e.target.checked)}
                                    className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                                <span className="ml-2 text-sm font-medium text-gray-700">
                                    Required
                                </span>
                            </label>
                            {errors.required && (
                                <p className="mt-1 text-sm text-red-600">{errors.required}</p>
                            )}
                            <p className="mt-2 text-sm text-gray-500">
                                Check if this attribute must be filled when creating adverts.
                            </p>
                        </div>

                        {/* Warning Box */}
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                            <div className="flex">
                                <svg className="h-5 w-5 text-yellow-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-yellow-800">
                                        Important
                                    </h3>
                                    <p className="mt-1 text-sm text-yellow-700">
                                        Changing the attribute type or variants may affect existing adverts that use this attribute.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between mt-6">
                        <Link
                            href={`/admin/adverts/categories/${category.id}/attributes/${attribute.id}`}
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
        </AdminLayout>
    );
}
