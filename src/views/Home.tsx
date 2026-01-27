import { useEffect, useState } from 'react';
import { openLibraryService } from '../services/openLibrary';
import type { RecentChange } from '../types/RecentChange';
import type { BookSummary } from '../types/Book'; // On importe le type attendu par la carte
import BookCard from '../components/BookCard'; // On importe le composant

const Home = () => {
    // On utilise BookSummary[] au lieu de BookDisplay[]
    const [books, setBooks] = useState<BookSummary[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAndEnrichBooks = async () => {
            try {
                const changes: RecentChange[] = await openLibraryService.getRecentChanges();

                // Filtrage identique
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

                        const coverId = details.covers && details.covers.length > 0 ? details.covers[0] : undefined;

                        const bookSummary: BookSummary = {
                            key: bookKey,
                            title: details.title || "UNTITLED DATA",
                            cover_i: coverId,
                            author_name: details.authors ? ['Unknown Author'] : ['System Update'],
                            first_publish_year: new Date(change.timestamp).getFullYear()
                        };

                        return bookSummary;
                    } catch (err) {
                        return null;
                    }
                });

                const results = await Promise.all(detailedBooksPromises);
                setBooks(results.filter((b): b is BookSummary => b !== null));

            } catch (error) {
                console.error("Error :", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAndEnrichBooks();
    }, []);

    // Loader style Terminal
    if (loading) return (
        <div className="p-20 text-center font-mono text-xl animate-pulse uppercase tracking-widest dark:text-neon">
             Initializing Data Stream...
        </div>
    );

    return (
        <div>
            {/* Titre Brutaliste */}
            <h1 className="font-display font-bold text-4xl md:text-5xl uppercase italic tracking-tighter mb-12 flex items-center gap-3 dark:text-white">
                <span className="block w-4 h-12 bg-neon skew-x-[-12deg] border-2 border-black dark:border-none"></span>
                Last 10 Recent Changes
            </h1>

            {/* Grille utilisant BookCard */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                {books.map((book) => (
                    // On passe simplement l'objet book au composant
                    <BookCard key={book.key} book={book} />
                ))}
            </div>
        </div>
    );
};

export default Home;