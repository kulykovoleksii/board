import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '../../../../Layouts/AdminLayout';
import { Button, Card, Input, PageHeader, Select } from '../../../../Components';

export default function Create({ parents }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        slug: '',
        parent: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/adverts/categories');
    };

    const generateSlug = (name) => {
        return name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
    };

    const handleNameChange = (e) => {
        const name = e.target.value;
        setData({
            ...data,
            name: name,
            slug: generateSlug(name),
        });
    };

    return (
        <AdminLayout>
            <Head title="Create Advert Category" />

            <div className="max-w-3xl mx-auto">
                <PageHeader
                    title="Create Advert Category"
                    backHref="/admin/adverts/categories"
                />

                <form onSubmit={handleSubmit}>
                    <Card>
                        <div className="space-y-6">
                            <Input
                                label="Name"
                                type="text"
                                value={data.name}
                                onChange={handleNameChange}
                                error={errors.name}
                                placeholder="Enter category name"
                                required
                            />

                            <div>
                                <Input
                                    label="Slug"
                                    type="text"
                                    value={data.slug}
                                    onChange={(e) => setData('slug', e.target.value)}
                                    error={errors.slug}
                                    placeholder="category-slug"
                                    required
                                />
                                <p className="mt-2 text-sm text-gray-500">
                                    URL-friendly version of the name. Auto-generated from the name.
                                </p>
                            </div>

                            <div>
                                <Select
                                    label="Parent Category"
                                    value={data.parent}
                                    onChange={(e) => setData('parent', e.target.value)}
                                    error={errors.parent}
                                >
                                    <option value="">None (Top Level)</option>
                                    {parents && parents.map((parent) => (
                                        <option key={parent.id} value={parent.id}>
                                            {parent.depth > 0 && '—'.repeat(parent.depth) + ' '}
                                            {parent.name}
                                        </option>
                                    ))}
                                </Select>
                                <p className="mt-2 text-sm text-gray-500">
                                    Optional. Select a parent category to create a subcategory.
                                </p>
                            </div>
                        </div>
                    </Card>

                    <div className="flex items-center justify-between mt-6">
                        <Button
                            href="/admin/adverts/categories"
                            variant="secondary"
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            loading={processing}
                        >
                            {processing ? 'Creating...' : 'Create Category'}
                        </Button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}