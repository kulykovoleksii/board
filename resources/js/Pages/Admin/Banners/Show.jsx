import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';

export default function Show({ banner }) {
    const handleModerate = () => {
        if (confirm('Moderate this banner?')) {
            router.post(`/admin/banners/${banner.id}/moderate`);
        }
    };

    const handlePay = () => {
        if (confirm('Mark this banner as paid?')) {
            router.post(`/admin/banners/${banner.id}/pay`);
        }
    };

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this banner?')) {
            router.delete(`/admin/banners/${banner.id}`);
        }
    };

    const statusColors = {
        draft: 'bg-gray-100 text-gray-800',
        moderation: 'bg-blue-100 text-blue-800',
        moderated: 'bg-green-100 text-green-800',
        ordered: 'bg-yellow-100 text-yellow-800',
        active: 'bg-blue-100 text-blue-800',
        closed: 'bg-gray-100 text-gray-800',
    };

    const statusLabels = {
        draft: 'Draft',
        moderation: 'Moderation',
        moderated: 'Ready to Payment',
        ordered: 'Waiting for Payment',
        active: 'Active',
        closed: 'Closed',
    };

    const isOnModeration = banner.status === 'moderation';
    const isOrdered = banner.status === 'ordered';

    return (
        <AdminLayout>
            <Head title={`Banner #${banner.id} - ${banner.name}`} />

            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                        <Link
                            href="/admin/banners"
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Banner #{banner.id}
                        </h1>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mb-6">
                    <Link
                        href={`/admin/banners/${banner.id}/edit`}
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit
                    </Link>
                    {isOnModeration && (
                        <button
                            onClick={handleModerate}
                            className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Moderate
                        </button>
                    )}
                    {isOnModeration && (
                        <Link
                            href={`/admin/banners/${banner.id}/reject`}
                            className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 font-medium"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Reject
                        </Link>
                    )}
                    {isOrdered && (
                        <button
                            onClick={handlePay}
                            className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            Mark as Paid
                        </button>
                    )}
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
                <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                    <table className="min-w-full divide-y divide-gray-200">
                        <tbody className="bg-white divide-y divide-gray-200">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 bg-gray-50 w-1/4">
                                    ID
                                </th>
                                <td className="px-6 py-4 text-sm text-gray-900">
                                    {banner.id}
                                </td>
                            </tr>
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 bg-gray-50">
                                    Name
                                </th>
                                <td className="px-6 py-4 text-sm text-gray-900">
                                    {banner.name}
                                </td>
                            </tr>
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 bg-gray-50">
                                    Region
                                </th>
                                <td className="px-6 py-4 text-sm text-gray-900">
                                    {banner.region ? banner.region.name : '-'}
                                </td>
                            </tr>
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 bg-gray-50">
                                    Category
                                </th>
                                <td className="px-6 py-4 text-sm text-gray-900">
                                    {banner.category?.name}
                                </td>
                            </tr>
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 bg-gray-50">
                                    Status
                                </th>
                                <td className="px-6 py-4 text-sm text-gray-900">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[banner.status] || 'bg-gray-100 text-gray-800'}`}>
                                        {statusLabels[banner.status] || banner.status}
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 bg-gray-50">
                                    Publish Date
                                </th>
                                <td className="px-6 py-4 text-sm text-gray-900">
                                    {banner.published_at ? new Date(banner.published_at).toLocaleString() : '-'}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Banner Image */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Banner Image</h2>
                    {banner.file && (
                        <div className="flex justify-center">
                            <img
                                src={`/storage/${banner.file}`}
                                alt={banner.name}
                                className="max-w-full h-auto rounded-lg shadow-md"
                            />
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
