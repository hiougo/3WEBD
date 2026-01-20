import { useEffect, useState } from 'react';
import { openLibraryService } from '../services/openLibrary';
import type {RecentChange} from '../types/RecentChange';

const Home = () => {
    const [changes, setChanges] = useState<RecentChange[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        openLibraryService.getRecentChanges()
            .then(setChanges)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div>loading...</div>;

    return (
        <div>
            <h1 className="font-display font-bold text-4xl md:text-5xl uppercase italic tracking-tighter mb-8 flex items-center gap-3 dark:text-white">
                <span className="block w-3 h-10 bg-neon skew-x-[-12deg]"></span>
                Last 10 Recent Changes
            </h1>
            <div >
                {changes.slice(0, 10).map((change) => (
                    <div key={change.id} >
                        <p >{change.kind}</p>
                        <p >ID de l'objet : {change.changes[0]?.key}</p>
                        <p >{new Date(change.timestamp).toLocaleDateString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;