import { useEffect, useState } from 'react';
import { openLibraryService } from '../services/openLibrary';
import type { RecentChange } from '../types/RecentChange';

interface BookDisplay {
    id: string;
    title: string;
    coverUrl: string | null;
    date: string;
    key: string;
}

const Home = () => {
    const [books, setBooks] = useState<BookDisplay[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAndEnrichBooks = async () => {
            try {
                const changes: RecentChange[] = await openLibraryService.getRecentChanges();
                const bookChanges = changes.filter(change =>
                    change.kind !== 'new-account' &&
                    change.kind !== 'delete-account' &&
                    change.changes[0]?.key &&
                    (change.changes[0].key.includes('/books/') || change.changes[0].key.includes('/works/'))
                );

                const top10 = bookChanges.slice(0, 10);

                const detailedBooksPromises = top10.map(async (change) => {
                    const bookKey = change.changes[0].key;
                    try {
                        const details = await openLibraryService.getBookDetails(bookKey);
                        const coverId = details.covers && details.covers.length > 0 ? details.covers[0] : null;
                        const coverUrl = coverId
                            ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
                            : null;

                        return {
                            id: change.id,
                            title: details.title || "UNTITLED DATA",
                            coverUrl: coverUrl,
                            date: change.timestamp,
                            key: bookKey
                        };
                    } catch (err) {
                        return null;
                    }
                });

                const results = await Promise.all(detailedBooksPromises);
                setBooks(results.filter((b): b is BookDisplay => b !== null));

            } catch (error) {
                console.error("Error :", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAndEnrichBooks();
    }, []);


    if (loading) return (
        <div className="p-12 text-center font-mono text-xl animate-pulse uppercase tracking-widest dark:text-neon">
             Initializing Data Stream...
        </div>
    );

    return (
        <div>

            <h1 className="font-display font-bold text-4xl md:text-5xl uppercase italic tracking-tighter mb-12 flex items-center gap-3 dark:text-white">
                <span className="block w-4 h-12 bg-neon skew-x-[-12deg] border-2 border-black dark:border-none"></span>
                Last 10 Recent Changes
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                {books.map((book) => (
                    <div
                        key={book.id}
                        className="group flex flex-col h-full bg-white dark:bg-gray-900 border-3 border-black dark:border-neon shadow-brutal hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-200"
                    >
                        {/* Zone Image : Séparée par une ligne noire épaisse */}
                        <div className="h-56 p-4 bg-gray-50 dark:bg-black border-b-3 border-black dark:border-neon flex items-center justify-center overflow-hidden relative">
                            {/* Petit label ID technique en haut à gauche */}
                            <span className="absolute top-2 left-2 font-mono text-[10px] bg-black text-white px-1 dark:bg-neon dark:text-black">
                                ID: {book.id.slice(-4)}
                            </span>

                            {book.coverUrl ? (
                                <img
                                    src={book.coverUrl}
                                    alt={book.title}
                                    className="h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300 drop-shadow-md"
                                />
                            ) : (
                                <div className="text-center">
                                    <span className="font-display text-4xl font-bold text-gray-300 dark:text-gray-700">N/A</span>
                                    <p className="font-mono text-xs mt-2 text-gray-400">NO COVER</p>
                                </div>
                            )}
                        </div>

                        {/* Zone Texte */}
                        <div className="flex-1 p-4 flex flex-col justify-between">
                            <div>
                                <h3 className="font-display font-bold text-2xl leading-none uppercase italic mb-2 line-clamp-2 dark:text-white">
                                    {book.title}
                                </h3>
                                <p className="font-mono text-xs text-gray-500 dark:text-gray-400 mb-4 border-l-2 border-neon pl-2">
                                    UPDATED: {new Date(book.date).toLocaleDateString()}
                                </p>
                            </div>

                            <a
                                href={`https://openlibrary.org${book.key}`}
                                target="_blank"
                                rel="noreferrer"
                                className="block w-full text-center py-2 border-3 border-black bg-white hover:bg-black hover:text-white dark:bg-neon dark:text-black dark:border-black dark:hover:bg-white dark:hover:border-neon font-mono text-xs font-bold uppercase transition-colors"
                            >
                                Learn more
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;