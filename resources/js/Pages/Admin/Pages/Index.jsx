import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';

export default function Index({ pages }) {
    const handleDelete = (pageId) => {
        if (confirm('Are you sure you want to delete this page?')) {
            router.delete(`/admin/pages/${pageId}`, {
                preserveScroll: true,
            });
        }
    };

    const handleFirst = (pageId) => {
        router.post(`/admin/pages/${pageId}/first`, {}, {
            preserveScroll: true,
        });
    };

    const handleUp = (pageId) => {
        router.post(`/admin/pages/${pageId}/up`, {}, {
            preserveScroll: true,
        });
    };

    const handleDown = (pageId) => {
        router.post(`/admin/pages/${pageId}/down`, {}, {
            preserveScroll: true,
        });
    };

    const handleLast = (pageId) => {
        router.post(`/admin/pages/${pageId}/last`, {}, {
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout>
            <Head title="Pages" />

            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Pages</h1>
                    <p className="mt-2 text-gray-600">
                        Manage static pages
                    </p>
                </div>
                <Link
                    href="/admin/pages/create"
                    className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Page
                </Link>
            </div>

            {pages && pages.length > 0 ? (
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Title
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Menu Title
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Slug
                                </th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Order
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {pages.map((page) => (
                                <tr key={page.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            {page.depth > 0 && (
                                                <span className="text-gray-400 mr-2">
                                                    {'—'.repeat(page.depth)}
                                                </span>
                                            )}
                                            <Link
                                                href={`/admin/pages/${page.id}`}
                                                className="text-sm font-medium text-blue-600 hover:text-blue-800"
                                            >
                                                {page.title}
                                            </Link>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {page.menu_title || '-'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {page.slug}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <div className="flex items-center justify-center gap-1">
                                            <button
                                                onClick={() => handleFirst(page.id)}
                                                className="p-1 text-blue-600 hover:text-blue-800"
                                                title="Move to first"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 11l7-7 7 7M5 19l7-7 7 7" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => handleUp(page.id)}
                                                className="p-1 text-blue-600 hover:text-blue-800"
                                                title="Move up"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => handleDown(page.id)}
                                                className="p-1 text-blue-600 hover:text-blue-800"
                                                title="Move down"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => handleLast(page.id)}
                                                className="p-1 text-blue-600 hover:text-blue-800"
                                                title="Move to last"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <Link
                                            href={`/admin/pages/${page.id}`}
                                            className="text-blue-600 hover:text-blue-800 mr-3"
                                        >
                                            View
                                        </Link>
                                        <Link
                                            href={`/admin/pages/${page.id}/edit`}
                                            className="text-indigo-600 hover:text-indigo-800 mr-3"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(page.id)}
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
                <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                    <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                        No pages yet
                    </h3>
                    <p className="text-gray-600 mb-6">
                        Get started by creating your first static page.
                    </p>
                    <Link
                        href="/admin/pages/create"
                        className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Create First Page
                    </Link>
                </div>
            )}
        </AdminLayout>
    );
}