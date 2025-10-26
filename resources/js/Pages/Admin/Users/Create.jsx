import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import { Button, Card, Input, PageHeader } from '../../../Components';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/users');
    };

    return (
        <AdminLayout>
            <Head title="Create User" />

            <div className="max-w-3xl mx-auto">
                <PageHeader
                    title="Create User"
                    backHref="/admin/users"
                />

                <form onSubmit={handleSubmit}>
                    <Card>
                        <div className="space-y-6">
                            <Input
                                label="Name"
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                error={errors.name}
                                placeholder="Enter user name"
                                required
                            />

                            <Input
                                label="E-Mail Address"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                error={errors.email}
                                placeholder="user@example.com"
                                required
                            />
                        </div>
                    </Card>

                    <div className="flex items-center justify-between mt-6">
                        <Button
                            href="/admin/users"
                            variant="secondary"
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            loading={processing}
                        >
                            {processing ? 'Creating...' : 'Create User'}
                        </Button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
