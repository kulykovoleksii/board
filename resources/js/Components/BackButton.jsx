import { Link } from '@inertiajs/react';

export default function BackButton({ href, className = '' }) {
    return (
        <Link
            href={href}
            className={`text-gray-500 hover:text-gray-700 ${className}`}
        >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
        </Link>
    );
}