import { Head, Link } from '@inertiajs/react';
import CabinetLayout from '../../../../Layouts/CabinetLayout';

export default function Region({ category, region, regions }) {
    return (
        <CabinetLayout activeTab="adverts">
            <Head title="Select Region" />

            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Create New Advert</h1>
                    <p className="text-gray-600">Step 2 of 3: Select a region for your advert</p>
                    <div className="mt-2 text-sm text-gray-500">
                        Category: <span className="font-medium text-gray-700">{category.name}</span>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex items-center">
                        <div className="flex items-center text-green-600 relative">
                            <div className="rounded-full h-10 w-10 flex items-center justify-center bg-green-600 text-white">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <span className="ml-2 text-sm font-medium">Category</span>
                        </div>
                        <div className="flex-auto border-t-2 border-green-600 mx-4"></div>
                        <div className="flex items-center text-blue-600">
                            <div className="rounded-full h-10 w-10 flex items-center justify-center bg-blue-600 text-white font-semibold">
                                2
                            </div>
                            <span className="ml-2 text-sm font-medium">Region</span>
                        </div>
                        <div className="flex-auto border-t-2 border-gray-300 mx-4"></div>
                        <div className="flex items-center text-gray-400">
                            <div className="rounded-full h-10 w-10 flex items-center justify-center bg-gray-200 font-semibold">
                                3
                            </div>
                            <span className="ml-2 text-sm font-medium">Details</span>
                        </div>
                    </div>
                </div>

                {/* Regions List */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                    <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                        <h2 className="text-lg font-semibold text-gray-900">
                            {region ? `Select region in ${region.name}` : 'Choose a Region'}
                        </h2>
                    </div>
                    <div className="divide-y divide-gray-200">
                        {regions && regions.length > 0 ? (
                            regions.map((reg) => (
                                <Link
                                    key={reg.id}
                                    href={`/cabinet/adverts/create/region/${category.id}/${reg.id}`}
                                    className="block px-6 py-4 hover:bg-gray-50 transition-colors"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <span className="text-gray-900 font-medium">{reg.name}</span>
                                        </div>
                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="px-6 py-8 text-center text-gray-500">
                                No sub-regions available
                            </div>
                        )}
                    </div>
                </div>

                {/* Skip Region / Continue */}
                <div className="flex items-center justify-between">
                    <Link
                        href="/cabinet/adverts/create"
                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back
                    </Link>

                    <Link
                        href={`/cabinet/adverts/create/advert/${category.id}${region ? `/${region.id}` : ''}`}
                        className="inline-flex items-center px-6 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 font-medium"
                    >
                        {regions && regions.length > 0 ? 'Skip Region Selection' : 'Continue'}
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </CabinetLayout>
    );
}