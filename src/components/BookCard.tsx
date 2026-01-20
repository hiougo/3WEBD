import { Link } from 'react-router-dom';
import type {BookSummary} from '../types/Book';

interface Props {
    book: BookSummary;
}

const BookCard = ({ book }: Props) => {
    // Extraction de l'ID pour l'URL (ex: /works/OL123W -> OL123W)
    const bookId = book.key.split('/').lastItem || book.key.replace('/works/', '');

    return (
        <Link
            to={`/book/${bookId}`}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow flex flex-col"
        >
            {/* Image de couverture */}
            <div className="aspect-[2/3] bg-gray-200">
                <img
                    src={book.cover_i
                        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                        : 'https://via.placeholder.com/200x300?text=No+Cover'}
                    alt={book.title}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Infos textuelles */}
            <div className="p-4 flex-grow">
                <h3 className="font-bold text-lg line-clamp-2">{book.title}</h3>
                <p className="text-gray-600 text-sm mt-1">
                    {book.author_name ? book.author_name[0] : 'Auteur inconnu'}
                </p>
                <p className="text-gray-400 text-xs mt-2">
                    {book.first_publish_year || 'Année inconnue'}
                </p>
            </div>
        </Link>
    );
};

export default BookCard;