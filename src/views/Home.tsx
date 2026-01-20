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

    if (loading) return <div>Chargement des nouveautés...</div>;

    return (
        <div>
            <h1 >Derniers changements à la bibliothèque</h1>
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