export default function Textarea({
    label,
    error,
    required = false,
    rows = 4,
    className = '',
    id,
    ...props
}) {
    const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;

    const textareaClasses = `mt-1 block w-full rounded-md shadow-sm ${
        error
            ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
    } ${className}`;

    return (
        <div>
            {label && (
                <label htmlFor={textareaId} className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            <textarea
                id={textareaId}
                rows={rows}
                className={textareaClasses}
                {...props}
            />
            {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
        </div>
    );
}
