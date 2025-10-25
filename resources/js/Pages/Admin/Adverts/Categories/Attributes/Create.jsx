import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '../../../../../Layouts/AdminLayout';

export default function Create({ category, types }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        sort: '',
        type: 'string',
        variants: '',
        required: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(`/admin/adverts/categories/${category.id}/attributes`);
    };

    return (
        <AdminLayout>
            <Head title={`Create Attribute - ${category.name}`} />

            <div className="max-w-3xl mx-auto">
                <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                        <Link
                            href={`/admin/adverts/categories/${category.id}`}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Create Attribute for {category.name}
                        </h1>
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
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between mt-6">
                        <Link
                            href={`/admin/adverts/categories/${category.id}`}
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
                                    Creating...
                                </>
                            ) : (
                                <>
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Create Attribute
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
