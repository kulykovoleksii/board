import { Head, Link } from '@inertiajs/react';
import CabinetLayout from '../../../../Layouts/CabinetLayout';

export default function Category({ categories }) {
    const renderCategory = (category, level = 0) => {
        return (
            <div key={category.id}>
                <Link
                    href={`/cabinet/adverts/create/region/${category.id}`}
                    className="block px-4 py-3 hover:bg-gray-50 border-b border-gray-200 transition-colors"
                    style={{ paddingLeft: `${1 + level * 2}rem` }}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                            </svg>
                            <span className="text-gray-900 font-medium">{category.name}</span>
                        </div>
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </Link>
                {category.children && category.children.map(child => renderCategory(child, level + 1))}
            </div>
        );
    };

    return (
        <CabinetLayout activeTab="adverts">
            <Head title="Select Category" />

            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Create New Advert</h1>
                    <p className="text-gray-600">Step 1 of 3: Select a category for your advert</p>
                </div>

                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex items-center">
                        <div className="flex items-center text-blue-600 relative">
                            <div className="rounded-full h-10 w-10 flex items-center justify-center bg-blue-600 text-white font-semibold">
                                1
                            </div>
                            <span className="ml-2 text-sm font-medium">Category</span>
                        </div>
                        <div className="flex-auto border-t-2 border-gray-300 mx-4"></div>
                        <div className="flex items-center text-gray-400">
                            <div className="rounded-full h-10 w-10 flex items-center justify-center bg-gray-200 font-semibold">
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

                {/* Categories List */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                        <h2 className="text-lg font-semibold text-gray-900">Choose a Category</h2>
                    </div>
                    <div className="divide-y divide-gray-200">
                        {categories && categories.length > 0 ? (
                            categories.map(category => renderCategory(category))
                        ) : (
                            <div className="px-6 py-8 text-center text-gray-500">
                                No categories available
                            </div>
                        )}
                    </div>
                </div>

                {/* Cancel Button */}
                <div className="mt-6">
                    <Link
                        href="/cabinet/adverts"
                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to My Adverts
                    </Link>
                </div>
            </div>
        </CabinetLayout>
    );
}
