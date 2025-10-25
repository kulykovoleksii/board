import { Head, Link, router } from '@inertiajs/react';
import CabinetLayout from '../../../Layouts/CabinetLayout';

export default function Index({ adverts }) {
    const handleRemove = (advertId) => {
        if (confirm('Remove this advert from favorites?')) {
            router.delete(`/cabinet/favorites/${advertId}`, {
                preserveScroll: true,
            });
        }
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
        <CabinetLayout activeTab="favorites">
            <Head title="My Favorites" />

            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">My Favorites</h1>
                <p className="mt-2 text-gray-600">
                    Adverts you've saved for later
                </p>
            </div>

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
                                <div className="flex flex-col items-end justify-between flex-shrink-0">
                                    <div className="text-xl font-bold text-blue-600">
                                        {formatPrice(advert.price)}
                                    </div>
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleRemove(advert.id);
                                        }}
                                        className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-red-700 bg-red-50 border border-red-200 rounded-md hover:bg-red-100"
                                    >
                                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                        </svg>
                                        Remove
                                    </button>
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
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                        No favorites yet
                    </h3>
                    <p className="text-gray-600 mb-6">
                        Start adding adverts to your favorites to see them here.
                    </p>
                    <Link
                        href="/adverts"
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Browse Adverts
                    </Link>
                </div>
            )}
        </CabinetLayout>
    );
}
