import BackButton from './BackButton';

export default function PageHeader({ title, subtitle, backHref, children }) {
    return (
        <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
                {backHref && <BackButton href={backHref} />}
                <h1 className="text-2xl font-bold text-gray-900">
                    {title}
                </h1>
            </div>
            {subtitle && (
                <p className="text-gray-600 mt-2">
                    {subtitle}
                </p>
            )}
            {children}
        </div>
    );
}