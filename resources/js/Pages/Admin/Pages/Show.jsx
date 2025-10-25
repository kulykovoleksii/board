import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';

export default function Show({ page }) {
    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this page?')) {
            router.delete(`/admin/pages/${page.id}`);
        }
    };

    return (
        <AdminLayout>
            <Head title={page.title} />

            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                        <Link
                            href="/admin/pages"
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-900">{page.title}</h1>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mb-6">
                    <Link
                        href={`/admin/pages/${page.id}/edit`}
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
                <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                    <table className="min-w-full divide-y divide-gray-200">
                        <tbody className="bg-white divide-y divide-gray-200">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 bg-gray-50 w-1/4">
                                    ID
                                </th>
                                <td className="px-6 py-4 text-sm text-gray-900">
                                    {page.id}
                                </td>
                            </tr>
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 bg-gray-50">
                                    Title
                                </th>
                                <td className="px-6 py-4 text-sm text-gray-900">
                                    {page.title}
                                </td>
                            </tr>
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 bg-gray-50">
                                    Menu Title
                                </th>
                                <td className="px-6 py-4 text-sm text-gray-900">
                                    {page.menu_title || '-'}
                                </td>
                            </tr>
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 bg-gray-50">
                                    Slug
                                </th>
                                <td className="px-6 py-4 text-sm text-gray-900">
                                    {page.slug}
                                </td>
                            </tr>
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 bg-gray-50">
                                    Description
                                </th>
                                <td className="px-6 py-4 text-sm text-gray-900">
                                    {page.description || '-'}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Content */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Content</h2>
                    <div
                        className="prose max-w-none"
                        dangerouslySetInnerHTML={{ __html: page.content }}
                    />
                </div>
            </div>
        </AdminLayout>
    );
}
