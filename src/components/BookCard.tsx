import { Link } from 'react-router-dom';
import type { BookSummary } from '../types/Book';

interface Props {
    book: BookSummary;
}

const BookCard = ({ book }: Props) => {
    const bookId = book.key.replace('/works/', '');
    const coverUrl = book.cover_i
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
        : null;

    return (
        <Link
            to={`/book/${bookId}`}
            className="group flex flex-col h-full bg-white dark:bg-gray-900 border-3 border-black dark:border-neon shadow-brutal hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-200"
        >

            <div className="h-64 p-4 bg-gray-50 dark:bg-black border-b-3 border-black dark:border-neon flex items-center justify-center overflow-hidden relative">
                {coverUrl ? (
                    <img
                        src={coverUrl}
                        alt={book.title}
                        className="h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300 drop-shadow-md"
                    />
                ) : (
                    <div className="text-center p-4">
                        <span className="font-display text-4xl font-bold text-gray-300 dark:text-gray-700">?</span>
                        <p className="font-mono text-xs mt-2 text-gray-400">NO VISUAL DATA</p>
                    </div>
                )}
            </div>


            <div className="p-4 flex-grow flex flex-col justify-between">
                <div>
                    <h3 className="font-display font-bold text-xl leading-none uppercase italic mb-2 line-clamp-2 dark:text-white group-hover:text-neon transition-colors">
                        {book.title}
                    </h3>
                    <p className="font-mono text-xs text-gray-500 dark:text-gray-400 border-l-2 border-black dark:border-neon pl-2 mb-4">
                        {book.author_name ? book.author_name[0] : 'UNKNOWN AUTHOR'}
                    </p>
                </div>

                <div className="w-full text-right">
                    <span className="text-[10px] font-mono font-bold uppercase bg-black text-white px-2 py-1 dark:bg-white dark:text-black">
                        {book.first_publish_date || 'N/A'}
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default BookCard;