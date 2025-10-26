import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import AppLayout from '../../Layouts/AppLayout';
import { Card } from '../../Components';

export default function Show({ course, enrollment, isEnrolled }) {
    const priceDisplay = () => {
        if (course.price === 0 || course.price === '0.00') {
            return <span className="text-2xl font-bold text-green-600">Free</span>;
        }
        return <span className="text-2xl font-bold text-gray-900">${course.price}</span>;
    };

    const enrolledCount = course.enrollments?.length || 0;

    return (
        <AppLayout>
            <Head title={course.title} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Breadcrumb */}
                <nav className="mb-6">
                    <ol className="flex items-center space-x-2 text-sm text-gray-500">
                        <li>
                            <Link href="/" className="hover:text-gray-700">Home</Link>
                        </li>
                        <li>/</li>
                        <li>
                            <Link href="/courses" className="hover:text-gray-700">Courses</Link>
                        </li>
                        <li>/</li>
                        <li className="text-gray-900 font-medium">{course.title}</li>
                    </ol>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {/* Course Header */}
                        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                            <div className="flex items-center gap-2 mb-4">
                                {course.category && (
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                        {course.category.name}
                                    </span>
                                )}
                                {course.level && (
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                                        {course.level}
                                    </span>
                                )}
                            </div>

                            <h1 className="text-3xl font-bold text-gray-900 mb-4">
                                {course.title}
                            </h1>

                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
                                <div className="flex items-center gap-1">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                    <span>{enrolledCount} students enrolled</span>
                                </div>
                                {course.duration && (
                                    <div className="flex items-center gap-1">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span>{course.duration}</span>
                                    </div>
                                )}
                            </div>

                            {course.description && (
                                <div className="prose max-w-none">
                                    <h2 className="text-xl font-semibold text-gray-900 mb-3">
                                        Course Description
                                    </h2>
                                    <div className="text-gray-700 whitespace-pre-wrap">
                                        {course.description}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* What You'll Learn */}
                        {course.objectives && (
                            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                                    What you'll learn
                                </h2>
                                <ul className="space-y-2">
                                    {course.objectives.split('\n').filter(obj => obj.trim()).map((objective, index) => (
                                        <li key={index} className="flex items-start gap-2">
                                            <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-gray-700">{objective.trim()}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Course Curriculum */}
                        {course.published_modules && course.published_modules.length > 0 && (
                            <CourseCurriculum
                                modules={course.published_modules}
                                enrollment={enrollment}
                                isEnrolled={isEnrolled}
                            />
                        )}

                        {/* Requirements */}
                        {course.requirements && (
                            <div className="bg-white rounded-lg shadow-sm p-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                                    Requirements
                                </h2>
                                <ul className="space-y-2">
                                    {course.requirements.split('\n').filter(req => req.trim()).map((requirement, index) => (
                                        <li key={index} className="flex items-start gap-2">
                                            <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-gray-700">{requirement.trim()}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
                            {/* Price */}
                            <div className="mb-6">
                                {priceDisplay()}
                            </div>

                            {/* Enroll Button */}
                            <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors mb-4">
                                Enroll Now
                            </button>

                            <div className="text-center text-sm text-gray-500 mb-6">
                                30-day money-back guarantee
                            </div>

                            {/* Course Info */}
                            <div className="border-t pt-4 space-y-3">
                                <h3 className="font-semibold text-gray-900 mb-3">
                                    This course includes:
                                </h3>

                                {course.duration && (
                                    <div className="flex items-center gap-2 text-sm text-gray-700">
                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                        </svg>
                                        <span>{course.duration} on-demand video</span>
                                    </div>
                                )}

                                <div className="flex items-center gap-2 text-sm text-gray-700">
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    <span>Full lifetime access</span>
                                </div>

                                <div className="flex items-center gap-2 text-sm text-gray-700">
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                    </svg>
                                    <span>Access on mobile and desktop</span>
                                </div>

                                <div className="flex items-center gap-2 text-sm text-gray-700">
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>Certificate of completion</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

function CourseCurriculum({ modules, enrollment, isEnrolled }) {
    const [expandedModules, setExpandedModules] = useState(() =>
        modules.reduce((acc, module) => ({ ...acc, [module.id]: true }), {})
    );

    const toggleModule = (moduleId) => {
        setExpandedModules(prev => ({ ...prev, [moduleId]: !prev[moduleId] }));
    };

    const getLessonProgress = (lessonId) => {
        if (!enrollment || !enrollment.lesson_progress) return null;
        return enrollment.lesson_progress.find(p => p.lesson_id === lessonId);
    };

    const getContentIcon = (type) => {
        switch (type) {
            case 'video':
                return (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                );
            case 'text':
                return (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                );
            case 'image':
                return (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                );
            case 'quiz':
                return (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                );
            default:
                return (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                );
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Course Curriculum
            </h2>

            <div className="space-y-2">
                {modules.map((module, moduleIndex) => (
                    <div key={module.id} className="border border-gray-200 rounded-lg overflow-hidden">
                        <button
                            onClick={() => toggleModule(module.id)}
                            className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 flex items-center justify-between transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <svg
                                    className={`w-5 h-5 text-gray-500 transition-transform ${
                                        expandedModules[module.id] ? 'rotate-90' : ''
                                    }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                                <div className="text-left">
                                    <h3 className="font-semibold text-gray-900">
                                        Module {moduleIndex + 1}: {module.title}
                                    </h3>
                                    {module.published_lessons && (
                                        <p className="text-sm text-gray-600">
                                            {module.published_lessons.length} lessons
                                            {module.duration_minutes > 0 && ` · ${module.duration_minutes} min`}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </button>

                        {expandedModules[module.id] && module.published_lessons && (
                            <div className="border-t border-gray-200">
                                {module.published_lessons.map((lesson, lessonIndex) => {
                                    const progress = getLessonProgress(lesson.id);
                                    const isCompleted = progress?.status === 'completed';
                                    const isAccessible = isEnrolled || lesson.is_free;

                                    return (
                                        <div
                                            key={lesson.id}
                                            className="px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                                        >
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2">
                                                        {isCompleted && (
                                                            <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                            </svg>
                                                        )}
                                                        <span className="text-gray-900">{lesson.title}</span>
                                                        {lesson.is_free && (
                                                            <span className="px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 rounded">
                                                                Free Preview
                                                            </span>
                                                        )}
                                                        {!isAccessible && (
                                                            <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                                            </svg>
                                                        )}
                                                    </div>

                                                    {lesson.contents && lesson.contents.length > 0 && (
                                                        <div className="mt-2 flex flex-wrap gap-3 text-xs text-gray-500">
                                                            {lesson.contents.map((content, idx) => (
                                                                <div key={idx} className="flex items-center gap-1">
                                                                    {getContentIcon(content.type)}
                                                                    <span className="capitalize">{content.type}</span>
                                                                    {content.duration_seconds && (
                                                                        <span>({Math.ceil(content.duration_seconds / 60)} min)</span>
                                                                    )}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>

                                                {lesson.duration_minutes > 0 && (
                                                    <span className="text-sm text-gray-500 flex-shrink-0">
                                                        {lesson.duration_minutes} min
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
