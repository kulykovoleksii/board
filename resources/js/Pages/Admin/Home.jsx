import { Head, Link } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';

export default function Home({ stats }) {
    const statCards = [
        {
            name: 'Total Users',
            value: stats?.users || 0,
            icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
            color: 'bg-blue-500',
            href: '/admin/users',
        },
        {
            name: 'Open Support',
            value: stats?.tickets || 0,
            icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z',
            color: 'bg-red-500',
            href: '/admin/support',
        },
        {
            name: 'Total Courses',
            value: stats?.courses || 0,
            icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
            color: 'bg-indigo-500',
            href: '/admin/courses',
        },
    ];

    const quickActions = [
        {
            name: 'Manage Users',
            description: 'View and manage user accounts',
            href: '/admin/users',
            icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
        },
        {
            name: 'Add Course',
            description: 'Create a new course',
            href: '/admin/courses/create',
            icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
        },
    ];

    return (
        <AdminLayout>
            <Head title="Admin Dashboard" />

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <p className="mt-2 text-gray-600">Overview of your platform</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8">
                {statCards.map((stat) => (
                    <Link
                        key={stat.name}
                        href={stat.href}
                        className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow"
                    >
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className={`flex-shrink-0 rounded-md p-3 ${stat.color}`}>
                                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                                    </svg>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">
                                            {stat.name}
                                        </dt>
                                        <dd className="text-3xl font-semibold text-gray-900">
                                            {stat.value}
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-white shadow rounded-lg">
                <div className="px-6 py-5 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
                </div>
                <div className="grid grid-cols-1 gap-px bg-gray-200 sm:grid-cols-2">
                    {quickActions.map((action) => (
                        <Link
                            key={action.name}
                            href={action.href}
                            className="bg-white p-6 hover:bg-gray-50 transition-colors"
                        >
                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={action.icon} />
                                        </svg>
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-medium text-gray-900">
                                        {action.name}
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        {action.description}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Recent Activity (placeholder) */}
            <div className="mt-8 bg-white shadow rounded-lg">
                <div className="px-6 py-5 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
                </div>
                <div className="p-6">
                    <p className="text-gray-500 text-center py-8">
                        Recent activity tracking coming soon...
                    </p>
                </div>
            </div>
        </AdminLayout>
    );
}
