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
            name: 'Total Adverts',
            value: stats?.adverts || 0,
            icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
            color: 'bg-green-500',
            href: '/admin/adverts/adverts',
        },
        {
            name: 'Active Adverts',
            value: stats?.active_adverts || 0,
            icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
            color: 'bg-green-600',
            href: '/admin/adverts/adverts?status=active',
        },
        {
            name: 'Pending Moderation',
            value: stats?.moderation_adverts || 0,
            icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
            color: 'bg-yellow-500',
            href: '/admin/adverts/adverts?status=moderation',
        },
        {
            name: 'Total Banners',
            value: stats?.banners || 0,
            icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
            color: 'bg-purple-500',
            href: '/admin/banners',
        },
        {
            name: 'Open Tickets',
            value: stats?.tickets || 0,
            icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z',
            color: 'bg-red-500',
            href: '/admin/tickets',
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
            name: 'Moderate Adverts',
            description: 'Review pending adverts',
            href: '/admin/adverts/adverts?status=moderation',
            icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
        },
        {
            name: 'Manage Categories',
            description: 'Configure advert categories',
            href: '/admin/adverts/categories',
            icon: 'M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z',
        },
        {
            name: 'Manage Regions',
            description: 'Configure geographical regions',
            href: '/admin/regions',
            icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z',
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
