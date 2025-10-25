import { Head, Link, router } from '@inertiajs/react';
import CabinetLayout from '../../../Layouts/CabinetLayout';

export default function Index({ banners }) {
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

    const handleDelete = (bannerId) => {
        if (confirm('Are you sure you want to delete this banner?')) {
            router.delete(`/cabinet/banners/${bannerId}`, {
                preserveScroll: true,
            });
        }
    };

    return (
        <CabinetLayout activeTab="banners">
            <Head title="My Banners" />

            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">My Banners</h1>
                    <p className="mt-2 text-gray-600">
                        Manage your advertising banners
                    </p>
                </div>
                <Link
                    href="/cabinet/banners/create"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Banner
                </Link>
            </div>

            {banners.data && banners.data.length > 0 ? (
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        ID
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Region
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Category
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Published
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {banners.data.map((banner) => (
                                    <tr key={banner.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {banner.id}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <Link
                                                href={`/cabinet/banners/${banner.id}`}
                                                className="text-sm font-medium text-blue-600 hover:text-blue-800"
                                            >
                                                {banner.name}
                                            </Link>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {banner.region?.name || '-'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {banner.category?.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {banner.published_at || '-'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[banner.status]}`}>
                                                {statusLabels[banner.status]}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <Link
                                                href={`/cabinet/banners/${banner.id}`}
                                                className="text-blue-600 hover:text-blue-800 mr-3"
                                            >
                                                View
                                            </Link>
                                            {(banner.status === 'draft' || banner.status === 'moderation') && (
                                                <button
                                                    onClick={() => handleDelete(banner.id)}
                                                    className="text-red-600 hover:text-red-800"
                                                >
                                                    Delete
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {banners.last_page > 1 && (
                        <div className="flex items-center justify-center gap-2 px-6 py-4 border-t border-gray-200">
                            {banners.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url || '#'}
                                    className={`px-4 py-2 rounded-md text-sm font-medium ${
                                        link.active
                                            ? 'bg-blue-600 text-white'
                                            : link.url
                                            ? 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    }`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            ) : (
                /* Empty State */
                <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                    <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                    </svg>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                        No banners yet
                    </h3>
                    <p className="text-gray-600 mb-6">
                        Create your first advertising banner to promote your business.
                    </p>
                    <Link
                        href="/cabinet/banners/create"
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Create Your First Banner
                    </Link>
                </div>
            )}
        </CabinetLayout>
    );
}