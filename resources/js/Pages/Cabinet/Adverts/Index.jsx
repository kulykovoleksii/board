import { Head, Link, router } from '@inertiajs/react';
import CabinetLayout from '../../../Layouts/CabinetLayout';

export default function Index({ adverts }) {
    const statusColors = {
        draft: 'bg-gray-100 text-gray-800',
        moderation: 'bg-yellow-100 text-yellow-800',
        active: 'bg-green-100 text-green-800',
        closed: 'bg-red-100 text-red-800',
    };

    const statusLabels = {
        draft: 'Draft',
        moderation: 'On Moderation',
        active: 'Active',
        closed: 'Closed',
    };

    const formatPrice = (price) => {
        if (!price || price === 0) return 'Free';
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
        }).format(price);
    };

    const handleDelete = (advertId) => {
        if (confirm('Are you sure you want to delete this advert?')) {
            router.delete(`/cabinet/adverts/${advertId}/destroy`, {
                preserveScroll: true,
            });
        }
    };

    return (
        <CabinetLayout activeTab="adverts">
            <Head title="My Adverts" />

            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-900">My Adverts</h1>
                <Link
                    href="/cabinet/adverts/create"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Create Advert
                </Link>
            </div>

            {adverts.data && adverts.data.length > 0 ? (
                <div className="space-y-4">
                    {adverts.data.map((advert) => (
                        <div key={advert.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-lg font-semibold text-gray-900">
                                                {advert.title}
                                            </h3>
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[advert.status]}`}>
                                                {statusLabels[advert.status]}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                            {advert.content}
                                        </p>
                                        <div className="flex items-center gap-4 text-sm text-gray-500">
                                            {advert.category && (
                                                <span className="flex items-center gap-1">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                                    </svg>
                                                    {advert.category.name}
                                                </span>
                                            )}
                                            {advert.region && (
                                                <span className="flex items-center gap-1">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    </svg>
                                                    {advert.region.name}
                                                </span>
                                            )}
                                            <span className="flex items-center gap-1">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                {new Date(advert.created_at).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="ml-6 text-right">
                                        <div className="text-xl font-bold text-blue-600 mb-2">
                                            {formatPrice(advert.price)}
                                        </div>
                                        {advert.expires_at && advert.status === 'active' && (
                                            <div className="text-xs text-gray-500">
                                                Expires: {new Date(advert.expires_at).toLocaleDateString()}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Reject Reason */}
                                {advert.reject_reason && (
                                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                                        <p className="text-sm text-red-800">
                                            <span className="font-semibold">Rejection reason:</span> {advert.reject_reason}
                                        </p>
                                    </div>
                                )}

                                {/* Actions */}
                                <div className="flex items-center gap-2 pt-4 border-t">
                                    {/* View */}
                                    <Link
                                        href={`/adverts/show/${advert.id}`}
                                        className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                                    >
                                        <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                        View
                                    </Link>

                                    {/* Edit */}
                                    {(advert.status === 'draft' || advert.status === 'moderation') && (
                                        <Link
                                            href={`/cabinet/adverts/${advert.id}/edit`}
                                            className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100"
                                        >
                                            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                            Edit
                                        </Link>
                                    )}

                                    {/* Photos */}
                                    {advert.status === 'draft' && (
                                        <Link
                                            href={`/cabinet/adverts/${advert.id}/photos`}
                                            className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                                        >
                                            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            Photos
                                        </Link>
                                    )}

                                    {/* Send to Moderation */}
                                    {advert.status === 'draft' && (
                                        <Link
                                            href={`/cabinet/adverts/${advert.id}/send`}
                                            method="post"
                                            as="button"
                                            className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-green-700 bg-green-50 border border-green-200 rounded-md hover:bg-green-100"
                                        >
                                            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                            </svg>
                                            Send to Moderation
                                        </Link>
                                    )}

                                    {/* Close */}
                                    {advert.status === 'active' && (
                                        <Link
                                            href={`/cabinet/adverts/${advert.id}/close`}
                                            method="post"
                                            as="button"
                                            className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-yellow-700 bg-yellow-50 border border-yellow-200 rounded-md hover:bg-yellow-100"
                                        >
                                            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                            Close
                                        </Link>
                                    )}

                                    {/* Delete */}
                                    <button
                                        onClick={() => handleDelete(advert.id)}
                                        className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-red-700 bg-red-50 border border-red-200 rounded-md hover:bg-red-100 ml-auto"
                                    >
                                        <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Pagination */}
                    {adverts.last_page > 1 && (
                        <div className="flex items-center justify-center gap-2 mt-8">
                            {adverts.links.map((link, index) => (
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
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                        No adverts yet
                    </h3>
                    <p className="text-gray-600 mb-6">
                        Start by creating your first advert.
                    </p>
                    <Link
                        href="/cabinet/adverts/create"
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Create Your First Advert
                    </Link>
                </div>
            )}
        </CabinetLayout>
    );
}
