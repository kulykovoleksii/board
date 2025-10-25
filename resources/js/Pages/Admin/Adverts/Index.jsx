import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '../../../Layouts/AdminLayout';

export default function Index({ adverts }) {
    const [filters, setFilters] = useState({
        id: new URLSearchParams(window.location.search).get('id') || '',
        title: new URLSearchParams(window.location.search).get('title') || '',
        status: new URLSearchParams(window.location.search).get('status') || '',
    });

    const handleFilter = (e) => {
        e.preventDefault();
        const params = new URLSearchParams();
        Object.keys(filters).forEach(key => {
            if (filters[key]) params.append(key, filters[key]);
        });
        router.get(`/admin/adverts/adverts?${params.toString()}`, {}, { preserveState: true });
    };

    const handleReset = () => {
        setFilters({ id: '', title: '', status: '' });
        router.get('/admin/adverts/adverts');
    };

    const handleModerate = (advertId) => {
        if (confirm('Approve this advert?')) {
            router.post(`/admin/adverts/adverts/${advertId}/moderate`, {}, {
                preserveScroll: true,
            });
        }
    };

    const handleDelete = (advertId) => {
        if (confirm('Are you sure you want to delete this advert?')) {
            router.delete(`/admin/adverts/adverts/${advertId}/destroy`, {
                preserveScroll: true,
            });
        }
    };

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

    return (
        <AdminLayout>
            <Head title="Adverts Management" />

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Adverts</h1>
                <p className="mt-2 text-gray-600">Manage and moderate adverts</p>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <form onSubmit={handleFilter} className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                ID
                            </label>
                            <input
                                type="text"
                                value={filters.id}
                                onChange={(e) => setFilters({ ...filters, id: e.target.value })}
                                placeholder="Advert ID"
                                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Title
                            </label>
                            <input
                                type="text"
                                value={filters.title}
                                onChange={(e) => setFilters({ ...filters, title: e.target.value })}
                                placeholder="Search by title"
                                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Status
                            </label>
                            <select
                                value={filters.status}
                                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            >
                                <option value="">All Statuses</option>
                                <option value="draft">Draft</option>
                                <option value="moderation">On Moderation</option>
                                <option value="active">Active</option>
                                <option value="closed">Closed</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            Apply Filters
                        </button>
                        <button
                            type="button"
                            onClick={handleReset}
                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                        >
                            Reset
                        </button>
                    </div>
                </form>
            </div>

            {/* Adverts List */}
            {adverts.data && adverts.data.length > 0 ? (
                <div className="space-y-4">
                    {adverts.data.map((advert) => (
                        <div key={advert.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-sm text-gray-500">#{advert.id}</span>
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
                                            {advert.user && (
                                                <span className="flex items-center gap-1">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                    {advert.user.name}
                                                </span>
                                            )}
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
                                                {new Date(advert.updated_at).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="ml-6 text-right">
                                        <div className="text-xl font-bold text-blue-600">
                                            {formatPrice(advert.price)}
                                        </div>
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
                                    <Link
                                        href={`/adverts/show/${advert.id}`}
                                        className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                                    >
                                        View
                                    </Link>
                                    <Link
                                        href={`/admin/adverts/adverts/${advert.id}/edit`}
                                        className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100"
                                    >
                                        Edit
                                    </Link>
                                    {advert.status === 'moderation' && (
                                        <>
                                            <button
                                                onClick={() => handleModerate(advert.id)}
                                                className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-green-700 bg-green-50 border border-green-200 rounded-md hover:bg-green-100"
                                            >
                                                Approve
                                            </button>
                                            <Link
                                                href={`/admin/adverts/adverts/${advert.id}/reject`}
                                                className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-yellow-700 bg-yellow-50 border border-yellow-200 rounded-md hover:bg-yellow-100"
                                            >
                                                Reject
                                            </Link>
                                        </>
                                    )}
                                    <button
                                        onClick={() => handleDelete(advert.id)}
                                        className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-red-700 bg-red-50 border border-red-200 rounded-md hover:bg-red-100 ml-auto"
                                    >
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
                        No adverts found
                    </h3>
                    <p className="text-gray-600">
                        Try adjusting your filters to find what you're looking for.
                    </p>
                </div>
            )}
        </AdminLayout>
    );
}
