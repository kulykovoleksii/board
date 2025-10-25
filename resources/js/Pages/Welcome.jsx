import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

export default function Welcome({ courses = [] }) {
    return (
        <AppLayout>
            <Head title="Welcome to EduPlatform" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Hero Section */}
                <div className="text-center py-16">
                    <h1 className="text-5xl font-bold text-gray-900 mb-4">
                        Welcome to EduPlatform
                    </h1>
                    <p className="text-xl text-gray-600 mb-8">
                        Your Modern Learning Management System
                    </p>
                    <div className="flex justify-center space-x-4">
                        <Link
                            href="/courses"
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
                        >
                            Explore Courses
                        </Link>
                        <Link
                            href="/register"
                            className="px-6 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 font-semibold"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>

                {/* Features */}
                <div className="py-12">
                    <h2 className="text-3xl font-bold text-center mb-12">Why Choose EduPlatform?</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center p-6 bg-white rounded-lg shadow-md">
                            <div className="text-4xl mb-4">📚</div>
                            <h3 className="text-xl font-semibold mb-2">Comprehensive Courses</h3>
                            <p className="text-gray-600">
                                Access a wide range of courses from beginner to advanced levels
                            </p>
                        </div>
                        <div className="text-center p-6 bg-white rounded-lg shadow-md">
                            <div className="text-4xl mb-4">👨‍🏫</div>
                            <h3 className="text-xl font-semibold mb-2">Expert Instructors</h3>
                            <p className="text-gray-600">
                                Learn from industry professionals and experienced educators
                            </p>
                        </div>
                        <div className="text-center p-6 bg-white rounded-lg shadow-md">
                            <div className="text-4xl mb-4">🎓</div>
                            <h3 className="text-xl font-semibold mb-2">Earn Certificates</h3>
                            <p className="text-gray-600">
                                Get recognized certificates upon course completion
                            </p>
                        </div>
                    </div>
                </div>

                {/* Tech Stack */}
                <div className="py-12 bg-white rounded-lg shadow-md px-8">
                    <h2 className="text-2xl font-bold mb-6">Built with Modern Technology</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="font-semibold text-lg mb-3 text-blue-600">Frontend</h3>
                            <ul className="space-y-2">
                                <li className="flex items-center">
                                    <span className="text-green-500 mr-2">✓</span>
                                    <span>React 19 - Modern UI framework</span>
                                </li>
                                <li className="flex items-center">
                                    <span className="text-green-500 mr-2">✓</span>
                                    <span>Inertia.js - SPA without API complexity</span>
                                </li>
                                <li className="flex items-center">
                                    <span className="text-green-500 mr-2">✓</span>
                                    <span>Vite - Lightning-fast build tool</span>
                                </li>
                                <li className="flex items-center">
                                    <span className="text-green-500 mr-2">✓</span>
                                    <span>Tailwind CSS - Utility-first styling</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg mb-3 text-blue-600">Backend</h3>
                            <ul className="space-y-2">
                                <li className="flex items-center">
                                    <span className="text-green-500 mr-2">✓</span>
                                    <span>Laravel 11 - Powerful PHP framework</span>
                                </li>
                                <li className="flex items-center">
                                    <span className="text-green-500 mr-2">✓</span>
                                    <span>MySQL - Reliable database</span>
                                </li>
                                <li className="flex items-center">
                                    <span className="text-green-500 mr-2">✓</span>
                                    <span>Elasticsearch - Advanced search</span>
                                </li>
                                <li className="flex items-center">
                                    <span className="text-green-500 mr-2">✓</span>
                                    <span>Redis - Fast caching & queues</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}