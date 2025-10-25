import { Head, Link, router } from '@inertiajs/react';
import CabinetLayout from '../../../Layouts/CabinetLayout';

export default function Index({ tickets }) {
    const statusColors = {
        open: 'bg-green-100 text-green-800',
        closed: 'bg-gray-100 text-gray-800',
        approved: 'bg-blue-100 text-blue-800',
    };

    const statusLabels = {
        open: 'Open',
        closed: 'Closed',
        approved: 'Approved',
    };

    const handleDelete = (ticketId) => {
        if (confirm('Are you sure you want to delete this ticket?')) {
            router.delete(`/cabinet/tickets/${ticketId}`, {
                preserveScroll: true,
            });
        }
    };

    return (
        <CabinetLayout activeTab="tickets">
            <Head title="My Tickets" />

            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Support Tickets</h1>
                    <p className="mt-2 text-gray-600">
                        Manage your support requests
                    </p>
                </div>
                <Link
                    href="/cabinet/tickets/create"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    New Ticket
                </Link>
            </div>

            {tickets.data && tickets.data.length > 0 ? (
                <div className="space-y-4">
                    {tickets.data.map((ticket) => (
                        <div key={ticket.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-sm text-gray-500">#{ticket.id}</span>
                                            <h3 className="text-lg font-semibold text-gray-900">
                                                {ticket.subject}
                                            </h3>
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[ticket.status]}`}>
                                                {statusLabels[ticket.status]}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-600 line-clamp-2">
                                            {ticket.content}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t">
                                    <div className="flex items-center gap-4 text-sm text-gray-500">
                                        <span className="flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Updated {new Date(ticket.updated_at).toLocaleDateString()}
                                        </span>
                                        {ticket.messages && (
                                            <span className="flex items-center gap-1">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                                </svg>
                                                {ticket.messages.length} {ticket.messages.length === 1 ? 'message' : 'messages'}
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Link
                                            href={`/cabinet/tickets/${ticket.id}`}
                                            className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100"
                                        >
                                            View Details
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(ticket.id)}
                                            className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-red-700 bg-red-50 border border-red-200 rounded-md hover:bg-red-100"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Pagination */}
                    {tickets.last_page > 1 && (
                        <div className="flex items-center justify-center gap-2 mt-8">
                            {tickets.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url || '#'}
                                    className={`px-4 py-2 rounded-md text-sm font-medium ${
                                        link.active
                                            ? 'bg-blue-600 text-white'
                                            : link.url
                                            ? 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    }`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            ) : (
                /* Empty State */
                <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                    <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                        No tickets yet
                    </h3>
                    <p className="text-gray-600 mb-6">
                        Create a support ticket if you need help with anything.
                    </p>
                    <Link
                        href="/cabinet/tickets/create"
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Create Your First Ticket
                    </Link>
                </div>
            )}
        </CabinetLayout>
    );
}
