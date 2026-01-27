import { useEffect, useState } from 'react';
import { openLibraryService } from '../services/openLibrary';
import type { BookSummary } from '../types/Book';
import BookCard from '../components/BookCard';

const Home = () => {
    const [books, setBooks] = useState<BookSummary[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecentBooks = async () => {
            try {
                const changes = await openLibraryService.getRecentChanges();

                // 1. Filtrer pour ne garder que les changements qui contiennent un livre (/books/) ou une oeuvre (/works/)
                const bookChanges = changes.filter((change: any) =>
                    change.changes.some((c: any) => c.key.includes('/books/') || c.key.includes('/works/'))
                ).slice(0, 10);

                // 2. Pour chaque changement, on récupère les détails
                const bookPromises = bookChanges.map(async (change: any) => {
                    // On trouve la clé du livre spécifiquement (au cas où il y a un auteur dans le même changement)
                    const bookEntry = change.changes.find((c: any) =>
                        c.key.includes('/books/') || c.key.includes('/works/')
                    );

                    const rawKey = bookEntry.key; // ex: "/books/OL45306019M"
                    const cleanId = rawKey.split('/').pop(); // ex: "OL45306019M"

                    try {
                        // On appelle l'API avec la clé complète (nécessaire pour le service)
                        const detail = await openLibraryService.getBookDetails(rawKey);
                        console.log(detail);

                        return {
                            key: cleanId, // On passe l'ID propre pour l'URL du BookCard
                            title: detail.title || `ID: ${cleanId}`,
                            author_name: detail.author_name || (detail.authors ? [detail.authors[0].name] : ['Unknown']),
                            // Normalisation de la couverture (cover_i ou premier élément de covers)
                            cover_i: detail.cover_i || (detail.covers && detail.covers.length > 0 ? detail.covers[0] : null),
                            first_publish_year: detail.first_publish_year || (detail.publish_date ? parseInt(detail.publish_date) : null)
                        } as BookSummary;
                    } catch (err) {
                        // Backup en cas d'échec de l'appel de détails
                        return {

                        }
                    }
                });

                const results = await Promise.all(bookPromises);
                setBooks(results);
            } catch (error) {
                console.error("Data Stream Interrupted:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecentBooks();
    }, []);

    if (loading) return (
        <div className="p-20 text-center font-mono text-xl animate-pulse uppercase tracking-widest dark:text-neon">
            Initializing Data Stream...
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto p-4">
            {/* Titre Brutaliste */}
            <h1 className="font-display font-bold text-4xl md:text-5xl uppercase italic tracking-tighter mb-12 flex items-center gap-3 dark:text-white">
                <span className="block w-4 h-12 bg-neon skew-x-[-12deg] border-2 border-black dark:border-none"></span>
                Last 10 Recent Changes
            </h1>

            {/* Grille utilisant BookCard */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                {books.map((book) => (
                    <BookCard key={book.key} book={book} />
                ))}
            </div>
        </div>
    );
};

export default Home;