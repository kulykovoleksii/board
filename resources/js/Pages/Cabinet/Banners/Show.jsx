import { Head, Link, router } from '@inertiajs/react';
import CabinetLayout from '../../../Layouts/CabinetLayout';

export default function Show({ banner }) {
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

    const handleSendToModeration = () => {
        if (confirm('Send this banner to moderation?')) {
            router.post(`/cabinet/banners/${banner.id}/send`, {}, {
                preserveScroll: true,
            });
        }
    };

    const handleCancelModeration = () => {
        if (confirm('Cancel moderation?')) {
            router.post(`/cabinet/banners/${banner.id}/cancel`, {}, {
                preserveScroll: true,
            });
        }
    };

    const handleOrder = () => {
        router.post(`/cabinet/banners/${banner.id}/order`);
    };

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this banner?')) {
            router.delete(`/cabinet/banners/${banner.id}`);
        }
    };

    const canBeChanged = banner.status === 'draft' || banner.status === 'moderation';
    const canBeRemoved = banner.status === 'draft' || banner.status === 'moderation';

    return (
        <CabinetLayout activeTab="banners">
            <Head title={`Banner #${banner.id}`} />

            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                        <Link
                            href="/cabinet/banners"
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Banner #{banner.id}: {banner.name}
                        </h1>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[banner.status]}`}>
                            {statusLabels[banner.status]}
                        </span>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {canBeChanged && (
                        <>
                            <Link
                                href={`/cabinet/banners/${banner.id}/edit`}
                                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                Edit
                            </Link>
                            <Link
                                href={`/cabinet/banners/${banner.id}/file`}
                                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                Change File
                            </Link>
                        </>
                    )}

                    {banner.status === 'draft' && (
                        <button
                            onClick={handleSendToModeration}
                            className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Send to Moderation
                        </button>
                    )}

                    {banner.status === 'moderation' && (
                        <button
                            onClick={handleCancelModeration}
                            className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 font-medium"
                        >
                            Cancel Moderation
                        </button>
                    )}

                    {banner.status === 'moderated' && (
                        <button
                            onClick={handleOrder}
                            className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                            </svg>
                            Order for Payment
                        </button>
                    )}

                    {canBeRemoved && (
                        <button
                            onClick={handleDelete}
                            className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 font-medium"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Delete
                        </button>
                    )}
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
                                    {banner.region?.name || '-'}
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
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[banner.status]}`}>
                                        {statusLabels[banner.status]}
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 bg-gray-50">
                                    URL
                                </th>
                                <td className="px-6 py-4 text-sm text-gray-900">
                                    <a href={banner.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                                        {banner.url}
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 bg-gray-50">
                                    Limit
                                </th>
                                <td className="px-6 py-4 text-sm text-gray-900">
                                    {banner.limit}
                                </td>
                            </tr>
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 bg-gray-50">
                                    Views
                                </th>
                                <td className="px-6 py-4 text-sm text-gray-900">
                                    {banner.views}
                                </td>
                            </tr>
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 bg-gray-50">
                                    Publish Date
                                </th>
                                <td className="px-6 py-4 text-sm text-gray-900">
                                    {banner.published_at || '-'}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Banner Image */}
                {banner.file && (
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Banner Image</h2>
                        <div className="flex justify-center">
                            <img
                                src={`/storage/${banner.file}`}
                                alt={banner.name}
                                className="max-w-full h-auto rounded-lg shadow-md"
                            />
                        </div>
                    </div>
                )}
            </div>
        </CabinetLayout>
    );
}
