import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { openLibraryService } from '../services/openLibrary';
import type { BookSummary } from '../types/Book';
import BookCard from '../components/BookCard';

const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const [books, setBooks] = useState<BookSummary[]>([]);
    const [loading, setLoading] = useState(false); // Ajout d'un state loading
    const query = searchParams.get('q') || '';

    useEffect(() => {
        if (query) {
            setLoading(true);
            openLibraryService.searchBooks(query)
                .then(res => setBooks(res.docs))
                .catch(err => console.error("Erreur recherche:", err))
                .finally(() => setLoading(false));
        }
    }, [query]);

    return (
        <div>
            {/* Header des résultats style Brutaliste */}
            <div className="mb-12">
                <h2 className="font-display font-bold text-4xl md:text-6xl uppercase italic tracking-tighter flex flex-col md:flex-row md:items-center gap-3 dark:text-white">
                    {/* Bloc déco neon */}
                    <span className="hidden md:block w-4 h-12 bg-neon skew-x-[-12deg] border-2 border-black dark:border-none"></span>

                    <span>Results for :</span>

                    {/* Le mot recherché surligné */}
                    <span className="bg-black text-white px-2 py-1 transform -skew-x-6 border-2 border-transparent dark:bg-neon dark:text-black dark:border-none">
                        "{query}"
                    </span>
                </h2>
                <p className="font-mono text-sm mt-2 text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                    Found {books.length} matches in database.
                </p>
            </div>

            {/* Loader style Terminal */}
            {loading ? (
                <div className="p-20 text-center">
                    <p className="font-mono text-xl animate-pulse uppercase tracking-widest dark:text-neon">
                         SCANNING LIBRARY ARCHIVES...
                    </p>
                </div>
            ) : (
                <>
                    {/* Grid Responsive */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {books.map(book => (
                            <BookCard key={book.key} book={book} />
                        ))}
                    </div>

                    {/* Cas vide (0 résultats) */}
                    {!loading && books.length === 0 && (
                        <div className="border-3 border-black dark:border-white p-12 text-center bg-gray-100 dark:bg-gray-800">
                            <h3 className="font-display text-3xl font-bold uppercase mb-4 dark:text-white">Void detected.</h3>
                            <p className="font-mono text-gray-600 dark:text-gray-300">
                                No data found for query "{query}". Try a different frequency.
                            </p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default SearchResults;