import { Head, Link } from '@inertiajs/react';
import CabinetLayout from '../../../../Layouts/CabinetLayout';

export default function Category({ categories }) {
    const renderCategories = (categories, level = 0) => {
        return categories.map((category) => (
            <div key={category.id} className={level > 0 ? 'ml-6' : ''}>
                <Link
                    href={`/cabinet/banners/create/${category.id}/region`}
                    className="block p-4 mb-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 hover:border-blue-500"
                >
                    <div className="flex items-center">
                        <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                        <span className="text-gray-900 font-medium">{category.name}</span>
                        <svg className="w-5 h-5 text-gray-400 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </Link>
                {category.children && category.children.length > 0 && (
                    <div className="mt-2">
                        {renderCategories(category.children, level + 1)}
                    </div>
                )}
            </div>
        ));
    };

    return (
        <CabinetLayout activeTab="banners">
            <Head title="Create Banner - Choose Category" />

            <div className="max-w-4xl mx-auto">
                <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                        <Link
                            href="/cabinet/banners"
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-900">Create Banner</h1>
                    </div>
                    <p className="text-gray-600">Step 1 of 3: Choose a category for your banner</p>
                </div>

                {/* Progress Indicator */}
                <div className="mb-8">
                    <div className="flex items-center">
                        <div className="flex items-center text-blue-600">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-semibold">
                                1
                            </div>
                            <span className="ml-2 text-sm font-medium">Category</span>
                        </div>
                        <div className="flex-1 h-0.5 mx-4 bg-gray-300"></div>
                        <div className="flex items-center text-gray-400">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-300 text-gray-600 font-semibold">
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

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <div className="flex">
                        <svg className="h-5 w-5 text-blue-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        <div className="ml-3">
                            <p className="text-sm text-blue-700">
                                Choose the category that best matches where you want your banner to be displayed
                            </p>
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    {categories && categories.length > 0 ? (
                        renderCategories(categories)
                    ) : (
                        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                            <p className="text-gray-600">No categories available</p>
                        </div>
                    )}
                </div>
            </div>
        </CabinetLayout>
    );
}
