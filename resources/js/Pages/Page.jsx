import { Head, Link } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';

export default function Page({ page }) {
    return (
        <AppLayout>
            <Head title={page.title}>
                <meta name="description" content={page.description} />
            </Head>

            <div className="max-w-5xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">{page.title}</h1>

                {page.children && page.children.length > 0 && (
                    <ul className="mb-6 space-y-2">
                        {page.children.map((child) => (
                            <li key={child.id}>
                                <Link
                                    href={`/page/${child.slug}`}
                                    className="text-blue-600 hover:text-blue-800 hover:underline"
                                >
                                    {child.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}

                <div
                    className="prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: page.content }}
                />
            </div>
        </AppLayout>
    );
}