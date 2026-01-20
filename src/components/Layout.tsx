import { useState, useEffect } from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import { Search, Sparkles, Sun, Moon } from 'lucide-react';

const Layout = () => {
    const [searchTerm, setSearchTerm] = useState('');
    // La logique du dark mode reste, mais ne changera rien visuellement
    // tant que vous n'aurez pas remis du CSS pour gérer la classe 'dark'.
    const [isDark, setIsDark] = useState(() => localStorage.getItem('theme') === 'dark');
    const navigate = useNavigate();

    useEffect(() => {
        const root = window.document.documentElement;
        if (isDark) {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDark]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
            setSearchTerm('');
        }
    };

    return (
        <div>
            {/* --- HEADER --- */}
            <header>
                <div>
                    {/* Logo */}
                    <Link to="/">
                        <Sparkles />
                        <span>BiblioFun</span>
                    </Link>

                    {/* Barre de recherche */}
                    <form onSubmit={handleSearch}>
                        <input
                            type="text"
                            placeholder="Trouver une pépite..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button type="submit">
                            <Search />
                        </button>
                    </form>

                    {/* Navigation */}
                    <nav>
                        <Link to="/search">
                            Recherche Avancée
                        </Link>

                        <button onClick={() => setIsDark(!isDark)}>
                            {isDark ? <Sun /> : <Moon />}
                        </button>
                    </nav>
                </div>
            </header>

            {/* --- MAIN CONTENT --- */}
            <main>
                <Outlet />
            </main>

            {/* --- FOOTER --- */}
            <footer>
                <div>
                    <p>BiblioFun © 2025</p>
                    <p>
                        API utilisé : <a href="https://openlibrary.org/">https://openlibrary.org/</a>
                    </p>
                    <p>
                        Fait avec le <span>♥</span> et beaucoup de café.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;