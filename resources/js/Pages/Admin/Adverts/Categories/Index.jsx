import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '../../../../Layouts/AdminLayout';

export default function Index({ categories }) {
    const handleDelete = (categoryId) => {
        if (confirm('Are you sure you want to delete this category?')) {
            router.delete(`/admin/adverts/categories/${categoryId}`, {
                preserveScroll: true,
            });
        }
    };

    const handleFirst = (categoryId) => {
        router.post(`/admin/adverts/categories/${categoryId}/first`, {}, {
            preserveScroll: true,
        });
    };

    const handleUp = (categoryId) => {
        router.post(`/admin/adverts/categories/${categoryId}/up`, {}, {
            preserveScroll: true,
        });
    };

    const handleDown = (categoryId) => {
        router.post(`/admin/adverts/categories/${categoryId}/down`, {}, {
            preserveScroll: true,
        });
    };

    const handleLast = (categoryId) => {
        router.post(`/admin/adverts/categories/${categoryId}/last`, {}, {
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout>
            <Head title="Advert Categories" />

            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Advert Categories</h1>
                    <p className="mt-2 text-gray-600">
                        Manage categories for advertisements
                    </p>
                </div>
                <Link
                    href="/admin/adverts/categories/create"
                    className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Category
                </Link>
            </div>

            {categories && categories.length > 0 ? (
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
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Order
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {categories.map((category) => (
                                <tr key={category.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            {category.depth > 0 && (
                                                <span className="text-gray-400 mr-2">
                                                    {'—'.repeat(category.depth)}
                                                </span>
                                            )}
                                            <Link
                                                href={`/admin/adverts/categories/${category.id}`}
                                                className="text-sm font-medium text-blue-600 hover:text-blue-800"
                                            >
                                                {category.name}
                                            </Link>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {category.slug}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <div className="flex items-center justify-center gap-1">
                                            <button
                                                onClick={() => handleFirst(category.id)}
                                                className="p-1 text-blue-600 hover:text-blue-800"
                                                title="Move to first"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 11l7-7 7 7M5 19l7-7 7 7" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => handleUp(category.id)}
                                                className="p-1 text-blue-600 hover:text-blue-800"
                                                title="Move up"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => handleDown(category.id)}
                                                className="p-1 text-blue-600 hover:text-blue-800"
                                                title="Move down"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => handleLast(category.id)}
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
                                            href={`/admin/adverts/categories/${category.id}`}
                                            className="text-blue-600 hover:text-blue-800 mr-3"
                                        >
                                            View
                                        </Link>
                                        <Link
                                            href={`/admin/adverts/categories/${category.id}/edit`}
                                            className="text-indigo-600 hover:text-indigo-800 mr-3"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(category.id)}
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
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                        No categories yet
                    </h3>
                    <p className="text-gray-600 mb-6">
                        Get started by creating your first advert category.
                    </p>
                    <Link
                        href="/admin/adverts/categories/create"
                        className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Create First Category
                    </Link>
                </div>
            )}
        </AdminLayout>
    );
}
