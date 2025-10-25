import { Head, Link, useForm } from '@inertiajs/react';
import CabinetLayout from '../../../../Layouts/CabinetLayout';

export default function Attributes({ advert }) {
    // Get all attributes from category
    const attributes = advert.category?.attributes || [];

    // Build initial data from existing attribute values
    const initialData = {};
    attributes.forEach(attribute => {
        const existingValue = advert.values?.find(v => v.attribute_id === attribute.id);
        initialData[`attribute_${attribute.id}`] = existingValue?.value || '';
    });

    const { data, setData, post, processing, errors } = useForm(initialData);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(`/cabinet/adverts/${advert.id}/attributes`);
    };

    const isSelect = (attribute) => {
        return attribute.variants && attribute.variants.length > 0;
    };

    const isNumber = (attribute) => {
        return attribute.type === 'integer' || attribute.type === 'float';
    };

    const getInputType = (attribute) => {
        if (attribute.type === 'integer') return 'number';
        if (attribute.type === 'float') return 'number';
        return 'text';
    };

    const getStep = (attribute) => {
        if (attribute.type === 'float') return '0.01';
        if (attribute.type === 'integer') return '1';
        return undefined;
    };

    return (
        <CabinetLayout>
            <Head title={`Edit Attributes - ${advert.title}`} />

            <div className="max-w-5xl mx-auto">
                <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                        <Link
                            href={`/adverts/${advert.id}`}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Edit Attributes
                        </h1>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-6">Advert Attributes</h2>

                        {attributes.length === 0 ? (
                            <p className="text-gray-500 text-sm">This category has no additional attributes.</p>
                        ) : (
                            <div className="space-y-6">
                                {attributes.map((attribute) => (
                                    <div key={attribute.id}>
                                        <label
                                            htmlFor={`attribute_${attribute.id}`}
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                        >
                                            {attribute.name}
                                            {attribute.required && <span className="text-red-500 ml-1">*</span>}
                                        </label>

                                        {isSelect(attribute) ? (
                                            <select
                                                id={`attribute_${attribute.id}`}
                                                value={data[`attribute_${attribute.id}`]}
                                                onChange={(e) => setData(`attribute_${attribute.id}`, e.target.value)}
                                                className={`mt-1 block w-full rounded-md shadow-sm ${
                                                    errors[`attribute_${attribute.id}`]
                                                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                                                        : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                                                }`}
                                                required={attribute.required}
                                            >
                                                <option value="">Select {attribute.name}</option>
                                                {attribute.variants.map((variant, index) => (
                                                    <option key={index} value={variant}>
                                                        {variant}
                                                    </option>
                                                ))}
                                            </select>
                                        ) : isNumber(attribute) ? (
                                            <input
                                                type={getInputType(attribute)}
                                                id={`attribute_${attribute.id}`}
                                                value={data[`attribute_${attribute.id}`]}
                                                onChange={(e) => setData(`attribute_${attribute.id}`, e.target.value)}
                                                step={getStep(attribute)}
                                                className={`mt-1 block w-full rounded-md shadow-sm ${
                                                    errors[`attribute_${attribute.id}`]
                                                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                                                        : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                                                }`}
                                                placeholder={`Enter ${attribute.name.toLowerCase()}`}
                                                required={attribute.required}
                                            />
                                        ) : (
                                            <input
                                                type="text"
                                                id={`attribute_${attribute.id}`}
                                                value={data[`attribute_${attribute.id}`]}
                                                onChange={(e) => setData(`attribute_${attribute.id}`, e.target.value)}
                                                className={`mt-1 block w-full rounded-md shadow-sm ${
                                                    errors[`attribute_${attribute.id}`]
                                                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                                                        : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                                                }`}
                                                placeholder={`Enter ${attribute.name.toLowerCase()}`}
                                                required={attribute.required}
                                            />
                                        )}

                                        {errors[`attribute_${attribute.id}`] && (
                                            <p className="mt-1 text-sm text-red-600">{errors[`attribute_${attribute.id}`]}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between mt-6">
                        <Link
                            href={`/adverts/${advert.id}`}
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
