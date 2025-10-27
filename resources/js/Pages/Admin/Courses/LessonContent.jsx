import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '../../../Layouts/AdminLayout';
import { Alert, Button, Card, Input, MarkdownEditor, PageHeader, Select, Textarea } from '../../../Components';

export default function LessonContent({ course, lesson, contentTypes }) {
    const [showContentForm, setShowContentForm] = useState(false);
    const [editingContent, setEditingContent] = useState(null);

    return (
        <AdminLayout>
            <Head title={`${lesson.title_en} - Content`} />

            <PageHeader
                title={`${lesson.title_en} - Content`}
                backHref={`/admin/courses/${course.id}`}
            />

            {/* Lesson Info */}
            <Card className="mb-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                    <div>
                        <span className="text-gray-600">Course:</span>
                        <div className="font-medium">{course.title_en}</div>
                    </div>
                    <div>
                        <span className="text-gray-600">Lesson:</span>
                        <div className="font-medium">{lesson.title_en}</div>
                    </div>
                    <div>
                        <span className="text-gray-600">Content Blocks:</span>
                        <div className="font-medium">{lesson.contents?.length || 0}</div>
                    </div>
                </div>

                {lesson.description_en && (
                    <div className="mt-4 pt-4 border-t">
                        <p className="text-sm text-gray-700">{lesson.description_en}</p>
                    </div>
                )}
            </Card>

            {/* Content Management */}
            <Card>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Lesson Content</h2>
                    <Button onClick={() => setShowContentForm(true)}>
                        Add Content Block
                    </Button>
                </div>

                {showContentForm && (
                    <ContentForm
                        courseId={course.id}
                        lessonId={lesson.id}
                        content={editingContent}
                        contentTypes={contentTypes}
                        onCancel={() => {
                            setShowContentForm(false);
                            setEditingContent(null);
                        }}
                    />
                )}

                {lesson.contents?.length > 0 ? (
                    <div className="space-y-3 mt-4">
                        {lesson.contents.map((content, index) => (
                            <ContentItem
                                key={content.id}
                                content={content}
                                index={index}
                                courseId={course.id}
                                lessonId={lesson.id}
                                contentTypes={contentTypes}
                                onEdit={() => {
                                    setEditingContent(content);
                                    setShowContentForm(true);
                                }}
                            />
                        ))}
                    </div>
                ) : (
                    <Alert variant="info" className="mt-4">
                        No content blocks yet. Click "Add Content Block" to create your first content.
                    </Alert>
                )}
            </Card>
        </AdminLayout>
    );
}

