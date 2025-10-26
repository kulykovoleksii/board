export default function Select({
    label,
    error,
    required = false,
    options = [],
    placeholder,
    className = '',
    id,
    children,
    ...props
}) {
    const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;

    const selectClasses = `mt-1 block w-full rounded-md shadow-sm ${
        error
            ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
    } ${className}`;

    return (
        <div>
            {label && (
                <label htmlFor={selectId} className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            <select
                id={selectId}
                className={selectClasses}
                {...props}
            >
                {placeholder && <option value="">{placeholder}</option>}
                {children || options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
        </div>
    );
}