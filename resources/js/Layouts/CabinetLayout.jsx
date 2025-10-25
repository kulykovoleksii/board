import { Link, usePage } from '@inertiajs/react';
import AppLayout from './AppLayout';

export default function CabinetLayout({ children, activeTab = 'dashboard' }) {
    const tabs = [
        { name: 'Dashboard', href: '/cabinet', key: 'dashboard' },
        { name: 'Adverts', href: '/cabinet/adverts', key: 'adverts' },
        { name: 'Favorites', href: '/cabinet/favorites', key: 'favorites' },
        { name: 'Banners', href: '/cabinet/banners', key: 'banners' },
        { name: 'Profile', href: '/cabinet/profile', key: 'profile' },
        { name: 'Tickets', href: '/cabinet/tickets', key: 'tickets' },
    ];

    return (
        <AppLayout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Tabs Navigation */}
                <div className="border-b border-gray-200 mb-6">
                    <nav className="-mb-px flex space-x-8">
                        {tabs.map((tab) => (
                            <Link
                                key={tab.key}
                                href={tab.href}
                                className={`
                                    whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                                    ${activeTab === tab.key
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }
                                `}
                            >
                                {tab.name}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Tab Content */}
                {children}
            </div>
        </AppLayout>
    );
}
