import { Head, Link, router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '../../../Layouts/AdminLayout';
import { Alert, Button, Card, Input, PageHeader, Textarea } from '../../../Components';

export default function Show({ course, stats }) {
    const [showModuleForm, setShowModuleForm] = useState(false);
    const [editingModule, setEditingModule] = useState(null);
    const [expandedModules, setExpandedModules] = useState({});

    const toggleModule = (moduleId) => {
        setExpandedModules(prev => ({
            ...prev,
            [moduleId]: !prev[moduleId]
        }));
    };

    const handlePublish = () => {
        if (confirm('Publish this course?')) {
            router.post(`/admin/courses/${course.id}/publish`);
        }
    };

    const handleUnpublish = () => {
        if (confirm('Unpublish this course?')) {
            router.post(`/admin/courses/${course.id}/unpublish`);
        }
    };

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
            router.delete(`/admin/courses/${course.id}`);
        }
    };

    return (
        <AdminLayout>
            <Head title={course.title_en} />

            <PageHeader
                title={course.title_en}
                backHref="/admin/courses"
                action={
                    <div className="flex gap-2">
                        <Link href={`/courses/${course.id}`} target="_blank">
                            <Button variant="secondary">View Public</Button>
                        </Link>
                        <Link href={`/admin/courses/${course.id}/edit`}>
                            <Button variant="secondary">Edit Details</Button>
                        </Link>
                        {course.is_published ? (
                            <Button variant="secondary" onClick={handleUnpublish}>
                                Unpublish
                            </Button>
                        ) : (
                            <Button onClick={handlePublish}>
                                Publish
                            </Button>
                        )}
                    </div>
                }
            />

            {/* Course Info */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <Card>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600">{stats.modules}</div>
                        <div className="text-sm text-gray-600 mt-1">Modules</div>
                    </div>
                </Card>
                <Card>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-green-600">{stats.lessons}</div>
                        <div className="text-sm text-gray-600 mt-1">Lessons</div>
                    </div>
                </Card>
                <Card>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-purple-600">{stats.students}</div>
                        <div className="text-sm text-gray-600 mt-1">Students Enrolled</div>
                    </div>
                </Card>
            </div>

            {/* Course Details */}
            <Card className="mb-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                        <span className="text-gray-600">Instructor:</span>
                        <div className="font-medium">{course.instructor?.name}</div>
                    </div>
                    <div>
                        <span className="text-gray-600">Category:</span>
                        <div className="font-medium">{course.category?.name_en || 'None'}</div>
                    </div>
                    <div>
                        <span className="text-gray-600">Level:</span>
                        <div className="font-medium capitalize">{course.level}</div>
                    </div>
                    <div>
                        <span className="text-gray-600">Price:</span>
                        <div className="font-medium">{course.price ? `$${course.price}` : 'Free'}</div>
                    </div>
                    <div>
                        <span className="text-gray-600">Language:</span>
                        <div className="font-medium capitalize">{course.language}</div>
                    </div>
                    <div>
                        <span className="text-gray-600">Status:</span>
                        <div>
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                course.is_published
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-gray-100 text-gray-800'
                            }`}>
                                {course.is_published ? 'Published' : 'Draft'}
                            </span>
                        </div>
                    </div>
                </div>

                {course.short_description_en && (
                    <div className="mt-4 pt-4 border-t">
                        <p className="text-gray-700">{course.short_description_en}</p>
                    </div>
                )}
            </Card>

            {/* Curriculum */}
            <Card>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Course Curriculum</h2>
                    <Button onClick={() => setShowModuleForm(true)}>
                        Add Module
                    </Button>
                </div>

                {showModuleForm && (
                    <ModuleForm
                        courseId={course.id}
                        module={editingModule}
                        onCancel={() => {
                            setShowModuleForm(false);
                            setEditingModule(null);
                        }}
                    />
                )}

                {course.modules?.length > 0 ? (
                    <div className="space-y-2 mt-4">
                        {course.modules.map((module, index) => (
                            <ModuleItem
                                key={module.id}
                                module={module}
                                index={index}
                                courseId={course.id}
                                isExpanded={expandedModules[module.id]}
                                onToggle={() => toggleModule(module.id)}
                                onEdit={() => {
                                    setEditingModule(module);
                                    setShowModuleForm(true);
                                }}
                            />
                        ))}
                    </div>
                ) : (
                    <Alert variant="info" className="mt-4">
                        No modules yet. Click "Add Module" to create your first module.
                    </Alert>
                )}
            </Card>

            {/* Danger Zone */}
            <Card className="mt-6 border-red-200">
                <h2 className="text-lg font-semibold text-red-600 mb-4">Danger Zone</h2>
                <div className="flex justify-between items-center">
                    <div>
                        <p className="font-medium">Delete this course</p>
                        <p className="text-sm text-gray-600">Once deleted, it cannot be recovered.</p>
                    </div>
                    <Button variant="danger" onClick={handleDelete}>
                        Delete Course
                    </Button>
                </div>
            </Card>
        </AdminLayout>
    );
}

function ModuleForm({ courseId, module, onCancel }) {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        title_uk: module?.title_uk || '',
        title_en: module?.title_en || '',
        description_uk: module?.description_uk || '',
        description_en: module?.description_en || '',
        position: module?.position || 0,
        is_published: module?.is_published ?? true,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (module) {
            put(`/admin/courses/${courseId}/modules/${module.id}`, {
                onSuccess: () => {
                    reset();
                    onCancel();
                }
            });
        } else {
            post(`/admin/courses/${courseId}/modules`, {
                onSuccess: () => {
                    reset();
                    onCancel();
                }
            });
        }
    };

    return (
        <div className="border rounded-lg p-4 bg-gray-50 mb-4">
            <h3 className="font-semibold mb-4">{module ? 'Edit Module' : 'New Module'}</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        label="Title (English)"
                        value={data.title_en}
                        onChange={(e) => setData('title_en', e.target.value)}
                        error={errors.title_en}
                        required
                    />

                    <Input
                        label="Title (Ukrainian)"
                        value={data.title_uk}
                        onChange={(e) => setData('title_uk', e.target.value)}
                        error={errors.title_uk}
                        required
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Textarea
                        label="Description (English)"
                        value={data.description_en}
                        onChange={(e) => setData('description_en', e.target.value)}
                        error={errors.description_en}
                        rows={3}
                    />

                    <Textarea
                        label="Description (Ukrainian)"
                        value={data.description_uk}
                        onChange={(e) => setData('description_uk', e.target.value)}
                        error={errors.description_uk}
                        rows={3}
                    />
                </div>

                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        id="is_published"
                        checked={data.is_published}
                        onChange={(e) => setData('is_published', e.target.checked)}
                        className="rounded border-gray-300"
                    />
                    <label htmlFor="is_published" className="text-sm font-medium">
                        Published
                    </label>
                </div>

                <div className="flex gap-2">
                    <Button type="submit" disabled={processing}>
                        {processing ? 'Saving...' : (module ? 'Update' : 'Create')}
                    </Button>
                    <Button type="button" variant="secondary" onClick={onCancel}>
                        Cancel
                    </Button>
                </div>
            </form>
        </div>
    );
}

function ModuleItem({ module, index, courseId, isExpanded, onToggle, onEdit }) {
    const [showLessonForm, setShowLessonForm] = useState(false);

    const handleDelete = () => {
        if (confirm(`Delete module "${module.title_en}"?`)) {
            router.delete(`/admin/courses/${courseId}/modules/${module.id}`);
        }
    };

    return (
        <div className="border rounded-lg overflow-hidden">
            <div className="bg-gray-50 p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                        <button
                            onClick={onToggle}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <svg
                                className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>

                        <div className="flex-1">
                            <h3 className="font-semibold">
                                Module {index + 1}: {module.title_en}
                            </h3>
                            {module.lessons && (
                                <p className="text-sm text-gray-600">
                                    {module.lessons.length} lesson{module.lessons.length !== 1 ? 's' : ''}
                                    {!module.is_published && (
                                        <span className="ml-2 px-2 py-0.5 bg-gray-200 text-gray-700 text-xs rounded">
                                            Draft
                                        </span>
                                    )}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={onEdit}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                            Edit
                        </button>
                        <button
                            onClick={handleDelete}
                            className="text-red-600 hover:text-red-800 text-sm font-medium"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>

            {isExpanded && (
                <div className="p-4 bg-white border-t">
                    {showLessonForm && (
                        <LessonForm
                            courseId={courseId}
                            moduleId={module.id}
                            onCancel={() => setShowLessonForm(false)}
                        />
                    )}

                    <div className="mb-4">
                        <Button size="sm" onClick={() => setShowLessonForm(true)}>
                            Add Lesson
                        </Button>
                    </div>

                    {module.lessons?.length > 0 ? (
                        <div className="space-y-2">
                            {module.lessons.map((lesson, lessonIndex) => (
                                <LessonItem
                                    key={lesson.id}
                                    lesson={lesson}
                                    index={lessonIndex}
                                    courseId={courseId}
                                    moduleId={module.id}
                                />
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-gray-500">No lessons yet.</p>
                    )}
                </div>
            )}
        </div>
    );
}

function LessonForm({ courseId, moduleId, lesson, onCancel }) {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        title_uk: lesson?.title_uk || '',
        title_en: lesson?.title_en || '',
        description_uk: lesson?.description_uk || '',
        description_en: lesson?.description_en || '',
        duration_minutes: lesson?.duration_minutes || 0,
        is_published: lesson?.is_published ?? true,
        is_free: lesson?.is_free ?? false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (lesson) {
            put(`/admin/courses/${courseId}/modules/${moduleId}/lessons/${lesson.id}`, {
                onSuccess: () => {
                    reset();
                    onCancel();
                }
            });
        } else {
            post(`/admin/courses/${courseId}/modules/${moduleId}/lessons`, {
                onSuccess: () => {
                    reset();
                    onCancel();
                }
            });
        }
    };

    return (
        <div className="border rounded-lg p-4 bg-blue-50 mb-4">
            <h4 className="font-semibold mb-4">{lesson ? 'Edit Lesson' : 'New Lesson'}</h4>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        label="Title (English)"
                        value={data.title_en}
                        onChange={(e) => setData('title_en', e.target.value)}
                        error={errors.title_en}
                        required
                    />

                    <Input
                        label="Title (Ukrainian)"
                        value={data.title_uk}
                        onChange={(e) => setData('title_uk', e.target.value)}
                        error={errors.title_uk}
                        required
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Textarea
                        label="Description (English)"
                        value={data.description_en}
                        onChange={(e) => setData('description_en', e.target.value)}
                        error={errors.description_en}
                        rows={2}
                    />

                    <Textarea
                        label="Description (Ukrainian)"
                        value={data.description_uk}
                        onChange={(e) => setData('description_uk', e.target.value)}
                        error={errors.description_uk}
                        rows={2}
                    />
                </div>

                <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="is_published_lesson"
                            checked={data.is_published}
                            onChange={(e) => setData('is_published', e.target.checked)}
                            className="rounded border-gray-300"
                        />
                        <label htmlFor="is_published_lesson" className="text-sm font-medium">
                            Published
                        </label>
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="is_free"
                            checked={data.is_free}
                            onChange={(e) => setData('is_free', e.target.checked)}
                            className="rounded border-gray-300"
                        />
                        <label htmlFor="is_free" className="text-sm font-medium">
                            Free Preview
                        </label>
                    </div>
                </div>

                <div className="flex gap-2">
                    <Button type="submit" disabled={processing} size="sm">
                        {processing ? 'Saving...' : (lesson ? 'Update' : 'Create')}
                    </Button>
                    <Button type="button" variant="secondary" size="sm" onClick={onCancel}>
                        Cancel
                    </Button>
                </div>
            </form>
        </div>
    );
}

function LessonItem({ lesson, index, courseId, moduleId }) {
    const [isEditing, setIsEditing] = useState(false);

    const handleDelete = () => {
        if (confirm(`Delete lesson "${lesson.title_en}"?`)) {
            router.delete(`/admin/courses/${courseId}/modules/${moduleId}/lessons/${lesson.id}`);
        }
    };

    if (isEditing) {
        return (
            <LessonForm
                courseId={courseId}
                moduleId={moduleId}
                lesson={lesson}
                onCancel={() => setIsEditing(false)}
            />
        );
    }

    return (
        <div className="flex items-center justify-between p-3 bg-white border rounded hover:bg-gray-50">
            <div className="flex-1">
                <div className="font-medium text-sm">
                    {index + 1}. {lesson.title_en}
                    {lesson.is_free && (
                        <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded">
                            Free Preview
                        </span>
                    )}
                    {!lesson.is_published && (
                        <span className="ml-2 px-2 py-0.5 bg-gray-200 text-gray-700 text-xs rounded">
                            Draft
                        </span>
                    )}
                </div>
                {lesson.contents && (
                    <p className="text-xs text-gray-500 mt-1">
                        {lesson.contents.length} content block{lesson.contents.length !== 1 ? 's' : ''}
                    </p>
                )}
            </div>

            <div className="flex gap-2">
                <Link
                    href={`/admin/courses/${courseId}/lessons/${lesson.id}/contents`}
                    className="text-green-600 hover:text-green-800 text-sm font-medium"
                >
                    Content
                </Link>
                <button
                    onClick={() => setIsEditing(true)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                    Edit
                </button>
                <button
                    onClick={handleDelete}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}