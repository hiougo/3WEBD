import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdvancedSearch = () => {
    const [formData, setFormData] = useState({ title: '', author: '', subject: '' });
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // On construit une query complexe pour l'API
        const params = new URLSearchParams();
        if (formData.title) params.append('title', formData.title);
        if (formData.author) params.append('author', formData.author);
        if (formData.subject) params.append('subject', formData.subject);

        navigate(`/search?${params.toString()}`);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border mb-8">
            <h3 className="text-xl font-bold mb-4">Recherche Avancée</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                    type="text"
                    placeholder="Titre précis"
                    className="border p-2 rounded"
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
                <input
                    type="text"
                    placeholder="Auteur"
                    className="border p-2 rounded"
                    onChange={(e) => setFormData({...formData, author: e.target.value})}
                />
                <input
                    type="text"
                    placeholder="Sujet (ex: Fantasy)"
                    className="border p-2 rounded"
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                />
            </div>
            <button type="submit" className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                Rechercher
            </button>
        </form>
    );
};

export default AdvancedSearch;