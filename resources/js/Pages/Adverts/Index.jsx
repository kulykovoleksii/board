import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import AppLayout from '../../Layouts/AppLayout';

export default function Index({ adverts, category, region, categories, regions, categoriesCounts, regionsCounts }) {
    const { url } = usePage();
    const [filters, setFilters] = useState({
        text: new URLSearchParams(window.location.search).get('text') || '',
    });

    const handleSearch = (e) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (filters.text) params.append('text', filters.text);

        const basePath = url.split('?')[0];
        router.get(`${basePath}?${params.toString()}`, {}, { preserveState: true });
    };

    const formatPrice = (price) => {
        if (!price || price === 0) return 'Free';
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
        }).format(price);
    };

    const getCategoryPath = (cat) => {
        return `/adverts${region ? `/${region.slug}` : ''}/${cat.slug}`;
    };

    const getRegionPath = (reg) => {
        return `/adverts/${reg.slug}${category ? `/${category.slug}` : ''}`;
    };

    return (
        <AppLayout>
            <Head title={category ? category.name : 'All Adverts'} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Breadcrumbs */}
                <nav className="mb-6">
                    <ol className="flex items-center space-x-2 text-sm text-gray-500">
                        <li>
                            <Link href="/" className="hover:text-gray-700">Home</Link>
                        </li>
                        <li>/</li>
                        <li>
                            <Link href="/adverts" className="hover:text-gray-700">Adverts</Link>
                        </li>
                        {region && (
                            <>
                                <li>/</li>
                                <li className="text-gray-900">{region.name}</li>
                            </>
                        )}
                        {category && (
                            <>
                                <li>/</li>
                                <li className="text-gray-900">{category.name}</li>
                            </>
                        )}
                    </ol>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Filters Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
                            {/* Search */}
                            <form onSubmit={handleSearch} className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Search
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={filters.text}
                                        onChange={(e) => setFilters({ ...filters, text: e.target.value })}
                                        placeholder="Keywords..."
                                        className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                                    />
                                    <button
                                        type="submit"
                                        className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </button>
                                </div>
                            </form>

                            {/* Categories */}
                            {categories && categories.length > 0 && (
                                <div className="mb-6">
                                    <h3 className="text-sm font-semibold text-gray-900 mb-3">Categories</h3>
                                    <ul className="space-y-2">
                                        {categories.map((cat) => (
                                            <li key={cat.id}>
                                                <Link
                                                    href={getCategoryPath(cat)}
                                                    className="flex items-center justify-between text-sm text-gray-700 hover:text-blue-600"
                                                >
                                                    <span>{cat.name}</span>
                                                    {categoriesCounts && categoriesCounts[cat.id] && (
                                                        <span className="text-xs text-gray-500">
                                                            {categoriesCounts[cat.id]}
                                                        </span>
                                                    )}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Regions */}
                            {regions && regions.length > 0 && (
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-900 mb-3">Regions</h3>
                                    <ul className="space-y-2">
                                        {regions.map((reg) => (
                                            <li key={reg.id}>
                                                <Link
                                                    href={getRegionPath(reg)}
                                                    className="flex items-center justify-between text-sm text-gray-700 hover:text-blue-600"
                                                >
                                                    <span>{reg.name}</span>
                                                    {regionsCounts && regionsCounts[reg.id] && (
                                                        <span className="text-xs text-gray-500">
                                                            {regionsCounts[reg.id]}
                                                        </span>
                                                    )}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                            <h1 className="text-3xl font-bold text-gray-900">
                                {category ? category.name : 'All Adverts'}
                                {region && <span className="text-gray-500"> in {region.name}</span>}
                            </h1>
                            <Link
                                href="/cabinet/adverts/create"
                                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Post Advert
                            </Link>
                        </div>

                        {/* Adverts List */}
                        {adverts.data && adverts.data.length > 0 ? (
                            <div className="space-y-4">
                                {adverts.data.map((advert) => (
                                    <div key={advert.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                                        <Link href={`/adverts/show/${advert.id}`} className="flex gap-4 p-4">
                                            {/* Image */}
                                            <div className="flex-shrink-0 w-40 h-32 bg-gray-200 rounded-lg overflow-hidden">
                                                {advert.photos && advert.photos.length > 0 ? (
                                                    <img
                                                        src={`/storage/${advert.photos[0].file}`}
                                                        alt={advert.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
                                                    {advert.title}
                                                </h3>
                                                <p className="text-sm text-gray-600 mb-2 line-clamp-2">
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
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
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

                                            {/* Price */}
                                            <div className="flex-shrink-0 text-right">
                                                <div className="text-2xl font-bold text-blue-600">
                                                    {formatPrice(advert.price)}
                                                </div>
                                            </div>
                                        </Link>
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
                                <p className="text-gray-600 mb-6">
                                    Try adjusting your search or filters to find what you're looking for.
                                </p>
                                <Link
                                    href="/cabinet/adverts/create"
                                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    Post Your First Advert
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}