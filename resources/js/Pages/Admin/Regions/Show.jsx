import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';

export default function Show({ region, regions }) {
    const handleDelete = (regionId) => {
        if (confirm('Are you sure you want to delete this region?')) {
            router.delete(`/admin/regions/${regionId}`, {
                onSuccess: () => {
                    // If this is a subregion, stay on parent page
                    // The redirect will be handled by the controller
                }
            });
        }
    };

    return (
        <AdminLayout>
            <Head title={`Region: ${region.name}`} />

            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                        <Link
                            href="/admin/regions"
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-900">Region: {region.name}</h1>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mb-6">
                    <Link
                        href={`/admin/regions/${region.id}/edit`}
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit
                    </Link>
                    <button
                        onClick={() => handleDelete(region.id)}
                        className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 font-medium"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete
                    </button>
                </div>

                {/* Details */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                    <table className="min-w-full divide-y divide-gray-200">
                        <tbody className="bg-white divide-y divide-gray-200">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 bg-gray-50 w-1/4">
                                    ID
                                </th>
                                <td className="px-6 py-4 text-sm text-gray-900">
                                    {region.id}
                                </td>
                            </tr>
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 bg-gray-50">
                                    Name
                                </th>
                                <td className="px-6 py-4 text-sm text-gray-900">
                                    {region.name}
                                </td>
                            </tr>
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 bg-gray-50">
                                    Slug
                                </th>
                                <td className="px-6 py-4 text-sm text-gray-900">
                                    {region.slug}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Subregions */}
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-gray-900">Subregions</h2>
                        <Link
                            href={`/admin/regions/create?parent=${region.id}`}
                            className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Add Subregion
                        </Link>
                    </div>

                    {regions && regions.length > 0 ? (
                        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Name
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Slug
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {regions.map((subregion) => (
                                        <tr key={subregion.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <Link
                                                    href={`/admin/regions/${subregion.id}`}
                                                    className="text-sm font-medium text-blue-600 hover:text-blue-800"
                                                >
                                                    {subregion.name}
                                                </Link>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {subregion.slug}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <Link
                                                    href={`/admin/regions/${subregion.id}`}
                                                    className="text-blue-600 hover:text-blue-800 mr-3"
                                                >
                                                    View
                                                </Link>
                                                <Link
                                                    href={`/admin/regions/${subregion.id}/edit`}
                                                    className="text-indigo-600 hover:text-indigo-800 mr-3"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(subregion.id)}
                                                    className="text-red-600 hover:text-red-800"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
                            <p className="text-gray-600">No subregions yet</p>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
