import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

export default function Welcome({ course }) {
    return (
        <AppLayout>
            <Head title="Python курси" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {course ? (
                    <>
                        {/* Hero */}
                        <div className="text-center mb-12">
                            {course.thumbnail && (
                                <img
                                    src={course.thumbnail}
                                    alt={course.title_uk || course.title_en}
                                    className="w-full max-h-72 object-cover rounded-xl mb-8"
                                />
                            )}
                            <h1 className="text-4xl font-bold text-gray-900 mb-4">
                                {course.title_uk || course.title_en}
                            </h1>
                            <p className="text-xl text-gray-600 mb-8">
                                {course.short_description_uk || course.short_description_en}
                            </p>
                            <div className="flex justify-center gap-4">
                                <Link
                                    href={`/courses/${course.slug}`}
                                    className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold text-lg"
                                >
                                    Детальніше про курс
                                </Link>
                                <Link
                                    href="/courses"
                                    className="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 font-semibold text-lg"
                                >
                                    Всі курси
                                </Link>
                            </div>
                        </div>

                        {/* Course meta */}
                        <div className="grid grid-cols-3 gap-6 bg-white rounded-xl shadow-md p-6 text-center">
                            <div>
                                <div className="text-2xl font-bold text-blue-600">
                                    {course.level === 'beginner' ? 'Початківець' : course.level === 'intermediate' ? 'Середній' : 'Просунутий'}
                                </div>
                                <div className="text-gray-500 text-sm mt-1">Рівень</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-blue-600">
                                    {course.duration_minutes ? `${Math.round(course.duration_minutes / 60)} год` : '—'}
                                </div>
                                <div className="text-gray-500 text-sm mt-1">Тривалість</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-blue-600">
                                    {course.price ? `${course.price} ₴` : 'Безкоштовно'}
                                </div>
                                <div className="text-gray-500 text-sm mt-1">Ціна</div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="text-center py-24">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">Скоро буде курс</h1>
                        <p className="text-gray-600 text-lg">Готується новий Python курс. Слідкуйте за оновленнями.</p>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
