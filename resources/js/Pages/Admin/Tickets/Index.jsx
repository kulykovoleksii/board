import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '../../../Layouts/AdminLayout';

export default function Index({ tickets, statuses, filters }) {
    const [formData, setFormData] = useState({
        id: filters.id || '',
        user: filters.user || '',
        status: filters.status || '',
    });

    const handleFilter = (e) => {
        e.preventDefault();
        router.get('/admin/tickets', formData, { preserveState: true });
    };

    const handleClear = () => {
        setFormData({ id: '', user: '', status: '' });
        router.get('/admin/tickets', {}, { preserveState: true });
    };

    const statusColors = {
        open: 'bg-red-100 text-red-800',
        approved: 'bg-blue-100 text-blue-800',
        closed: 'bg-gray-100 text-gray-800',
    };

    const statusLabels = {
        open: 'Open',
        approved: 'Approved',
        closed: 'Closed',
    };

    return (
        <AdminLayout>
            <Head title="Tickets" />

            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Tickets</h1>
                    <p className="mt-2 text-gray-600">
                        Manage support tickets
                    </p>
                </div>
            </div>

            {/* Filter Card */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Filter</h2>
                <form onSubmit={handleFilter}>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                            <label htmlFor="id" className="block text-sm font-medium text-gray-700 mb-1">
                                ID
                            </label>
                            <input
                                type="text"
                                id="id"
                                value={formData.id}
                                onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="user" className="block text-sm font-medium text-gray-700 mb-1">
                                User
                            </label>
                            <input
                                type="text"
                                id="user"
                                value={formData.user}
                                onChange={(e) => setFormData({ ...formData, user: e.target.value })}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                                Status
                            </label>
                            <select
                                id="status"
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            >
                                <option value="">All</option>
                                {Object.entries(statuses).map(([value, label]) => (
                                    <option key={value} value={value}>
                                        {label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex items-end gap-2">
                            <button
                                type="submit"
                                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
                            >
                                Search
                            </button>
                            <button
                                type="button"
                                onClick={handleClear}
                                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 font-medium"
                            >
                                Clear
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            {/* Tickets Table */}
            {tickets && tickets.data && tickets.data.length > 0 ? (
                <>
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        ID
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Created
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Updated
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Subject
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        User
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {tickets.data.map((ticket) => (
                                    <tr key={ticket.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {ticket.id}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(ticket.created_at).toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(ticket.updated_at).toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 text-sm">
                                            <Link
                                                href={`/admin/tickets/${ticket.id}`}
                                                className="text-blue-600 hover:text-blue-800 font-medium"
                                            >
                                                {ticket.subject}
                                            </Link>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {ticket.user && (
                                                <>
                                                    {ticket.user.id} - {ticket.user.name}
                                                </>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[ticket.status] || 'bg-gray-100 text-gray-800'}`}>
                                                {statusLabels[ticket.status] || ticket.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {tickets.links && tickets.links.length > 3 && (
                        <div className="mt-6 flex justify-center">
                            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                {tickets.links.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.url || '#'}
                                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                            link.active
                                                ? 'z-10 bg-blue-600 border-blue-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                                        } ${!link.url ? 'cursor-not-allowed opacity-50' : ''} ${
                                            index === 0 ? 'rounded-l-md' : ''
                                        } ${index === tickets.links.length - 1 ? 'rounded-r-md' : ''}`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                        preserveState
                                    />
                                ))}
                            </nav>
                        </div>
                    )}
                </>
            ) : (
                <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                    <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                        No tickets found
                    </h3>
                    <p className="text-gray-600">
                        Try adjusting your filters or wait for users to create support tickets.
                    </p>
                </div>
            )}
        </AdminLayout>
    );
}