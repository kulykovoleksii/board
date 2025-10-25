import { Head, Link, useForm } from '@inertiajs/react';
import CabinetLayout from '../../../Layouts/CabinetLayout';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        subject: '',
        content: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/cabinet/tickets');
    };

    return (
        <CabinetLayout activeTab="tickets">
            <Head title="Create Ticket" />

            <div className="max-w-3xl mx-auto">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Create Support Ticket</h1>
                    <p className="mt-2 text-gray-600">
                        Describe your issue and we'll get back to you as soon as possible
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
                        {/* Subject */}
                        <div>
                            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                                Subject <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="subject"
                                value={data.subject}
                                onChange={(e) => setData('subject', e.target.value)}
                                className={`mt-1 block w-full rounded-md shadow-sm ${
                                    errors.subject
                                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                                        : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                                }`}
                                placeholder="Brief summary of your issue"
                                required
                            />
                            {errors.subject && (
                                <p className="mt-1 text-sm text-red-600">{errors.subject}</p>
                            )}
                        </div>

                        {/* Content */}
                        <div>
                            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                                Description <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                id="content"
                                rows={8}
                                value={data.content}
                                onChange={(e) => setData('content', e.target.value)}
                                className={`mt-1 block w-full rounded-md shadow-sm ${
                                    errors.content
                                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                                        : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                                }`}
                                placeholder="Please provide as much detail as possible about your issue..."
                                required
                            />
                            {errors.content && (
                                <p className="mt-1 text-sm text-red-600">{errors.content}</p>
                            )}
                            <p className="mt-2 text-sm text-gray-500">
                                Include any relevant details, error messages, or steps to reproduce the issue.
                            </p>
                        </div>

                        {/* Info Box */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <div className="flex">
                                <svg className="h-5 w-5 text-blue-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                </svg>
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-blue-800">
                                        What to expect
                                    </h3>
                                    <div className="mt-2 text-sm text-blue-700">
                                        <ul className="list-disc list-inside space-y-1">
                                            <li>Our support team will review your ticket within 24 hours</li>
                                            <li>You'll receive email notifications for any updates</li>
                                            <li>You can add more details by replying to the ticket</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between mt-6">
                        <Link
                            href="/cabinet/tickets"
                            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Cancel
                        </Link>

                        <button
                            type="submit"
                            disabled={processing}
                            className={`inline-flex items-center px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
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
                                    Creating...
                                </>
                            ) : (
                                <>
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Create Ticket
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </CabinetLayout>
    );
}