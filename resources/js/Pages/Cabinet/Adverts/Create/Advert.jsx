import { Head, Link, useForm } from '@inertiajs/react';
import CabinetLayout from '../../../../Layouts/CabinetLayout';

export default function Advert({ category, region }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        content: '',
        price: '',
        address: '',
        attribute: {},
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = `/cabinet/adverts/create/advert/${category.id}${region ? `/${region.id}` : ''}`;
        post(url);
    };

    const handleAttributeChange = (attributeId, value) => {
        setData('attribute', {
            ...data.attribute,
            [attributeId]: value,
        });
    };

    const renderAttribute = (attribute) => {
        const fieldName = `attribute.${attribute.id}`;
        const value = data.attribute[attribute.id] || '';
        const error = errors[fieldName];

        if (attribute.type === 'select') {
            return (
                <div key={attribute.id}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        {attribute.name}
                        {attribute.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    <select
                        value={value}
                        onChange={(e) => handleAttributeChange(attribute.id, e.target.value)}
                        className={`mt-1 block w-full rounded-md shadow-sm ${
                            error
                                ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                        }`}
                        required={attribute.required}
                    >
                        <option value="">Select {attribute.name}</option>
                        {attribute.variants && attribute.variants.map((variant, index) => (
                            <option key={index} value={variant}>
                                {variant}
                            </option>
                        ))}
                    </select>
                    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
                </div>
            );
        }

        const inputType = attribute.type === 'integer' || attribute.type === 'float' ? 'number' : 'text';
        const step = attribute.type === 'float' ? '0.01' : undefined;

        return (
            <div key={attribute.id}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {attribute.name}
                    {attribute.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                <input
                    type={inputType}
                    step={step}
                    value={value}
                    onChange={(e) => handleAttributeChange(attribute.id, e.target.value)}
                    className={`mt-1 block w-full rounded-md shadow-sm ${
                        error
                            ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                    }`}
                    required={attribute.required}
                />
                {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
            </div>
        );
    };

    return (
        <CabinetLayout activeTab="adverts">
            <Head title="Create Advert" />

            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Create New Advert</h1>
                    <p className="text-gray-600">Step 3 of 3: Fill in the details</p>
                    <div className="mt-2 text-sm text-gray-500">
                        Category: <span className="font-medium text-gray-700">{category.name}</span>
                        {region && (
                            <span className="ml-4">
                                Region: <span className="font-medium text-gray-700">{region.name}</span>
                            </span>
                        )}
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex items-center">
                        <div className="flex items-center text-green-600 relative">
                            <div className="rounded-full h-10 w-10 flex items-center justify-center bg-green-600 text-white">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <span className="ml-2 text-sm font-medium">Category</span>
                        </div>
                        <div className="flex-auto border-t-2 border-green-600 mx-4"></div>
                        <div className="flex items-center text-green-600">
                            <div className="rounded-full h-10 w-10 flex items-center justify-center bg-green-600 text-white">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <span className="ml-2 text-sm font-medium">Region</span>
                        </div>
                        <div className="flex-auto border-t-2 border-green-600 mx-4"></div>
                        <div className="flex items-center text-blue-600">
                            <div className="rounded-full h-10 w-10 flex items-center justify-center bg-blue-600 text-white font-semibold">
                                3
                            </div>
                            <span className="ml-2 text-sm font-medium">Details</span>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
                        {/* Title */}
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                                Title <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="title"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                className={`mt-1 block w-full rounded-md shadow-sm ${
                                    errors.title
                                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                                        : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                                }`}
                                placeholder="Enter a clear title for your advert"
                                required
                            />
                            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                        </div>

                        {/* Content */}
                        <div>
                            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                                Description <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                id="content"
                                rows={6}
                                value={data.content}
                                onChange={(e) => setData('content', e.target.value)}
                                className={`mt-1 block w-full rounded-md shadow-sm ${
                                    errors.content
                                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                                        : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                                }`}
                                placeholder="Describe your advert in detail"
                                required
                            />
                            {errors.content && <p className="mt-1 text-sm text-red-600">{errors.content}</p>}
                        </div>

                        {/* Price */}
                        <div>
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                                Price (USD) <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                id="price"
                                value={data.price}
                                onChange={(e) => setData('price', e.target.value)}
                                className={`mt-1 block w-full rounded-md shadow-sm ${
                                    errors.price
                                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                                        : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                                }`}
                                placeholder="0"
                                min="0"
                                required
                            />
                            {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
                            <p className="mt-1 text-sm text-gray-500">Enter 0 for free items</p>
                        </div>

                        {/* Address */}
                        <div>
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                                Address <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="address"
                                value={data.address}
                                onChange={(e) => setData('address', e.target.value)}
                                className={`mt-1 block w-full rounded-md shadow-sm ${
                                    errors.address
                                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                                        : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                                }`}
                                placeholder="Street, City, ZIP"
                                required
                            />
                            {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
                        </div>

                        {/* Category Attributes */}
                        {category.allAttributes && category.allAttributes.length > 0 && (
                            <div className="pt-6 border-t">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Details</h3>
                                <div className="space-y-4">
                                    {category.allAttributes.map(renderAttribute)}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between mt-6">
                        <Link
                            href={`/cabinet/adverts/create/region/${category.id}${region ? `/${region.id}` : ''}`}
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
                                    Create Advert
                                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </CabinetLayout>
    );
}
