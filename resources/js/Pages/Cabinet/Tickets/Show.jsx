import { Head, Link, useForm } from '@inertiajs/react';
import CabinetLayout from '../../../Layouts/CabinetLayout';

export default function Show({ ticket }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        message: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(`/cabinet/tickets/${ticket.id}/message`, {
            preserveScroll: true,
            onSuccess: () => reset('message'),
        });
    };

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

    return (
        <CabinetLayout activeTab="tickets">
            <Head title={`Ticket #${ticket.id}`} />

            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                        <Link
                            href="/cabinet/tickets"
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Ticket #{ticket.id}: {ticket.subject}
                        </h1>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[ticket.status]}`}>
                            {statusLabels[ticket.status]}
                        </span>
                    </div>
                    <p className="text-sm text-gray-500">
                        Created {new Date(ticket.created_at).toLocaleString()}
                    </p>
                </div>

                {/* Original Message */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                <span className="text-blue-600 font-semibold">
                                    {ticket.user?.name?.charAt(0).toUpperCase()}
                                </span>
                            </div>
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="font-semibold text-gray-900">
                                    {ticket.user?.name} (You)
                                </span>
                                <span className="text-sm text-gray-500">
                                    {new Date(ticket.created_at).toLocaleString()}
                                </span>
                            </div>
                            <div className="prose max-w-none">
                                <p className="text-gray-700 whitespace-pre-wrap">{ticket.content}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Messages */}
                {ticket.messages && ticket.messages.length > 0 && (
                    <div className="space-y-4 mb-6">
                        {ticket.messages.map((message, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                            message.user_id === ticket.user_id
                                                ? 'bg-blue-100'
                                                : 'bg-purple-100'
                                        }`}>
                                            <span className={`font-semibold ${
                                                message.user_id === ticket.user_id
                                                    ? 'text-blue-600'
                                                    : 'text-purple-600'
                                            }`}>
                                                {message.author_name?.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="font-semibold text-gray-900">
                                                {message.author_name}
                                                {message.user_id === ticket.user_id && ' (You)'}
                                            </span>
                                            {message.user_id !== ticket.user_id && (
                                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
                                                    Support
                                                </span>
                                            )}
                                            <span className="text-sm text-gray-500">
                                                {new Date(message.created_at).toLocaleString()}
                                            </span>
                                        </div>
                                        <div className="prose max-w-none">
                                            <p className="text-gray-700 whitespace-pre-wrap">{message.message}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Reply Form */}
                {ticket.status === 'open' && (
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Reply</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <textarea
                                    rows={4}
                                    value={data.message}
                                    onChange={(e) => setData('message', e.target.value)}
                                    className={`block w-full rounded-md shadow-sm ${
                                        errors.message
                                            ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                                            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                                    }`}
                                    placeholder="Type your message..."
                                    required
                                />
                                {errors.message && (
                                    <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                                )}
                            </div>
                            <div className="flex justify-end">
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
                                            Send Reply
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {ticket.status === 'closed' && (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                        <p className="text-gray-600">
                            This ticket is closed. No further replies can be added.
                        </p>
                    </div>
                )}
            </div>
        </CabinetLayout>
    );
}
