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

    if (error) return <div>Erreur : Livre introuvable.</div>;
    if (!book) return <div>Chargement...</div>;

    return (
        <div>
            <div className="flex flex-col md:flex-row gap-8">
                {/* Colonne Gauche : Image */}
                <div>
                    <img
                        src={book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg` : 'https://via.placeholder.com/300x450?text=No+Cover'}
                        alt={book.title}

                    />
                </div>

                {/* Colonne Droite : Infos */}
                <div>
                    <h1>{book.title}</h1>
                    <p >Par {book.author_name?.join(', ') || 'Auteur inconnu'}</p>

                    <div>
                        <h3>Informations :</h3>
                        <p>Première publication : {book.first_publish_year}</p>
                        <p>Sujets : {book.subject?.slice(0, 5).join(', ')}</p>
                    </div>

                    {/* Section Wikipedia */}
                    {wiki && (
                        <div>
                            <h2>D'après Wikipedia</h2>
                            <p>{wiki.extract}</p>
                            <a
                                href={wiki.content_urls.desktop.page}
                                target="_blank"
                                rel="noreferrer"
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