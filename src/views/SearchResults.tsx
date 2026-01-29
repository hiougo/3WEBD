import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { openLibraryService } from '../services/openLibrary';
import type { BookSummary } from '../types/Book';
import type { SearchCriteria } from '../types/Search';
import BookCard from '../components/BookCard';

const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const [books, setBooks] = useState<BookSummary[]>([]);
    const [loading, setLoading] = useState(false);

    const q = searchParams.get('q');
    const title = searchParams.get('title');
    const author = searchParams.get('author');
    const subject = searchParams.get('subject');

    const getSearchLabel = () => {
        const parts = [];
        if (q) parts.push(`"${q}"`);
        if (title) parts.push(`Title: ${title}`);
        if (author) parts.push(`Author: ${author}`);
        if (subject) parts.push(`Subject: ${subject}`);
        return parts.length > 0 ? parts.join(' + ') : 'ALL ARCHIVES';
    };

    useEffect(() => {
        const criteria: SearchCriteria = {
            q: q || undefined,
            title: title || undefined,
            author: author || undefined,
            subject: subject || undefined
        };

        if (Object.values(criteria).every(val => val === undefined)) return;

        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await openLibraryService.searchBooks(criteria);

                const formattedBooks: BookSummary[] = response.docs.map((doc: any) => ({
                    key: doc.key.replace('/works/', ''),
                    title: doc.title,
                    author_name: doc.author_name || ['Unknown Agent'],
                    cover_i: doc.cover_i,
                    first_publish_year: doc.first_publish_year
                }));

                setBooks(formattedBooks);

            } catch (err) {
                console.error("Erreur recherche:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [searchParams]);

    return (
        <>
            <div className="mb-12">
                <h2 className="font-display font-bold text-3xl md:text-5xl uppercase italic tracking-tighter flex flex-col md:flex-row md:items-center gap-3 dark:text-white">
                    <span className="hidden md:block w-4 h-12 bg-neon skew-x-[-12deg] border-2 border-black dark:border-none"></span>
                    <span>Results for :</span>
                    <span className="bg-black text-white px-3 py-1 transform -skew-x-6 border-2 border-transparent dark:bg-neon dark:text-black dark:border-none text-xl md:text-3xl truncate max-w-full">
                        {getSearchLabel()}
                    </span>
                </h2>

                <p className="font-mono text-sm mt-2 text-gray-500 dark:text-gray-400 uppercase tracking-widest pl-0 md:pl-8">
                    {loading ? 'CALCULATING...' : `Found ${books.length} matches in database.`}
                </p>
            </div>

            {loading ? (
                <div className="p-20 text-center">
                    <p className="font-mono text-xl animate-pulse uppercase tracking-widest dark:text-neon">
                        SCANNING LIBRARY ARCHIVES...
                    </p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {books.map(book => (
                            <BookCard key={book.key} book={book} />
                        ))}
                    </div>

                    {!loading && books.length === 0 && (
                        <div className="border-3 border-black dark:border-white p-12 text-center bg-gray-100 dark:bg-gray-800 mt-8">
                            <h3 className="font-display text-3xl font-bold uppercase mb-4 dark:text-white">Void detected.</h3>
                            <p className="font-mono text-gray-600 dark:text-gray-300">
                                No data found for query "{getSearchLabel()}". Try adjusting your filters.
                            </p>
                        </div>
                    )}
                </>
            )}
        </>
    );
};

export default SearchResults;