import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import { Button, Card, Input, PageHeader, RichTextEditor, Select, Textarea } from '../../../Components';

export default function Create({ parents }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        menu_title: '',
        slug: '',
        parent: '',
        content: '',
        description: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/pages');
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
            <Head title="Create Page" />

            <div className="max-w-5xl mx-auto">
                <PageHeader
                    title="Create Page"
                    backHref="/admin/pages"
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
                                    URL-friendly version of the title. Auto-generated from the title.
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
                                    {parents && parents.map((parent) => (
                                        <option key={parent.id} value={parent.id}>
                                            {parent.depth > 0 && '—'.repeat(parent.depth) + ' '}
                                            {parent.title}
                                        </option>
                                    ))}
                                </Select>
                                <p className="mt-2 text-sm text-gray-500">
                                    Optional. Select a parent page to create a nested subpage.
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

                            <RichTextEditor
                                label="Content"
                                value={data.content}
                                onChange={(content) => setData('content', content)}
                                error={errors.content}
                                required
                            />
                        </div>
                    </Card>

                    <div className="flex items-center justify-between mt-6">
                        <Button
                            href="/admin/pages"
                            variant="secondary"
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            loading={processing}
                        >
                            {processing ? 'Creating...' : 'Create Page'}
                        </Button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}