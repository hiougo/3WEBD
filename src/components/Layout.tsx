import { useState, useEffect } from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import { Search, Sparkles, Sun, Moon } from 'lucide-react'; // J'ai remplacé Library par Sparkles pour le fun

const Layout = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isDark, setIsDark] = useState(() => localStorage.getItem('theme') === 'dark');
    const navigate = useNavigate();

    useEffect(() => {
        const root = window.document.documentElement;
        isDark ? root.classList.add('dark') : root.classList.remove('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }, [isDark]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
            setSearchTerm('');
        }
    };

    return (
        <div className="flex flex-col min-h-screen transition-colors duration-300 bg-background-light dark:bg-background-dark text-text-main dark:text-text-inverted font-sans">

            {/* --- HEADER COLORÉ --- */}
            {/* Le bg-gradient-to-r crée la magie ici */}
            <header className="sticky top-0 z-50 shadow-lg bg-gradient-to-r from-primary-dark via-primary to-secondary text-white">
                <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-4">

                    {/* Logo Fun */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="p-2 bg-white/20 backdrop-blur-sm rounded-xl group-hover:scale-110 transition-transform duration-300">
                            <Sparkles className="w-6 h-6 text-yellow-300" />
                        </div>
                        <span className="text-2xl font-black tracking-tight drop-shadow-sm">
                            Biblio<span className="text-yellow-300">Fun</span>
                        </span>
                    </Link>

                    {/* Barre de recherche */}
                    <form onSubmit={handleSearch} className="relative w-full md:w-1/2 group">
                        <input
                            type="text"
                            placeholder="Trouver une pépite..."
                            className="w-full py-3 pl-5 pr-12 rounded-full text-sm font-medium
                                     bg-white/90 dark:bg-surface-dark/90
                                     text-primary-dark dark:text-white
                                     border-2 border-transparent
                                     focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/50
                                     focus:outline-none shadow-xl transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full
                                     bg-gradient-to-br from-secondary to-pink-600
                                     text-white shadow-md hover:shadow-lg hover:scale-105 transition-all"
                        >
                            <Search className="w-4 h-4" />
                        </button>
                    </form>

                    {/* Navigation */}
                    <div className="flex items-center gap-4">
                        <Link
                            to="/search"
                            className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 font-semibold text-sm transition backdrop-blur-sm"
                        >
                            Recherche Avancée
                        </Link>

                        <button
                            onClick={() => setIsDark(!isDark)}
                            className="p-2 rounded-full bg-black/20 hover:bg-black/30 transition text-yellow-300"
                        >
                            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5 text-white" />}
                        </button>
                    </div>
                </div>
            </header>

            {/* --- MAIN --- */}
            <main className="flex-grow w-full max-w-7xl mx-auto p-4 md:p-8">
                <Outlet />
            </main>

            {/* --- FOOTER --- */}
            <footer className="mt-auto py-10 px-4
                             bg-surface-light dark:bg-surface-dark
                             border-t border-primary/20">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                        BiblioFun © 2025
                    </p>
                    <p className="text-sm text-text-muted">
                        API utilisé : https://openlibrary.org/
                    </p>
                    <p className="text-sm text-text-muted">
                        Fait avec le <span className="text-red-500">♥</span> et beaucoup de café.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;