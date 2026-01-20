import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { openLibraryService } from '../services/openLibrary';
import { wikipediaService } from '../services/wikipedia';
import type {BookDetail} from '../types/Book';
import type {WikiData} from '../types/Wikipedia';

const BookDetails = () => {
    const { id } = useParams<{ id: string }>(); // Récupère l'ID depuis l'URL
    const [book, setBook] = useState<BookDetail | null>(null);
    const [wiki, setWiki] = useState<WikiData | null>(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (id) {
            // 1. On récupère les infos du livre (on ajoute "works/" car l'API en a besoin)
            openLibraryService.getBookDetails(`/works/${id}`)
                .then(data => {
                    setBook(data);
                    // 2. Une fois qu'on a le titre, on cherche sur Wikipedia
                    return wikipediaService.getArticle(data.title);
                })
                .then(wikiData => setWiki(wikiData))
                .catch(() => setError(true));
        }
    }, [id]);

    if (error) return <div className="p-10 text-red-500">Erreur : Livre introuvable.</div>;
    if (!book) return <div className="p-10">Chargement...</div>;

    return (
        <div className="max-w-5xl mx-auto p-6">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Colonne Gauche : Image */}
                <div className="w-full md:w-1/3">
                    <img
                        src={book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg` : 'https://via.placeholder.com/300x450?text=No+Cover'}
                        alt={book.title}
                        className="w-full rounded-lg shadow-lg"
                    />
                </div>

                {/* Colonne Droite : Infos */}
                <div className="w-full md:w-2/3">
                    <h1 className="text-4xl font-bold mb-2">{book.title}</h1>
                    <p className="text-xl text-gray-600 mb-4">Par {book.author_name?.join(', ') || 'Auteur inconnu'}</p>

                    <div className="bg-gray-50 p-4 rounded-md mb-6">
                        <h3 className="font-bold mb-2">Informations :</h3>
                        <p>Première publication : {book.first_publish_year}</p>
                        <p>Sujets : {book.subject?.slice(0, 5).join(', ')}</p>
                    </div>

                    {/* Section Wikipedia */}
                    {wiki && (
                        <div className="mt-8 border-t pt-6">
                            <h2 className="text-2xl font-bold mb-3">D'après Wikipedia</h2>
                            <p className="italic text-gray-700 mb-4">{wiki.extract}</p>
                            <a
                                href={wiki.content_urls.desktop.page}
                                target="_blank"
                                rel="noreferrer"
                                className="text-blue-500 underline"
                            >
                                Lire l'article complet
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BookDetails;