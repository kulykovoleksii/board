import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import { Alert, Button, Card, Input, PageHeader, Select, Textarea } from '../../../Components';

export default function Edit({ page, parents }) {
    const { data, setData, put, processing, errors } = useForm({
        title: page.title || '',
        menu_title: page.menu_title || '',
        slug: page.slug || '',
        parent: page.parent_id || '',
        content: page.content || '',
        description: page.description || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/admin/pages/${page.id}`);
    };

    const generateSlug = (title) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
    };

    const handleTitleChange = (e) => {
        const title = e.target.value;
        setData({
            ...data,
            title: title,
            slug: generateSlug(title),
        });
    };

    return (
        <AdminLayout>
            <Head title={`Edit Page: ${page.title}`} />

            <div className="max-w-5xl mx-auto">
                <PageHeader
                    title={`Edit Page: ${page.title}`}
                    backHref={`/admin/pages/${page.id}`}
                />

                <form onSubmit={handleSubmit}>
                    <Card>
                        <div className="space-y-6">
                            <Input
                                label="Title"
                                type="text"
                                value={data.title}
                                onChange={handleTitleChange}
                                error={errors.title}
                                placeholder="Enter page title"
                                required
                            />

                            <div>
                                <Input
                                    label="Menu Title"
                                    type="text"
                                    value={data.menu_title}
                                    onChange={(e) => setData('menu_title', e.target.value)}
                                    error={errors.menu_title}
                                    placeholder="Optional menu title (overrides main title in menu)"
                                />
                                <p className="mt-2 text-sm text-gray-500">
                                    Optional. If provided, this title will be displayed in navigation menus instead of the main title.
                                </p>
                            </div>

                            <div>
                                <Input
                                    label="Slug"
                                    type="text"
                                    value={data.slug}
                                    onChange={(e) => setData('slug', e.target.value)}
                                    error={errors.slug}
                                    placeholder="page-slug"
                                    required
                                />
                                <p className="mt-2 text-sm text-gray-500">
                                    URL-friendly version of the title. Changes will affect URLs.
                                </p>
                            </div>

                            <div>
                                <Select
                                    label="Parent Page"
                                    value={data.parent}
                                    onChange={(e) => setData('parent', e.target.value)}
                                    error={errors.parent}
                                >
                                    <option value="">None (Top Level)</option>
                                    {parents && parents.filter(p => p.id !== page.id).map((parent) => (
                                        <option key={parent.id} value={parent.id}>
                                            {parent.depth > 0 && '—'.repeat(parent.depth) + ' '}
                                            {parent.title}
                                        </option>
                                    ))}
                                </Select>
                                <p className="mt-2 text-sm text-gray-500">
                                    Optional. Select a parent page to make this a subpage.
                                </p>
                            </div>

                            <div>
                                <Textarea
                                    label="Description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    error={errors.description}
                                    rows={3}
                                    placeholder="Optional page description for SEO"
                                />
                                <p className="mt-2 text-sm text-gray-500">
                                    Optional. Meta description for search engines.
                                </p>
                            </div>

                            <div>
                                <Textarea
                                    label="Content"
                                    value={data.content}
                                    onChange={(e) => setData('content', e.target.value)}
                                    error={errors.content}
                                    rows={15}
                                    className="font-mono text-sm"
                                    placeholder="Enter page content (HTML is supported)"
                                    required
                                />
                                <p className="mt-2 text-sm text-gray-500">
                                    Page content. HTML markup is supported.
                                </p>
                            </div>

                            <Alert variant="warning" title="Important">
                                Changing the slug or parent page will affect the page URL and may break existing links.
                            </Alert>
                        </div>
                    </Card>

                    <div className="flex items-center justify-between mt-6">
                        <Button
                            href={`/admin/pages/${page.id}`}
                            variant="secondary"
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            loading={processing}
                        >
                            {processing ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
