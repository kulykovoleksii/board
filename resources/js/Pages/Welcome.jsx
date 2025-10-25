import { Head } from '@inertiajs/react';

export default function Welcome({ courses }) {
    return (
        <>
            <Head title="Welcome to EduPlatform" />
            <div className="min-h-screen bg-gray-100">
                <div className="container mx-auto px-4 py-12">
                    <div className="text-center mb-12">
                        <h1 className="text-5xl font-bold text-gray-900 mb-4">
                            🎓 Welcome to EduPlatform
                        </h1>
                        <p className="text-xl text-gray-600">
                            Your Modern Learning Management System
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
                            Powered by React + Inertia.js + Laravel 11
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
                        <h2 className="text-3xl font-semibold mb-6 text-gray-800">
                            ✨ Features
                        </h2>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <span className="text-green-500 mr-3 text-xl">✓</span>
                                <div>
                                    <strong className="text-gray-900">React Integration:</strong>
                                    <span className="text-gray-600"> Modern SPA experience with React 19</span>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <span className="text-green-500 mr-3 text-xl">✓</span>
                                <div>
                                    <strong className="text-gray-900">Inertia.js:</strong>
                                    <span className="text-gray-600"> No API required, use Laravel routes directly</span>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <span className="text-green-500 mr-3 text-xl">✓</span>
                                <div>
                                    <strong className="text-gray-900">Vite:</strong>
                                    <span className="text-gray-600"> Lightning-fast HMR and build times</span>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <span className="text-green-500 mr-3 text-xl">✓</span>
                                <div>
                                    <strong className="text-gray-900">Laravel 11:</strong>
                                    <span className="text-gray-600"> Latest features and improvements</span>
                                </div>
                            </li>
                        </ul>

                        <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                            <h3 className="text-xl font-semibold text-blue-900 mb-3">
                                🚀 Quick Start
                            </h3>
                            <p className="text-blue-800">
                                Create your first Inertia component in{' '}
                                <code className="bg-blue-100 px-2 py-1 rounded text-sm">
                                    resources/js/Pages/
                                </code>
                            </p>
                            <p className="text-blue-700 text-sm mt-2">
                                Example: Change this file at{' '}
                                <code className="bg-blue-100 px-2 py-1 rounded text-xs">
                                    resources/js/Pages/Welcome.jsx
                                </code>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}