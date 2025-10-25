import { Head, Link, useForm, router } from '@inertiajs/react';
import CabinetLayout from '../../../../Layouts/CabinetLayout';

export default function Photos({ advert }) {
    const { data, setData, post, processing, errors } = useForm({
        files: [],
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(`/cabinet/adverts/${advert.id}/photos`, {
            forceFormData: true,
        });
    };

    const handleFileChange = (e) => {
        setData('files', Array.from(e.target.files));
    };

    const handleDeletePhoto = (photo) => {
        if (confirm('Are you sure you want to delete this photo?')) {
            router.delete(`/cabinet/adverts/${advert.id}/photos/${photo.id}`);
        }
    };

    return (
        <CabinetLayout>
            <Head title={`Edit Photos - ${advert.title}`} />

            <div className="max-w-5xl mx-auto">
                <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                        <Link
                            href={`/adverts/${advert.id}`}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Edit Photos
                        </h1>
                    </div>
                </div>

                {/* Existing Photos */}
                {advert.photos && advert.photos.length > 0 && (
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Current Photos</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {advert.photos.map((photo) => (
                                <div key={photo.id} className="relative group">
                                    <img
                                        src={`/storage/${photo.file}`}
                                        alt="Advert photo"
                                        className="w-full h-40 object-cover rounded-lg border border-gray-200"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleDeletePhoto(photo)}
                                        className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
                                        title="Delete photo"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Upload New Photos */}
                <form onSubmit={handleSubmit}>
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-6">Upload New Photos</h2>

                        <div>
                            <label htmlFor="files" className="block text-sm font-medium text-gray-700 mb-1">
                                Select Photos
                            </label>
                            <input
                                type="file"
                                id="files"
                                name="files[]"
                                multiple
                                accept="image/*"
                                onChange={handleFileChange}
                                className={`mt-1 block w-full text-sm text-gray-500
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-md file:border-0
                                    file:text-sm file:font-medium
                                    file:bg-blue-50 file:text-blue-700
                                    hover:file:bg-blue-100
                                    ${errors.files ? 'border-red-300' : 'border-gray-300'}
                                `}
                            />
                            {errors.files && (
                                <p className="mt-1 text-sm text-red-600">{errors.files}</p>
                            )}
                            <p className="mt-2 text-sm text-gray-500">
                                You can select multiple image files. Supported formats: JPG, PNG, GIF.
                            </p>
                        </div>

                        {/* File Preview */}
                        {data.files.length > 0 && (
                            <div className="mt-4">
                                <p className="text-sm font-medium text-gray-700 mb-2">
                                    Selected files ({data.files.length}):
                                </p>
                                <ul className="text-sm text-gray-600 space-y-1">
                                    {Array.from(data.files).map((file, index) => (
                                        <li key={index} className="flex items-center gap-2">
                                            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            {file.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between mt-6">
                        <Link
                            href={`/adverts/${advert.id}`}
                            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Cancel
                        </Link>

                        <button
                            type="submit"
                            disabled={processing || data.files.length === 0}
                            className={`inline-flex items-center px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                                processing || data.files.length === 0
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
                                    Upload Photos
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </CabinetLayout>
    );
}
