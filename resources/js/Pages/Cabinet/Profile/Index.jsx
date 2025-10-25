import { Head, Link, usePage } from '@inertiajs/react';
import CabinetLayout from '../../../Layouts/CabinetLayout';

export default function Index() {
    const { auth } = usePage().props;
    const user = auth.user;

    const roleLabels = {
        'user': 'User',
        'student': 'Student',
        'instructor': 'Instructor',
        'moderator': 'Moderator',
        'admin': 'Admin',
    };

    const statusLabels = {
        'wait': 'Pending Verification',
        'active': 'Active',
    };

    return (
        <CabinetLayout activeTab="profile">
            <Head title="Profile" />

            <div className="max-w-3xl">
                <div className="bg-white shadow-sm rounded-lg">
                    {/* Header */}
                    <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
                        <h2 className="text-2xl font-semibold text-gray-900">Profile Information</h2>
                        <Link
                            href="/cabinet/profile/edit"
                            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                            Edit Profile
                        </Link>
                    </div>

                    {/* Profile Info */}
                    <div className="px-6 py-5">
                        <dl className="space-y-6">
                            {/* Name */}
                            <div>
                                <dt className="text-sm font-medium text-gray-500 mb-1">First Name</dt>
                                <dd className="text-base text-gray-900">{user.name || '—'}</dd>
                            </div>

                            {/* Last Name */}
                            {user.last_name && (
                                <div>
                                    <dt className="text-sm font-medium text-gray-500 mb-1">Last Name</dt>
                                    <dd className="text-base text-gray-900">{user.last_name}</dd>
                                </div>
                            )}

                            {/* Email */}
                            <div>
                                <dt className="text-sm font-medium text-gray-500 mb-1">Email Address</dt>
                                <dd className="text-base text-gray-900">{user.email}</dd>
                            </div>

                            {/* Phone */}
                            {user.phone && (
                                <div>
                                    <dt className="text-sm font-medium text-gray-500 mb-1">Phone Number</dt>
                                    <dd className="flex items-center gap-2">
                                        <span className="text-base text-gray-900">{user.phone}</span>
                                        {user.phone_verified && (
                                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                                Verified
                                            </span>
                                        )}
                                        {!user.phone_verified && (
                                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                                                Not Verified
                                            </span>
                                        )}
                                    </dd>
                                </div>
                            )}

                            {/* Role */}
                            {user.role && (
                                <div>
                                    <dt className="text-sm font-medium text-gray-500 mb-1">Role</dt>
                                    <dd>
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-blue-100 text-blue-800">
                                            {roleLabels[user.role] || user.role}
                                        </span>
                                    </dd>
                                </div>
                            )}

                            {/* Status */}
                            {user.status && (
                                <div>
                                    <dt className="text-sm font-medium text-gray-500 mb-1">Account Status</dt>
                                    <dd>
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium ${
                                            user.status === 'active'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                            {statusLabels[user.status] || user.status}
                                        </span>
                                    </dd>
                                </div>
                            )}
                        </dl>
                    </div>
                </div>

                {/* Phone Verification */}
                {user.phone && !user.phone_verified && (
                    <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-yellow-800">
                                    Phone number not verified
                                </h3>
                                <div className="mt-2 text-sm text-yellow-700">
                                    <p>Please verify your phone number to access all features.</p>
                                </div>
                                <div className="mt-3">
                                    <Link
                                        href="/cabinet/profile/phone"
                                        className="text-sm font-medium text-yellow-800 hover:text-yellow-900"
                                    >
                                        Verify phone number →
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </CabinetLayout>
    );
}