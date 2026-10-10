import React from 'react';
import { Link } from '@inertiajs/react';

export default function Index({ flipbooks }) {
    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 p-8 font-sans">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8 border-b border-slate-800 pb-4">
                    <div>
                        <h1 className="text-3xl font-bold">PDF Flipbooks</h1>
                        <p className="text-slate-400 text-sm mt-1">
                            Manage and view your converted interactive flipbooks
                        </p>
                    </div>
                    <Link
                        href="/flipbooks/create"
                        className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-4 py-2 rounded-lg transition-colors shadow-md text-sm"
                    >
                        + Create New Flipbook
                    </Link>
                </div>

                {/* Empty State */}
                {flipbooks.length === 0 ? (
                    <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-12 text-center">
                        <p className="text-slate-400 text-lg mb-4">No flipbooks uploaded yet.</p>
                        <Link
                            href="/flipbooks/create"
                            className="inline-block bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
                        >
                            Upload Your First PDF
                        </Link>
                    </div>
                ) : (
                    /* Flipbook Grid */
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {flipbooks.map((book) => {
                            // Format thumbnail image path cleanly
                            const coverImage = book.page_images && book.page_images.length > 0
                                ? (book.page_images[0].startsWith('/') ? book.page_images[0] : `/${book.page_images[0]}`)
                                : null;

                            return (
                                <div
                                    key={book.id}
                                    className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden hover:border-blue-500/50 transition-all shadow-lg flex flex-col justify-between group"
                                >
                                    {/* Cover Thumbnail */}
                                    <div className="aspect-[3/4] bg-slate-950 overflow-hidden relative">
                                        {coverImage ? (
                                            <img
                                                src={coverImage}
                                                alt={book.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-slate-600">
                                                No Preview
                                            </div>
                                        )}
                                        <div className="absolute top-2 right-2 bg-slate-900/80 text-xs px-2 py-1 rounded border border-slate-700 font-medium text-slate-300 backdrop-blur-sm">
                                            {book.total_pages} {book.total_pages === 1 ? 'Page' : 'Pages'}
                                        </div>
                                    </div>

                                    {/* Info & View Action */}
                                    <div className="p-4">
                                        <h2 className="font-semibold text-base text-slate-100 truncate" title={book.title}>
                                            {book.title}
                                        </h2>
                                        <p className="text-xs text-slate-400 mt-1">
                                            Created: {new Date(book.created_at).toLocaleDateString()}
                                        </p>

                                        <div className="mt-4 pt-3 border-t border-slate-700/50">
                                            <Link
                                                href={`/flipbooks/${book.id}`}
                                                className="block w-full text-center bg-slate-700 hover:bg-blue-600 text-white py-2 rounded-lg text-sm font-medium transition-colors"
                                            >
                                                Open Flipbook
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}