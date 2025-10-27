import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';

export default function MarkdownEditor({ value, onChange, error, label, required, height = 'h-96' }) {
    const [activeTab, setActiveTab] = useState('edit'); // 'edit' or 'preview'

    return (
        <div className="mb-4">
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}

            {/* Tabs */}
            <div className="border border-gray-300 rounded-t-lg bg-gray-50">
                <div className="flex border-b border-gray-300">
                    <button
                        type="button"
                        onClick={() => setActiveTab('edit')}
                        className={`px-4 py-2 text-sm font-medium ${
                            activeTab === 'edit'
                                ? 'bg-white text-gray-900 border-b-2 border-blue-600'
                                : 'text-gray-600 hover:text-gray-900'
                        }`}
                    >
                        Edit
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab('preview')}
                        className={`px-4 py-2 text-sm font-medium ${
                            activeTab === 'preview'
                                ? 'bg-white text-gray-900 border-b-2 border-blue-600'
                                : 'text-gray-600 hover:text-gray-900'
                        }`}
                    >
                        Preview
                    </button>
                </div>

                {/* Markdown Help */}
                {activeTab === 'edit' && (
                    <div className="px-4 py-2 text-xs text-gray-600 bg-gray-50 border-b border-gray-200">
                        <div className="flex gap-4 flex-wrap">
                            <span><code className="bg-gray-200 px-1 rounded">**bold**</code></span>
                            <span><code className="bg-gray-200 px-1 rounded">*italic*</code></span>
                            <span><code className="bg-gray-200 px-1 rounded"># Heading</code></span>
                            <span><code className="bg-gray-200 px-1 rounded">[link](url)</code></span>
                            <span><code className="bg-gray-200 px-1 rounded">![image](url)</code></span>
                            <span><code className="bg-gray-200 px-1 rounded">```code```</code></span>
                        </div>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className={`border border-t-0 border-gray-300 rounded-b-lg ${error ? 'border-red-500' : ''}`}>
                {activeTab === 'edit' ? (
                    <textarea
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        className={`w-full ${height} p-4 font-mono text-sm resize-none focus:outline-none rounded-b-lg`}
                        placeholder="Write your markdown content here..."
                    />
                ) : (
                    <div className={`${height} p-4 overflow-auto prose max-w-none`}>
                        {value ? (
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                rehypePlugins={[rehypeHighlight, rehypeRaw]}
                            >
                                {value}
                            </ReactMarkdown>
                        ) : (
                            <p className="text-gray-400 italic">Nothing to preview</p>
                        )}
                    </div>
                )}
            </div>

            {error && (
                <p className="mt-1 text-sm text-red-500">{error}</p>
            )}

            {activeTab === 'edit' && (
                <p className="mt-2 text-sm text-gray-500">
                    Supports GitHub Flavored Markdown with syntax highlighting
                </p>
            )}
        </div>
    );
}
