import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import { Alert, Button, Card, Input, PageHeader } from '../../../Components';

export default function Edit({ region }) {
    const { data, setData, put, processing, errors } = useForm({
        name: region.name || '',
        slug: region.slug || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/admin/regions/${region.id}`);
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
            <Head title={`Edit Region: ${region.name}`} />

            <div className="max-w-3xl mx-auto">
                <PageHeader
                    title={`Edit Region: ${region.name}`}
                    backHref={`/admin/regions/${region.id}`}
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
                                placeholder="Enter region name"
                                required
                            />

                            <div>
                                <Input
                                    label="Slug"
                                    type="text"
                                    value={data.slug}
                                    onChange={(e) => setData('slug', e.target.value)}
                                    error={errors.slug}
                                    placeholder="region-slug"
                                    required
                                />
                                <p className="mt-2 text-sm text-gray-500">
                                    URL-friendly version of the name. Changes will affect URLs using this region.
                                </p>
                            </div>

                            <Alert variant="warning" title="Important">
                                Changing the slug will affect all URLs that reference this region. Make sure to update any bookmarks or external links.
                            </Alert>
                        </div>
                    </Card>

                    <div className="flex items-center justify-between mt-6">
                        <Button
                            href={`/admin/regions/${region.id}`}
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