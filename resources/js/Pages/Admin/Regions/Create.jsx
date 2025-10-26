import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import { Alert, Button, Card, Input, PageHeader } from '../../../Components';

export default function Create({ parent }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        slug: '',
        parent: parent?.id || null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(parent ? `/admin/regions?parent=${parent.id}` : '/admin/regions');
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
            <Head title={parent ? `Create Subregion for ${parent.name}` : 'Create Region'} />

            <div className="max-w-3xl mx-auto">
                <PageHeader
                    title={parent ? `Create Subregion for ${parent.name}` : 'Create Region'}
                    backHref={parent ? `/admin/regions/${parent.id}` : '/admin/regions'}
                />

                {parent && (
                    <Alert variant="info" className="mb-6">
                        Creating a subregion for: <strong>{parent.name}</strong>
                    </Alert>
                )}

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
                                    URL-friendly version of the name. Auto-generated from the name, but you can customize it.
                                </p>
                            </div>
                        </div>
                    </Card>

                    <div className="flex items-center justify-between mt-6">
                        <Button
                            href={parent ? `/admin/regions/${parent.id}` : '/admin/regions'}
                            variant="secondary"
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            loading={processing}
                        >
                            {processing ? 'Creating...' : 'Create Region'}
                        </Button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
