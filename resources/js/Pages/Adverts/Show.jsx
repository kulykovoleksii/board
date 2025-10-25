import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';
import AppLayout from '../../Layouts/AppLayout';

export default function Show({ advert }) {
    const { auth } = usePage().props;
    const [showPhone, setShowPhone] = useState(false);
    const [phone, setPhone] = useState('');
    const [activeImage, setActiveImage] = useState(0);

    const { post: addToFavorites, processing: addingToFavorites } = useForm({});
    const { delete: removeFromFavorites, processing: removingFromFavorites } = useForm({});

    const handleShowPhone = () => {
        if (!showPhone) {
            fetch(`/adverts/show/${advert.id}/phone`, {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                },
            })
                .then(res => res.text())
                .then(data => {
                    setPhone(data);
                    setShowPhone(true);
                });
        }
    };

    const handleAddToFavorites = () => {
        addToFavorites(`/adverts/show/${advert.id}/favorites`);
    };

    const handleRemoveFromFavorites = () => {
        removeFromFavorites(`/adverts/show/${advert.id}/favorites`);
    };

    const formatPrice = (price) => {
        if (!price || price === 0) return 'Free';
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
        }).format(price);
    };

    const isOwner = auth.user && auth.user.id === advert.user_id;
    const isFavorite = advert.is_favorite;

    return (
        <AppLayout>
            <Head title={advert.title} />

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
                        {advert.category && (
                            <>
                                <li>/</li>
                                <li>
                                    <Link href={`/adverts/${advert.category.slug}`} className="hover:text-gray-700">
                                        {advert.category.name}
                                    </Link>
                                </li>
                            </>
                        )}
                        <li>/</li>
                        <li className="text-gray-900 font-medium">{advert.title}</li>
                    </ol>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {/* Images */}
                        {advert.photos && advert.photos.length > 0 ? (
                            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                                {/* Main Image */}
                                <div className="mb-4 bg-gray-100 rounded-lg overflow-hidden" style={{ height: '400px' }}>
                                    <img
                                        src={`/storage/${advert.photos[activeImage].file}`}
                                        alt={advert.title}
                                        className="w-full h-full object-contain"
                                    />
                                </div>

                                {/* Thumbnails */}
                                {advert.photos.length > 1 && (
                                    <div className="flex gap-2 overflow-x-auto">
                                        {advert.photos.map((photo, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setActiveImage(index)}
                                                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                                                    activeImage === index
                                                        ? 'border-blue-600'
                                                        : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                            >
                                                <img
                                                    src={`/storage/${photo.file}`}
                                                    alt={`${advert.title} ${index + 1}`}
                                                    className="w-full h-full object-cover"
                                                />
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
                                <div className="bg-gray-100 rounded-lg flex items-center justify-center" style={{ height: '400px' }}>
                                    <svg className="w-24 h-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                            </div>
                        )}

                        {/* Description */}
                        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                            <h1 className="text-3xl font-bold text-gray-900 mb-4">
                                {advert.title}
                            </h1>

                            <div className="flex items-center gap-4 mb-6 text-sm text-gray-600">
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

                            <div className="prose max-w-none">
                                <p className="text-gray-700 whitespace-pre-wrap">
                                    {advert.content}
                                </p>
                            </div>

                            {advert.address && (
                                <div className="mt-6 pt-6 border-t">
                                    <h3 className="text-sm font-semibold text-gray-900 mb-2">Address</h3>
                                    <p className="text-gray-700">{advert.address}</p>
                                </div>
                            )}
                        </div>

                        {/* Attributes */}
                        {advert.values && advert.values.length > 0 && (
                            <div className="bg-white rounded-lg shadow-sm p-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                                    Specifications
                                </h2>
                                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {advert.values.map((value, index) => (
                                        <div key={index} className="border-b border-gray-200 pb-3">
                                            <dt className="text-sm font-medium text-gray-500 mb-1">
                                                {value.attribute?.name || 'Attribute'}
                                            </dt>
                                            <dd className="text-base text-gray-900">
                                                {value.value}
                                            </dd>
                                        </div>
                                    ))}
                                </dl>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
                            {/* Price */}
                            <div className="mb-6">
                                <div className="text-3xl font-bold text-blue-600">
                                    {formatPrice(advert.price)}
                                </div>
                            </div>

                            {/* Contact Buttons */}
                            {!isOwner && (
                                <div className="space-y-3 mb-6">
                                    <button
                                        onClick={handleShowPhone}
                                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                        {showPhone ? phone : 'Show Phone'}
                                    </button>

                                    {auth.user && (
                                        isFavorite ? (
                                            <button
                                                onClick={handleRemoveFromFavorites}
                                                disabled={removingFromFavorites}
                                                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 font-medium"
                                            >
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                                </svg>
                                                Remove from Favorites
                                            </button>
                                        ) : (
                                            <button
                                                onClick={handleAddToFavorites}
                                                disabled={addingToFavorites}
                                                className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 font-medium"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                                </svg>
                                                Add to Favorites
                                            </button>
                                        )
                                    )}
                                </div>
                            )}

                            {isOwner && (
                                <div className="space-y-3 mb-6">
                                    <Link
                                        href={`/cabinet/adverts/${advert.id}/edit`}
                                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                        Edit Advert
                                    </Link>
                                </div>
                            )}

                            {/* Seller Info */}
                            {advert.user && (
                                <div className="border-t pt-6">
                                    <h3 className="text-sm font-semibold text-gray-900 mb-3">
                                        Seller Information
                                    </h3>
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                            <span className="text-blue-600 font-semibold text-lg">
                                                {advert.user.name.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">
                                                {advert.user.name}
                                            </p>
                                            {advert.user.phone_verified && (
                                                <span className="inline-flex items-center text-xs text-green-600">
                                                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                    </svg>
                                                    Verified
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
