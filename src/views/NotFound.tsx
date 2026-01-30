import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] p-4 bg-white dark:bg-black text-center overflow-hidden">

            <div className="space-y-6 animate-in zoom-in duration-300 delay-150">
                <h1 className="font-display text-6xl md:text-9xl font-black text-red-600 tracking-tighter">
                    ERROR 404
                </h1>

                <p className="font-mono text-red-500 text-sm md:text-lg tracking-widest uppercase border-y border-red-500/20 py-4">
                    File corrupted or missing.
                </p>

                <div className="pt-8">
                    <Link
                        to="/"
                        className="inline-block font-mono font-bold text-red-600 border-b-2 border-red-600 hover:bg-red-600 hover:text-white transition-all px-2 py-1 uppercase tracking-wider"
                    >
                        &lt; RETURN TO SAFETY
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;