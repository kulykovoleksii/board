import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';

export default function Create({ parents }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        menu_title: '',
        slug: '',
        parent: '',
        content: '',
        description: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/pages');
    };

    const generateSlug = (title) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
    };

    const handleTitleChange = (e) => {
        const title = e.target.value;
        setData({
            ...data,
            title: title,
            slug: generateSlug(title),
        });
    };

    return (
        <AdminLayout>
            <Head title="Create Page" />

            <div className="max-w-5xl mx-auto">
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
                        <h1 className="text-2xl font-bold text-gray-900">Create Page</h1>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
                        {/* Title */}
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                                Title <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="title"
                                value={data.title}
                                onChange={handleTitleChange}
                                className={`mt-1 block w-full rounded-md shadow-sm ${
                                    errors.title
                                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                                        : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                                }`}
                                placeholder="Enter page title"
                                required
                            />
                            {errors.title && (
                                <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                            )}
                        </div>

                        {/* Menu Title */}
                        <div>
                            <label htmlFor="menu_title" className="block text-sm font-medium text-gray-700 mb-1">
                                Menu Title
                            </label>
                            <input
                                type="text"
                                id="menu_title"
                                value={data.menu_title}
                                onChange={(e) => setData('menu_title', e.target.value)}
                                className={`mt-1 block w-full rounded-md shadow-sm ${
                                    errors.menu_title
                                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                                        : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                                }`}
                                placeholder="Optional menu title (overrides main title in menu)"
                            />
                            {errors.menu_title && (
                                <p className="mt-1 text-sm text-red-600">{errors.menu_title}</p>
                            )}
                            <p className="mt-2 text-sm text-gray-500">
                                Optional. If provided, this title will be displayed in navigation menus instead of the main title.
                            </p>
                        </div>

                        {/* Slug */}
                        <div>
                            <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">
                                Slug <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="slug"
                                value={data.slug}
                                onChange={(e) => setData('slug', e.target.value)}
                                className={`mt-1 block w-full rounded-md shadow-sm ${
                                    errors.slug
                                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                                        : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                                }`}
                                placeholder="page-slug"
                                required
                            />
                            {errors.slug && (
                                <p className="mt-1 text-sm text-red-600">{errors.slug}</p>
                            )}
                            <p className="mt-2 text-sm text-gray-500">
                                URL-friendly version of the title. Auto-generated from the title.
                            </p>
                        </div>

                        {/* Parent */}
                        <div>
                            <label htmlFor="parent" className="block text-sm font-medium text-gray-700 mb-1">
                                Parent Page
                            </label>
                            <select
                                id="parent"
                                value={data.parent}
                                onChange={(e) => setData('parent', e.target.value)}
                                className={`mt-1 block w-full rounded-md shadow-sm ${
                                    errors.parent
                                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                                        : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                                }`}
                            >
                                <option value="">None (Top Level)</option>
                                {parents && parents.map((parent) => (
                                    <option key={parent.id} value={parent.id}>
                                        {parent.depth > 0 && '—'.repeat(parent.depth) + ' '}
                                        {parent.title}
                                    </option>
                                ))}
                            </select>
                            {errors.parent && (
                                <p className="mt-1 text-sm text-red-600">{errors.parent}</p>
                            )}
                            <p className="mt-2 text-sm text-gray-500">
                                Optional. Select a parent page to create a nested subpage.
                            </p>
                        </div>

                        {/* Description */}
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                Description
                            </label>
                            <textarea
                                id="description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                rows={3}
                                className={`mt-1 block w-full rounded-md shadow-sm ${
                                    errors.description
                                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                                        : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                                }`}
                                placeholder="Optional page description for SEO"
                            />
                            {errors.description && (
                                <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                            )}
                            <p className="mt-2 text-sm text-gray-500">
                                Optional. Meta description for search engines.
                            </p>
                        </div>

                        {/* Content */}
                        <div>
                            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                                Content <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                id="content"
                                value={data.content}
                                onChange={(e) => setData('content', e.target.value)}
                                rows={15}
                                className={`mt-1 block w-full rounded-md shadow-sm font-mono text-sm ${
                                    errors.content
                                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                                        : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                                }`}
                                placeholder="Enter page content (HTML is supported)"
                                required
                            />
                            {errors.content && (
                                <p className="mt-1 text-sm text-red-600">{errors.content}</p>
                            )}
                            <p className="mt-2 text-sm text-gray-500">
                                Page content. HTML markup is supported.
                            </p>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between mt-6">
                        <Link
                            href="/admin/pages"
                            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Cancel
                        </Link>

                        <button
                            type="submit"
                            disabled={processing}
                            className={`inline-flex items-center px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                                processing
                                    ? 'bg-blue-400 cursor-not-allowed'
                                    : 'bg-blue-600 hover:bg-blue-700'
                            }`}
                        >
                            {processing ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Creating...
                                </>
                            ) : (
                                <>
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Create Page
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}