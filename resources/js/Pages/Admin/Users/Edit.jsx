import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import { Alert, Button, Card, Input, PageHeader, Select } from '../../../Components';

export default function Edit({ user, roles }) {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name || '',
        email: user.email || '',
        role: user.role || 'user',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/admin/users/${user.id}`);
    };

    return (
        <AdminLayout>
            <Head title={`Edit User: ${user.name}`} />

            <div className="max-w-3xl mx-auto">
                <PageHeader
                    title={`Edit User: ${user.name}`}
                    backHref={`/admin/users/${user.id}`}
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

                            <div>
                                <Select
                                    label="Role"
                                    value={data.role}
                                    onChange={(e) => setData('role', e.target.value)}
                                    error={errors.role}
                                    required
                                >
                                    {Object.entries(roles).map(([value, label]) => (
                                        <option key={value} value={value}>
                                            {label}
                                        </option>
                                    ))}
                                </Select>
                                <p className="mt-2 text-sm text-gray-500">
                                    User role determines access permissions.
                                </p>
                            </div>

                            <Alert variant="warning" title="Important">
                                Changing the role will affect user permissions immediately.
                            </Alert>
                        </div>
                    </Card>

                    <div className="flex items-center justify-between mt-6">
                        <Button
                            href={`/admin/users/${user.id}`}
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
