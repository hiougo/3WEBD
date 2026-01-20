import { useState } from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';

const Layout = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    // Fonction de recherche rapide (Quick Search)
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            // Redirige vers la page de recherche avec le paramètre "q" dans l'URL
            navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
            setSearchTerm(''); // Nettoie le champ après validation
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900 font-sans">

            {/* --- HEADER --- */}
            <header className="bg-blue-900 text-white shadow-lg sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-4">

                    {/* Logo / Titre */}
                    <Link to="/" className="text-2xl font-bold flex items-center gap-2 hover:text-blue-200 transition">
                        <span className="text-3xl">📚</span>
                        <span className="hidden sm:inline">BiblioVille</span>
                    </Link>

                    {/* QUICK SEARCH FORM (2pts barème) */}
                    <form onSubmit={handleSearch} className="relative w-full md:w-1/2">
                        <input
                            type="text"
                            placeholder="Rechercher un livre, un auteur..."
                            className="w-full py-2 px-4 pr-12 rounded-full text-black focus:ring-2 focus:ring-yellow-500 outline-none shadow-inner"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-yellow-500 hover:bg-yellow-600 text-blue-900 p-1.5 rounded-full transition-colors"
                            aria-label="Lancer la recherche"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </form>

                    {/* Navigation secondaire */}
                    <nav className="flex gap-4">
                        <Link to="/search" className="text-sm font-medium hover:underline">Recherche Avancée</Link>
                    </nav>
                </div>
            </header>

            {/* --- MAIN CONTENT --- */}
            {/* L'Outlet est l'endroit où les pages (Home, Details, etc.) s'affichent */}
            <main className="flex-grow max-w-7xl mx-auto w-full p-4 md:p-8">
                <Outlet />
            </main>

            {/* --- FOOTER --- */}
            <footer className="bg-gray-800 text-gray-300 py-8 px-4 mt-auto">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center text-center md:text-left">
                    <div>
                        <h4 className="text-white font-bold text-lg mb-2">Mairie de BiblioVille</h4>
                        <p className="text-sm">Système de gestion du fonds documentaire ouvert.</p>
                    </div>
                    <div className="text-sm">
                        <p>Données fournies par <a href="https://openlibrary.org" target="_blank" rel="noreferrer" className="underline hover:text-white">Open Library</a> & Wikipedia.</p>
                        <p className="mt-2 opacity-50 italic">Réalisé par l'équipe de développement municipal.</p>
                    </div>
                </div>
            </footer>

        </div>
    );
};

export default Layout;