function ContentForm({ courseId, lessonId, content, contentTypes, onCancel }) {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        type: content?.type || 'text',
        content_uk: content?.content_uk || '',
        content_en: content?.content_en || '',
        markdown_uk: content?.markdown_uk || '',
        markdown_en: content?.markdown_en || '',
        file_path: content?.file_path || '',
        file_url: content?.file_url || '',
        thumbnail: content?.thumbnail || '',
        duration_seconds: content?.duration_seconds || '',
        file_name: content?.file_name || '',
        file_size: content?.file_size || '',
        mime_type: content?.mime_type || '',
        position: content?.position || 0,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (content) {
            put(`/admin/courses/${courseId}/lessons/${lessonId}/contents/${content.id}`, {
                onSuccess: () => {
                    reset();
                    onCancel();
                }
            });
        } else {
            post(`/admin/courses/${courseId}/lessons/${lessonId}/contents`, {
                onSuccess: () => {
                    reset();
                    onCancel();
                }
            });
        }
    };

    const isMarkdownFile = data.type === 'markdown_file';
    const isText = data.type === 'text';
    const isVideo = data.type === 'video';
    const isImage = data.type === 'image';
    const isFile = data.type === 'file';

    return (
        <div className="border rounded-lg p-6 bg-gray-50 mb-4">
            <h3 className="font-semibold mb-4">{content ? 'Edit Content Block' : 'New Content Block'}</h3>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Content Type */}
                <Select
                    label="Content Type"
                    value={data.type}
                    onChange={(e) => setData('type', e.target.value)}
                    error={errors.type}
                    required
                >
                    {Object.entries(contentTypes).map(([key, label]) => (
                        <option key={key} value={key}>{label}</option>
                    ))}
                </Select>

                {/* Markdown File Fields */}
                {isMarkdownFile && (
                    <div className="space-y-4">
                        <MarkdownEditor
                            label="Markdown Content (Ukrainian)"
                            value={data.markdown_uk}
                            onChange={(value) => setData('markdown_uk', value)}
                            error={errors.markdown_uk}
                            height="h-96"
                        />

                        <MarkdownEditor
                            label="Markdown Content (English)"
                            value={data.markdown_en}
                            onChange={(value) => setData('markdown_en', value)}
                            error={errors.markdown_en}
                            height="h-96"
                        />
                    </div>
                )}

                {/* Text Content Fields */}
                {isText && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Textarea
                            label="Content (Ukrainian)"
                            value={data.content_uk}
                            onChange={(e) => setData('content_uk', e.target.value)}
                            error={errors.content_uk}
                            rows={8}
                        />

                        <Textarea
                            label="Content (English)"
                            value={data.content_en}
                            onChange={(e) => setData('content_en', e.target.value)}
                            error={errors.content_en}
                            rows={8}
                        />
                    </div>
                )}

                {/* Video Fields */}
                {isVideo && (
                    <div className="space-y-4">
                        <Input
                            label="Video URL"
                            value={data.file_url}
                            onChange={(e) => setData('file_url', e.target.value)}
                            error={errors.file_url}
                            help="YouTube, Vimeo, or direct video URL"
                            required
                        />

                        <Input
                            label="Thumbnail URL"
                            value={data.thumbnail}
                            onChange={(e) => setData('thumbnail', e.target.value)}
                            error={errors.thumbnail}
                            help="Optional preview image"
                        />

                        <Input
                            label="Duration (seconds)"
                            type="number"
                            min="0"
                            value={data.duration_seconds}
                            onChange={(e) => setData('duration_seconds', e.target.value)}
                            error={errors.duration_seconds}
                        />
                    </div>
                )}

                {/* Image Fields */}
                {isImage && (
                    <div className="space-y-4">
                        <Input
                            label="Image URL"
                            value={data.file_url}
                            onChange={(e) => setData('file_url', e.target.value)}
                            error={errors.file_url}
                            required
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Textarea
                                label="Caption (Ukrainian)"
                                value={data.content_uk}
                                onChange={(e) => setData('content_uk', e.target.value)}
                                error={errors.content_uk}
                                rows={2}
                            />

                            <Textarea
                                label="Caption (English)"
                                value={data.content_en}
                                onChange={(e) => setData('content_en', e.target.value)}
                                error={errors.content_en}
                                rows={2}
                            />
                        </div>
                    </div>
                )}

                {/* File Fields */}
                {isFile && (
                    <div className="space-y-4">
                        <Input
                            label="File URL"
                            value={data.file_url}
                            onChange={(e) => setData('file_url', e.target.value)}
                            error={errors.file_url}
                            required
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label="File Name"
                                value={data.file_name}
                                onChange={(e) => setData('file_name', e.target.value)}
                                error={errors.file_name}
                            />

                            <Input
                                label="MIME Type"
                                value={data.mime_type}
                                onChange={(e) => setData('mime_type', e.target.value)}
                                error={errors.mime_type}
                                help="e.g., application/pdf"
                            />
                        </div>
                    </div>
                )}

                {/* Position */}
                <Input
                    label="Position"
                    type="number"
                    min="0"
                    value={data.position}
                    onChange={(e) => setData('position', e.target.value)}
                    error={errors.position}
                    help="Order in which this content appears"
                />

                {/* Submit */}
                <div className="flex gap-2">
                    <Button type="submit" disabled={processing}>
                        {processing ? 'Saving...' : (content ? 'Update' : 'Create')}
                    </Button>
                    <Button type="button" variant="secondary" onClick={onCancel}>
                        Cancel
                    </Button>
                </div>
            </form>
        </div>
    );
}

function ContentItem({ content, index, courseId, lessonId, contentTypes, onEdit }) {
    const handleDelete = () => {
        if (confirm(`Delete this content block?`)) {
            router.delete(`/admin/courses/${courseId}/lessons/${lessonId}/contents/${content.id}`);
        }
    };

    const getContentPreview = () => {
        switch (content.type) {
            case 'text':
                return content.content_en?.substring(0, 100) || content.content_uk?.substring(0, 100) || 'No content';
            case 'markdown_file':
                return `Markdown file: ${content.file_path || 'Not yet saved'}`;
            case 'video':
                return `Video: ${content.file_url}`;
            case 'image':
                return `Image: ${content.file_url}`;
            case 'file':
                return `File: ${content.file_name || content.file_url}`;
            case 'quiz':
                return 'Quiz content';
            default:
                return 'Unknown content type';
        }
    };

    return (
        <div className="flex items-center justify-between p-4 bg-white border rounded hover:bg-gray-50">
            <div className="flex-1">
                <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-gray-500 min-w-[2rem]">
                        #{index + 1}
                    </span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded font-medium">
                        {contentTypes[content.type] || content.type}
                    </span>
                </div>
                <p className="text-sm text-gray-600 mt-2 ml-10">
                    {getContentPreview()}
                </p>
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
    );
}