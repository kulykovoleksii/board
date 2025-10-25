import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '../../../../../Layouts/AdminLayout';

export default function Show({ category, attribute }) {
    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this attribute?')) {
            router.delete(`/admin/adverts/categories/${category.id}/attributes/${attribute.id}`);
        }
    };

    const typesLabels = {
        string: 'String',
        integer: 'Integer',
        float: 'Float',
    };

    return (
        <AdminLayout>
            <Head title={`${attribute.name} - ${category.name}`} />

            <div className="max-w-5xl mx-auto">
                {/* Header */}
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
                            {attribute.name}
                        </h1>
                    </div>
                    <p className="text-gray-600">
                        Category: {category.name}
                    </p>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mb-6">
                    <Link
                        href={`/admin/adverts/categories/${category.id}/attributes/${attribute.id}/edit`}
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit
                    </Link>
                    <button
                        onClick={handleDelete}
                        className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 font-medium"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete
                    </button>
                </div>

                {/* Details */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <tbody className="bg-white divide-y divide-gray-200">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 bg-gray-50 w-1/4">
                                    ID
                                </th>
                                <td className="px-6 py-4 text-sm text-gray-900">
                                    {attribute.id}
                                </td>
                            </tr>
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 bg-gray-50">
                                    Name
                                </th>
                                <td className="px-6 py-4 text-sm text-gray-900">
                                    {attribute.name}
                                </td>
                            </tr>
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 bg-gray-50">
                                    Type
                                </th>
                                <td className="px-6 py-4 text-sm text-gray-900">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                        {typesLabels[attribute.type] || attribute.type}
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 bg-gray-50">
                                    Sort Order
                                </th>
                                <td className="px-6 py-4 text-sm text-gray-900">
                                    {attribute.sort}
                                </td>
                            </tr>
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 bg-gray-50">
                                    Required
                                </th>
                                <td className="px-6 py-4 text-sm text-gray-900">
                                    {attribute.required ? (
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                            Yes
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                            No
                                        </span>
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 bg-gray-50">
                                    Variants
                                </th>
                                <td className="px-6 py-4 text-sm text-gray-900">
                                    {attribute.variants && attribute.variants.length > 0 ? (
                                        <ul className="list-disc list-inside space-y-1">
                                            {attribute.variants.map((variant, index) => (
                                                <li key={index}>{variant}</li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <span className="text-gray-400">-</span>
                                    )}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}
