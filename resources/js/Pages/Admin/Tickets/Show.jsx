import { Head, Link, router, useForm } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';

export default function Show({ ticket }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        message: '',
    });

    const handleApprove = () => {
        if (confirm('Approve this ticket?')) {
            router.post(`/admin/tickets/${ticket.id}/approve`);
        }
    };

    const handleClose = () => {
        if (confirm('Close this ticket?')) {
            router.post(`/admin/tickets/${ticket.id}/close`);
        }
    };

    const handleReopen = () => {
        if (confirm('Reopen this ticket?')) {
            router.post(`/admin/tickets/${ticket.id}/reopen`);
        }
    };

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this ticket?')) {
            router.delete(`/admin/tickets/${ticket.id}`);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(`/admin/tickets/${ticket.id}/message`, {
            onSuccess: () => reset('message'),
        });
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

    const isOpen = ticket.status === 'open';
    const isClosed = ticket.status === 'closed';
    const allowsMessages = ticket.status !== 'closed';

    return (
        <AdminLayout>
            <Head title={`Ticket #${ticket.id} - ${ticket.subject}`} />

            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                        <Link
                            href="/admin/tickets"
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Ticket #{ticket.id}
                        </h1>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mb-6">
                    <Link
                        href={`/admin/tickets/${ticket.id}/edit`}
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit
                    </Link>
                    {isOpen && (
                        <button
                            onClick={handleApprove}
                            className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Approve
                        </button>
                    )}
                    {!isClosed && (
                        <button
                            onClick={handleClose}
                            className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 font-medium"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Close
                        </button>
                    )}
                    {isClosed && (
                        <button
                            onClick={handleReopen}
                            className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Reopen
                        </button>
                    )}
                    <button
                        onClick={handleDelete}
                        className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 font-medium"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                    {/* Ticket Details */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <tbody className="bg-white divide-y divide-gray-200">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 bg-gray-50 w-1/4">
                                            ID
                                        </th>
                                        <td className="px-6 py-4 text-sm text-gray-900">
                                            {ticket.id}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 bg-gray-50">
                                            Created
                                        </th>
                                        <td className="px-6 py-4 text-sm text-gray-900">
                                            {new Date(ticket.created_at).toLocaleString()}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 bg-gray-50">
                                            Updated
                                        </th>
                                        <td className="px-6 py-4 text-sm text-gray-900">
                                            {new Date(ticket.updated_at).toLocaleString()}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 bg-gray-50">
                                            User
                                        </th>
                                        <td className="px-6 py-4 text-sm text-gray-900">
                                            {ticket.user && (
                                                <Link
                                                    href={`/admin/users/${ticket.user.id}`}
                                                    className="text-blue-600 hover:text-blue-800"
                                                >
                                                    {ticket.user.name}
                                                </Link>
                                            )}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 bg-gray-50">
                                            Status
                                        </th>
                                        <td className="px-6 py-4 text-sm text-gray-900">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[ticket.status] || 'bg-gray-100 text-gray-800'}`}>
                                                {statusLabels[ticket.status] || ticket.status}
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Status History */}
                    <div>
                        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                                <h3 className="text-sm font-medium text-gray-900">Status History</h3>
                            </div>
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {ticket.statuses && ticket.statuses.map((status) => (
                                        <tr key={status.id}>
                                            <td className="px-4 py-2 text-xs text-gray-500">
                                                {new Date(status.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="px-4 py-2 text-xs text-gray-900">
                                                {status.user?.name}
                                            </td>
                                            <td className="px-4 py-2">
                                                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[status.status] || 'bg-gray-100 text-gray-800'}`}>
                                                    {statusLabels[status.status] || status.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Original Ticket */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                        {ticket.subject}
                    </h2>
                    <div className="text-gray-700 whitespace-pre-line">
                        {ticket.content}
                    </div>
                </div>

                {/* Messages */}
                {ticket.messages && ticket.messages.map((message) => (
                    <div key={message.id} className="bg-white rounded-lg shadow-sm p-6 mb-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center">
                                <span className="text-sm font-medium text-gray-900">
                                    {message.user?.name}
                                </span>
                                <span className="ml-2 text-sm text-gray-500">
                                    {new Date(message.created_at).toLocaleString()}
                                </span>
                            </div>
                        </div>
                        <div className="text-gray-700 whitespace-pre-line">
                            {message.message}
                        </div>
                    </div>
                ))}

                {/* Reply Form */}
                {allowsMessages && (
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Send Message</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <textarea
                                    value={data.message}
                                    onChange={(e) => setData('message', e.target.value)}
                                    rows={3}
                                    className={`block w-full rounded-md shadow-sm ${
                                        errors.message
                                            ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                                            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                                    }`}
                                    placeholder="Enter your message..."
                                    required
                                />
                                {errors.message && (
                                    <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                                )}
                            </div>
                            <button
                                type="submit"
                                disabled={processing}
                                className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                                    processing
                                        ? 'bg-blue-400 cursor-not-allowed'
                                        : 'bg-blue-600 hover:bg-blue-700'
                                }`}
                            >
                                {processing ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                        </svg>
                                        Send Message
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
