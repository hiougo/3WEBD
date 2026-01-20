import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { openLibraryService } from '../services/openLibrary';
import type {BookSummary} from '../types/Book';
import BookCard from '../components/BookCard';

const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const [books, setBooks] = useState<BookSummary[]>([]);
    const query = searchParams.get('q') || '';

    useEffect(() => {
        if (query) {
            openLibraryService.searchBooks(query)
                .then(res => setBooks(res.docs))
                .catch(err => console.error("Erreur recherche:", err));
        }
    }, [query]);

    return (
        <div>
            <h2>Résultats pour : <strong>{query}</strong></h2>
            {/* Grid Responsive : 1 col mobile, 3 tablet, 4 desktop */}
            <div>
                {books.map(book => (
                    <BookCard key={book.key} book={book} />
                ))}
            </div>
            {books.length === 0 && <p>Aucun livre trouvé.</p>}
        </div>
    );
};

export default SearchResults;