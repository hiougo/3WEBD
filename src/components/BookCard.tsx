import { Link } from 'react-router-dom';
import type { BookSummary } from '../types/Book';

interface Props {
    book: BookSummary;
}

const BookCard = ({ book }: Props) => {
    // Extraction de l'ID (J'ai simplifié la logique pour être sûr que ça marche en standard JS)
    const bookId = book.key.replace('/works/', '');

    return (
        <Link to={`/book/${bookId}`}>
            {/* Image de couverture */}
            <div>
                <img
                    src={book.cover_i
                        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                        : 'https://via.placeholder.com/200x300?text=No+Cover'}
                    alt={book.title}
                />
            </div>

            {/* Infos textuelles */}
            <div>
                <h3>{book.title}</h3>
                <p>
                    {book.author_name ? book.author_name[0] : 'Auteur inconnu'}
                </p>
                <p>
                    {book.first_publish_year || 'Année inconnue'}
                </p>
            </div>
        </Link>
    );
};

export default BookCard;