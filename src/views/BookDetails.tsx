import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { openLibraryService } from '../services/openLibrary';
import { wikipediaService } from '../services/wikipedia';
import type { BookDetail } from '../types/Book';
import type { WikiData } from '../types/Wikipedia';
import { ArrowLeft, ExternalLink, Database } from 'lucide-react';

const BookDetails = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [book, setBook] = useState<BookDetail | null>(null);
    const [wiki, setWiki] = useState<WikiData | null>(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (id) {
            // "works/" est requis par l'API pour les détails
            const queryId = id.startsWith('/works/') ? id : `/works/${id}`;

            openLibraryService.getBookDetails(queryId)
                .then(data => {
                    setBook(data);
                    // Recherche Wikipedia basée sur le titre
                    if (data.title) {
                        return wikipediaService.getArticle(data.title);
                    }
                    return null;
                })
                .then(wikiData => setWiki(wikiData))
                .catch((err) => {
                    console.error(err);
                    setError(true);
                });
        }
    }, [id]);

    // ÉTATS DE CHARGEMENT / ERREUR STYLE TERMINAL
    if (error) return (
        <div className="min-h-[50vh] flex flex-col items-center justify-center font-mono text-red-600 dark:text-red-500">
            <h2 className="text-4xl font-bold uppercase mb-4">Error 404</h2>
            <p>FILE CORRUPTED OR MISSING.</p>
            <button onClick={() => navigate(-1)} className="mt-8 underline hover:bg-red-600 hover:text-white px-2">
                &lt; GO BACK
            </button>
        </div>
    );

    if (!book) return (
        <div className="p-20 text-center font-mono text-xl animate-pulse uppercase tracking-widest dark:text-neon">
            DECRYPTING FILE DATA...
        </div>
    );

    return (
        <div className="animate-fade-in">
            {/* BOUTON RETOUR */}
            <button
                onClick={() => navigate(-1)}
                className="mb-8 flex items-center gap-2 font-mono text-sm font-bold uppercase hover:bg-black hover:text-white px-4 py-2 border-3 border-black dark:border-neon dark:text-white dark:hover:bg-neon dark:hover:text-black transition-colors w-fit"
            >
                <ArrowLeft className="w-4 h-4 stroke-[3]" />
                Back to Database
            </button>

            <div className="flex flex-col lg:flex-row gap-12">

                {/* COLONNE GAUCHE : IMAGE "EVIDENCE" */}
                <div className="w-full lg:w-1/3 flex-shrink-0">
                    <div className="border-3 border-black dark:border-white p-4 bg-white dark:bg-gray-900 shadow-brutal dark:shadow-[4px_4px_0px_0px_#ffffff] relative">
                        {/* Sticker décoratif */}
                        <div className="absolute -top-3 -right-3 bg-neon text-black font-mono text-xs font-bold px-2 py-1 border-2 border-black transform rotate-3">
                            EVIDENCE #{id}
                        </div>

                        <img
                            src={book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg` : 'https://via.placeholder.com/300x450?text=No+Cover'}
                            alt={book.title}
                            className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-500 border border-gray-200 dark:border-gray-800"
                        />
                    </div>

                    {/* Meta Data Rapide */}
                    <div className="mt-6 font-mono text-sm space-y-2 text-gray-600 dark:text-gray-400">
                        <div className="flex justify-between border-b border-gray-300 dark:border-gray-700 py-1">
                            <span>PUBLISHED:</span>
                            <span className="font-bold text-black dark:text-white">{book.first_publish_year || 'N/A'}</span>
                        </div>
                        {book.subject && (
                            <div className="py-2">
                                <span className="block mb-2 text-xs uppercase">Keywords:</span>
                                <div className="flex flex-wrap gap-2">
                                    {book.subject.slice(0, 5).map(sub => (
                                        <span key={sub} className="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 text-xs border border-gray-300 dark:border-gray-600">
                                            {sub}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* COLONNE DROITE : CONTENU DU DOSSIER */}
                <div className="flex-1">
                    {/* TITRE MASSIF */}
                    <h1 className="font-display text-5xl md:text-7xl uppercase italic font-bold leading-[0.9] mb-6 dark:text-white">
                        {book.title}
                    </h1>

                    <p className="font-mono text-xl border-l-4 border-neon pl-4 mb-8 dark:text-gray-300">
                        BY <span className="font-bold border-b-2 border-black dark:border-white uppercase">{book.author_name?.join(', ') || 'UNKNOWN AGENT'}</span>
                    </p>

                    {/* BLOC DESCRIPTION (Priorité Wikipedia sinon Description OpenLibrary) */}
                    <div className="bg-gray-50 dark:bg-gray-900 border-3 border-black dark:border-neon p-6 relative">
                        <div className="absolute -top-3 left-4 bg-black text-white dark:bg-neon dark:text-black px-3 py-1 font-mono text-xs font-bold uppercase flex items-center gap-2">
                            <Database className="w-3 h-3" />
                            {wiki ? 'Wikipedia Extract' : 'Library Summary'}
                        </div>

                        <div className="mt-2 font-mono leading-relaxed text-sm md:text-base text-justify dark:text-gray-300">
                            {wiki ? (
                                <>
                                    <p className="mb-4">{wiki.extract}</p>
                                    <a
                                        href={wiki.content_urls.desktop.page}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline font-bold text-xs uppercase"
                                    >
                                        Read full report <ExternalLink className="w-3 h-3" />
                                    </a>
                                </>
                            ) : (
                                <p>
                                    {typeof book.description === 'string'
                                        ? book.description
                                        : book.description?.value || "No detailed description available in the archives."}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookDetails;