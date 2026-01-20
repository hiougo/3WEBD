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

    if (loading) return <div className="p-8 text-center">Chargement des nouveautés...</div>;

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Derniers changements à la bibliothèque</h1>
            <div className="space-y-4">
                {changes.slice(0, 10).map((change) => (
                    <div key={change.id} className="p-4 border rounded-lg shadow-sm bg-white">
                        <p className="font-semibold text-blue-600">{change.kind}</p>
                        <p className="text-gray-600">ID de l'objet : {change.changes[0]?.key}</p>
                        <p className="text-sm text-gray-400">{new Date(change.timestamp).toLocaleDateString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;