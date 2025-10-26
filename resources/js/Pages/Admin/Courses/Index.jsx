import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '../../../Layouts/AdminLayout';
import { Button, Input, Select, PageHeader } from '../../../Components';

export default function Index({ courses, categories, instructors, filters, levels }) {
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || '');
    const [categoryId, setCategoryId] = useState(filters.category_id || '');
    const [level, setLevel] = useState(filters.level || '');
    const [instructorId, setInstructorId] = useState(filters.instructor_id || '');

    const handleFilter = () => {
        router.get('/admin/courses', {
            search,
            status,
            category_id: categoryId,
            level,
            instructor_id: instructorId,
        }, {
            preserveState: true,
        });
    };

    const handleReset = () => {
        setSearch('');
        setStatus('');
        setCategoryId('');
        setLevel('');
        setInstructorId('');
        router.get('/admin/courses');
    };

    const handleDelete = (course) => {
        if (confirm(`Are you sure you want to delete "${course.title_en}"?`)) {
            router.delete(`/admin/courses/${course.id}`);
        }
    };

    const handlePublish = (course) => {
        router.post(`/admin/courses/${course.id}/publish`, {}, {
            preserveState: true,
        });
    };

    const handleUnpublish = (course) => {
        router.post(`/admin/courses/${course.id}/unpublish`, {}, {
            preserveState: true,
        });
    };

    return (
        <AdminLayout>
            <Head title="Courses" />

            <PageHeader
                title="Courses"
                action={
                    <Link href="/admin/courses/create">
                        <Button>Create Course</Button>
                    </Link>
                }
            />

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    <Input
                        placeholder="Search courses..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleFilter()}
                    />

                    <Select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="">All Statuses</option>
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                    </Select>

                    <Select
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                    >
                        <option value="">All Categories</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name_en}</option>
                        ))}
                    </Select>

                    <Select
                        value={level}
                        onChange={(e) => setLevel(e.target.value)}
                    >
                        <option value="">All Levels</option>
                        {Object.entries(levels).map(([key, label]) => (
                            <option key={key} value={key}>{label}</option>
                        ))}
                    </Select>

                    <Select
                        value={instructorId}
                        onChange={(e) => setInstructorId(e.target.value)}
                    >
                        <option value="">All Instructors</option>
                        {instructors.map(inst => (
                            <option key={inst.id} value={inst.id}>{inst.name}</option>
                        ))}
                    </Select>
                </div>

                <div className="flex gap-2 mt-4">
                    <Button onClick={handleFilter}>Apply Filters</Button>
                    <Button variant="secondary" onClick={handleReset}>Reset</Button>
                </div>
            </div>

            {/* Courses Table */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Course
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Instructor
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Category
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Level
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Price
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {courses.data.map((course) => (
                            <tr key={course.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">
                                                {course.title_en}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {course.title_uk}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {course.instructor?.name || 'N/A'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {course.category?.name_en || 'N/A'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 capitalize">
                                        {course.level}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {course.price ? `$${course.price}` : 'Free'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        course.is_published
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-gray-100 text-gray-800'
                                    }`}>
                                        {course.is_published ? 'Published' : 'Draft'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div className="flex justify-end gap-2">
                                        <Link
                                            href={`/admin/courses/${course.id}`}
                                            className="text-blue-600 hover:text-blue-900"
                                        >
                                            View
                                        </Link>
                                        <Link
                                            href={`/admin/courses/${course.id}/edit`}
                                            className="text-indigo-600 hover:text-indigo-900"
                                        >
                                            Edit
                                        </Link>
                                        {course.is_published ? (
                                            <button
                                                onClick={() => handleUnpublish(course)}
                                                className="text-orange-600 hover:text-orange-900"
                                            >
                                                Unpublish
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handlePublish(course)}
                                                className="text-green-600 hover:text-green-900"
                                            >
                                                Publish
                                            </button>
                                        )}
                                        <button
                                            onClick={() => handleDelete(course)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {courses.data.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No courses found.</p>
                    </div>
                )}

                {/* Pagination */}
                {courses.links.length > 3 && (
                    <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
                        <div className="flex justify-between items-center">
                            <div className="text-sm text-gray-700">
                                Showing <span className="font-medium">{courses.from}</span> to{' '}
                                <span className="font-medium">{courses.to}</span> of{' '}
                                <span className="font-medium">{courses.total}</span> results
                            </div>
                            <div className="flex gap-1">
                                {courses.links.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.url || '#'}
                                        className={`px-3 py-1 rounded ${
                                            link.active
                                                ? 'bg-blue-600 text-white'
                                                : link.url
                                                ? 'bg-white text-gray-700 hover:bg-gray-50 border'
                                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        }`}
                                        preserveState
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
