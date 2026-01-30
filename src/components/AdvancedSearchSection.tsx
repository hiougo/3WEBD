import { useOutletContext } from 'react-router-dom';
import AdvancedSearch from './SearchBar';

const AdvancedSearchSection = () => {
    const { showAdvanced } = useOutletContext<{ showAdvanced: boolean }>();
    if (!showAdvanced) return null;
    return (
        <div className="mb-12">
            <h1 className="font-display font-bold text-4xl md:text-5xl uppercase italic tracking-tighter mb-8 flex items-center gap-3 dark:text-white animate-in fade-in slide-in-from-left duration-500">
                <span className="block w-4 h-12 bg-neon skew-x-[-12deg] border-2 border-black dark:border-none"></span>
                Advanced Search
            </h1>

            <div className="border-3 border-black p-6 bg-white dark:bg-black dark:border-neon shadow-brutal animate-in fade-in zoom-in duration-300">
                <AdvancedSearch />
            </div>
        </div>
    );
};

export default AdvancedSearchSection;