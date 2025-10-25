import { Head, Link, useForm } from '@inertiajs/react';
import CabinetLayout from '../../../Layouts/CabinetLayout';

export default function File({ banner, formats }) {
    const { data, setData, post, processing, errors } = useForm({
        format: banner.format || (formats && formats.length > 0 ? formats[0] : ''),
        file: null,
        _method: 'PUT',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(`/cabinet/banners/${banner.id}/file`);
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setData('file', e.target.files[0]);
        }
    };

    return (
        <CabinetLayout activeTab="banners">
            <Head title="Change Banner File" />

            <div className="max-w-3xl mx-auto">
                <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                        <Link
                            href={`/cabinet/banners/${banner.id}`}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-900">Change Banner File</h1>
                    </div>
                </div>

                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
                        {/* Current Banner Preview */}
                        {banner.file && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Current Banner
                                </label>
                                <div className="flex justify-center p-4 border border-gray-200 rounded-lg bg-gray-50">
                                    <img
                                        src={`/storage/${banner.file}`}
                                        alt={banner.name}
                                        className="max-w-full h-auto rounded shadow-sm"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Format */}
                        <div>
                            <label htmlFor="format" className="block text-sm font-medium text-gray-700 mb-1">
                                Format <span className="text-red-500">*</span>
                            </label>
                            <select
                                id="format"
                                value={data.format}
                                onChange={(e) => setData('format', e.target.value)}
                                className={`mt-1 block w-full rounded-md shadow-sm ${
                                    errors.format
                                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                                        : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                                }`}
                                required
                            >
                                {formats && formats.map((format) => (
                                    <option key={format} value={format}>
                                        {format}
                                    </option>
                                ))}
                            </select>
                            {errors.format && (
                                <p className="mt-1 text-sm text-red-600">{errors.format}</p>
                            )}
                        </div>

                        {/* File Upload */}
                        <div>
                            <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-1">
                                Banner File <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="file"
                                id="file"
                                onChange={handleFileChange}
                                className={`mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 ${
                                    errors.file ? 'border-red-300' : ''
                                }`}
                                accept="image/*"
                                required
                            />
                            {errors.file && (
                                <p className="mt-1 text-sm text-red-600">{errors.file}</p>
                            )}
                            <p className="mt-2 text-sm text-gray-500">
                                Upload an image file for your banner. Make sure the dimensions match the selected format.
                            </p>
                        </div>

                        {/* Info Box */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <div className="flex">
                                <svg className="h-5 w-5 text-blue-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                </svg>
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-blue-800">
                                        File Requirements
                                    </h3>
                                    <div className="mt-2 text-sm text-blue-700">
                                        <ul className="list-disc list-inside space-y-1">
                                            <li>Select the appropriate format for your banner placement</li>
                                            <li>Upload a high-quality image matching the format dimensions</li>
                                            <li>Supported formats: JPG, PNG, GIF</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between mt-6">
                        <Link
                            href={`/cabinet/banners/${banner.id}`}
                            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Cancel
                        </Link>

                        <button
                            type="submit"
                            disabled={processing}
                            className={`inline-flex items-center px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                                processing
                                    ? 'bg-blue-400 cursor-not-allowed'
                                    : 'bg-blue-600 hover:bg-blue-700'
                            }`}
                        >
                            {processing ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Uploading...
                                </>
                            ) : (
                                <>
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                    </svg>
                                    Upload File
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </CabinetLayout>
    );
}