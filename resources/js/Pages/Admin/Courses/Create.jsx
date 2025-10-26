import { Head, useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import AdminLayout from '../../../Layouts/AdminLayout';
import { Alert, Button, Card, Input, PageHeader, Select, Textarea } from '../../../Components';

export default function Create({ categories, instructors, tags, levels, languages }) {
    const { data, setData, post, processing, errors } = useForm({
        instructor_id: '',
        category_id: '',
        title_uk: '',
        title_en: '',
        slug: '',
        short_description_uk: '',
        short_description_en: '',
        description_uk: '',
        description_en: '',
        level: 'beginner',
        language: 'both',
        price: '',
        thumbnail: '',
        trailer_video_url: '',
        tags: [],
    });

    // Auto-generate slug from English title
    useEffect(() => {
        if (data.title_en && !data.slug) {
            const slug = data.title_en
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
            setData('slug', slug);
        }
    }, [data.title_en]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/courses');
    };

    const handleTagToggle = (tagId) => {
        if (data.tags.includes(tagId)) {
            setData('tags', data.tags.filter(id => id !== tagId));
        } else {
            setData('tags', [...data.tags, tagId]);
        }
    };

    return (
        <AdminLayout>
            <Head title="Create Course" />

            <PageHeader
                title="Create Course"
                backHref="/admin/courses"
            />

            <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                    {/* Basic Information */}
                    <Card>
                        <h2 className="text-lg font-semibold mb-4">Basic Information</h2>

                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Select
                                    label="Instructor"
                                    value={data.instructor_id}
                                    onChange={(e) => setData('instructor_id', e.target.value)}
                                    error={errors.instructor_id}
                                    required
                                >
                                    <option value="">Select instructor</option>
                                    {instructors.map(inst => (
                                        <option key={inst.id} value={inst.id}>{inst.name}</option>
                                    ))}
                                </Select>

                                <Select
                                    label="Category"
                                    value={data.category_id}
                                    onChange={(e) => setData('category_id', e.target.value)}
                                    error={errors.category_id}
                                >
                                    <option value="">No category</option>
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.name_en}</option>
                                    ))}
                                </Select>
                            </div>

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

                            <Input
                                label="Slug"
                                value={data.slug}
                                onChange={(e) => setData('slug', e.target.value)}
                                error={errors.slug}
                                help="URL-friendly version of the title"
                                required
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Textarea
                                    label="Short Description (English)"
                                    value={data.short_description_en}
                                    onChange={(e) => setData('short_description_en', e.target.value)}
                                    error={errors.short_description_en}
                                    rows={3}
                                />

                                <Textarea
                                    label="Short Description (Ukrainian)"
                                    value={data.short_description_uk}
                                    onChange={(e) => setData('short_description_uk', e.target.value)}
                                    error={errors.short_description_uk}
                                    rows={3}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Textarea
                                    label="Full Description (English)"
                                    value={data.description_en}
                                    onChange={(e) => setData('description_en', e.target.value)}
                                    error={errors.description_en}
                                    rows={6}
                                />

                                <Textarea
                                    label="Full Description (Ukrainian)"
                                    value={data.description_uk}
                                    onChange={(e) => setData('description_uk', e.target.value)}
                                    error={errors.description_uk}
                                    rows={6}
                                />
                            </div>
                        </div>
                    </Card>

                    {/* Course Settings */}
                    <Card>
                        <h2 className="text-lg font-semibold mb-4">Course Settings</h2>

                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <Select
                                    label="Level"
                                    value={data.level}
                                    onChange={(e) => setData('level', e.target.value)}
                                    error={errors.level}
                                    required
                                >
                                    {Object.entries(levels).map(([key, label]) => (
                                        <option key={key} value={key}>{label}</option>
                                    ))}
                                </Select>

                                <Select
                                    label="Language"
                                    value={data.language}
                                    onChange={(e) => setData('language', e.target.value)}
                                    error={errors.language}
                                    required
                                >
                                    {Object.entries(languages).map(([key, label]) => (
                                        <option key={key} value={key}>{label}</option>
                                    ))}
                                </Select>

                                <Input
                                    label="Price (USD)"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    value={data.price}
                                    onChange={(e) => setData('price', e.target.value)}
                                    error={errors.price}
                                    help="Leave empty for free course"
                                />
                            </div>
                        </div>
                    </Card>

                    {/* Media */}
                    <Card>
                        <h2 className="text-lg font-semibold mb-4">Media</h2>

                        <div className="space-y-4">
                            <Input
                                label="Thumbnail URL"
                                value={data.thumbnail}
                                onChange={(e) => setData('thumbnail', e.target.value)}
                                error={errors.thumbnail}
                                help="URL to course thumbnail image"
                            />

                            <Input
                                label="Trailer Video URL"
                                value={data.trailer_video_url}
                                onChange={(e) => setData('trailer_video_url', e.target.value)}
                                error={errors.trailer_video_url}
                                help="YouTube or Vimeo URL for course trailer"
                            />
                        </div>
                    </Card>

                    {/* Tags */}
                    {tags.length > 0 && (
                        <Card>
                            <h2 className="text-lg font-semibold mb-4">Tags</h2>

                            <div className="flex flex-wrap gap-2">
                                {tags.map(tag => (
                                    <button
                                        key={tag.id}
                                        type="button"
                                        onClick={() => handleTagToggle(tag.id)}
                                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                                            data.tags.includes(tag.id)
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                        }`}
                                    >
                                        {tag.name_en}
                                    </button>
                                ))}
                            </div>
                        </Card>
                    )}

                    {/* Info Alert */}
                    <Alert variant="info">
                        After creating the course, you can add modules, lessons, and content on the course details page.
                    </Alert>

                    {/* Submit */}
                    <div className="flex justify-end gap-3">
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => window.history.back()}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Creating...' : 'Create Course'}
                        </Button>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}