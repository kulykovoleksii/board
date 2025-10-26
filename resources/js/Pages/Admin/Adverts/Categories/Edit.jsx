import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '../../../../Layouts/AdminLayout';
import { Alert, Button, Card, Input, PageHeader, Select } from '../../../../Components';

export default function Edit({ category, parents }) {
    const { data, setData, put, processing, errors } = useForm({
        name: category.name || '',
        slug: category.slug || '',
        parent: category.parent_id || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/admin/adverts/categories/${category.id}`);
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
            <Head title={`Edit Category: ${category.name}`} />

            <div className="max-w-3xl mx-auto">
                <PageHeader
                    title={`Edit Category: ${category.name}`}
                    backHref={`/admin/adverts/categories/${category.id}`}
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
                                    URL-friendly version of the name. Changes will affect URLs.
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
                                    {parents && parents.filter(p => p.id !== category.id).map((parent) => (
                                        <option key={parent.id} value={parent.id}>
                                            {parent.depth > 0 && '—'.repeat(parent.depth) + ' '}
                                            {parent.name}
                                        </option>
                                    ))}
                                </Select>
                                <p className="mt-2 text-sm text-gray-500">
                                    Optional. Select a parent category to make this a subcategory.
                                </p>
                            </div>

                            <Alert variant="warning" title="Important">
                                Changing the parent category may affect existing adverts in this category and subcategories.
                            </Alert>
                        </div>
                    </Card>

                    <div className="flex items-center justify-between mt-6">
                        <Button
                            href={`/admin/adverts/categories/${category.id}`}
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