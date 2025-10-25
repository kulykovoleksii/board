import { Head, Link } from '@inertiajs/react';
import CabinetLayout from '../../../../Layouts/CabinetLayout';

export default function Region({ category, region, regions }) {
    const bannerUrl = region
        ? `/cabinet/banners/create/${category.id}/${region.id}/banner`
        : `/cabinet/banners/create/${category.id}/banner`;

    const regionName = region ? region.name : 'All Regions';

    return (
        <CabinetLayout activeTab="banners">
            <Head title="Create Banner - Choose Region" />

            <div className="max-w-4xl mx-auto">
                <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                        <Link
                            href="/cabinet/banners/create"
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-900">Create Banner</h1>
                    </div>
                    <p className="text-gray-600">Step 2 of 3: Choose a region for your banner</p>
                </div>

                {/* Progress Indicator */}
                <div className="mb-8">
                    <div className="flex items-center">
                        <div className="flex items-center text-green-600">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-600 text-white">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <span className="ml-2 text-sm font-medium">Category</span>
                        </div>
                        <div className="flex-1 h-0.5 mx-4 bg-blue-600"></div>
                        <div className="flex items-center text-blue-600">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-semibold">
                                2
                            </div>
                            <span className="ml-2 text-sm font-medium">Region</span>
                        </div>
                        <div className="flex-1 h-0.5 mx-4 bg-gray-300"></div>
                        <div className="flex items-center text-gray-400">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-300 text-gray-600 font-semibold">
                                3
                            </div>
                            <span className="ml-2 text-sm font-medium">Banner Details</span>
                        </div>
                    </div>
                </div>

                {/* Selected Category Info */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center">
                        <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                        <span className="text-sm text-gray-600">Selected Category:</span>
                        <span className="ml-2 text-sm font-semibold text-gray-900">{category.name}</span>
                    </div>
                </div>

                {/* Continue Button */}
                <div className="mb-6">
                    <Link
                        href={bannerUrl}
                        className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium text-lg shadow-sm"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add Banner for {regionName}
                    </Link>
                </div>

                {/* Nested Regions */}
                {regions && regions.length > 0 && (
                    <>
                        <div className="mb-4">
                            <h2 className="text-lg font-semibold text-gray-900">Or choose a specific region:</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {regions.map((current) => (
                                <Link
                                    key={current.id}
                                    href={`/cabinet/banners/create/${category.id}/${current.id}/region`}
                                    className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 hover:border-blue-500"
                                >
                                    <div className="flex items-center">
                                        <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        </svg>
                                        <span className="text-gray-900 font-medium">{current.name}</span>
                                        <svg className="w-5 h-5 text-gray-400 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </CabinetLayout>
    );
}
