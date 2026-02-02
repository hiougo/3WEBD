import { useState, useEffect } from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import { Search, Sun, Moon } from 'lucide-react';

const Layout = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isDark, setIsDark] = useState(() => localStorage.getItem('theme') === 'dark');
    const navigate = useNavigate();
    const [showAdvanced, setShowAdvanced] = useState(false);

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
        <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white font-mono selection:bg-black selection:text-neon">

            <header className="sticky top-0 z-50 bg-white dark:bg-black border-b-3 border-black dark:border-neon transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-6">

                    <Link to="/" className="group flex flex-col items-start gap-0">
                        <span className="font-display font-bold text-5xl tracking-tighter uppercase italic leading-none group-hover:text-neon transition-colors duration-200 dark:text-white">
                            Read<span className="text-neon">.</span>
                        </span>
                        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] bg-black text-white px-1 py-0.5 mt-1 border border-black dark:bg-neon dark:text-black dark:border-neon transform group-hover:translate-x-1 transition-transform">
                            be cultivated together.
                        </span>
                    </Link>

                    <form onSubmit={handleSearch} className="relative w-full md:w-1/2 flex shadow-brutal dark:shadow-none transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-brutal-hover">
                        <input
                            type="text"
                            placeholder="RESEARCH..."
                            className="w-full py-3 px-4 bg-white text-black font-bold border-3 border-black dark:bg-black dark:border-neon dark:text-white placeholder-gray-500 outline-none uppercase focus:bg-neon focus:text-black transition-colors"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="bg-black text-white dark:bg-neon dark:text-black px-6 border-3 border-black dark:border-neon border-l-0 transition-colors flex items-center justify-center hover:bg-neon hover:text-black"
                        >
                            <Search className="w-6 h-6 stroke-[3]" />
                        </button>
                    </form>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setShowAdvanced(!showAdvanced)}
                            className="whitespace-nowrap px-6 py-2 bg-neon border-3 border-black font-bold text-black uppercase
                               hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black
                               shadow-brutal dark:shadow-none transition-all
                               hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-brutal-hover
                               dark:border-neon"
                        >
                            {showAdvanced ? 'Close Search' : 'Advanced Search'}
                        </button>

                        <button
                            onClick={() => setIsDark(!isDark)}
                            className="p-2 border-3 border-black bg-white hover:bg-black hover:text-white transition-colors dark:bg-black dark:text-neon dark:border-neon dark:hover:bg-neon dark:hover:text-black"
                        >
                            {isDark ? <Sun className="w-6 h-6 stroke-[3]" /> : <Moon className="w-6 h-6 stroke-[3]" />}
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto w-full p-6 md:p-12">
                <div className="mb-12 bg-neon border-3 border-black dark:border-white p-4 shadow-brutal dark:shadow-[4px_4px_0px_0px_#ffffff] flex justify-between items-center transform rotate-1">
                    <span className="font-display font-bold text-2xl uppercase text-black">Don't read. Devour.</span>
                </div>

                <Outlet context={{ showAdvanced }} />
            </main>

            <footer className="border-t-3 border-black dark:border-neon bg-black text-white py-12 px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
                    <div>
                        <h2 className="font-display text-6xl font-bold uppercase leading-none text-neon mb-4">
                            Read.
                        </h2>
                        <p className="font-mono text-sm max-w-md text-gray-400 uppercase">
                            be cultivated together.
                        </p>
                    </div>

                    <div className="text-right">
                        <p className="font-bold text-xl mb-4 border-b-2 border-neon inline-block uppercase">link</p>
                        <ul className="space-y-2 font-mono text-gray-300">
                            <li><a href="https://github.com/hiougo/3WEBD" className="hover:text-neon hover:underline decoration-2">GITHUB</a></li>
                            <li><a href="api/" className="hover:text-neon hover:underline decoration-2">API</a></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t border-gray-800 text-center font-mono text-xs text-gray-500 uppercase">
                    © 2025 Read Corp. All Rights Reserved. Designed for impact.
                </div>
            </footer>

        </div>
    );
};

export default Layout;