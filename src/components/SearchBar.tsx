import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

const AdvancedSearch = () => {
    const [formData, setFormData] = useState({ title: '', author: '', subject: '' });
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (formData.title) params.append('title', formData.title);
        if (formData.author) params.append('author', formData.author);
        if (formData.subject) params.append('subject', formData.subject);

        navigate(`/search?${params.toString()}`);
    };

    // Classes communes pour les inputs pour éviter la répétition
    const inputStyles = "w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block p-3 transition duration-200 outline-none";

    return (
        <div className="max-w-5xl mx-auto mt-6">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-xl shadow-lg border border-gray-100"
            >
                <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                    {<Search className="w-6 h-6 text-blue-600" />}
                    <h3 className="text-2xl font-bold text-gray-800">
                        Recherche Avancée
                    </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Champ Titre */}
                    <div className="relative">
                        <label className="block mb-2 text-sm font-medium text-gray-700">Titre</label>
                        <input
                            type="text"
                            placeholder="Harry Potter..."
                            className={inputStyles}
                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                        />
                    </div>

                    {/* Champ Auteur */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">Auteur</label>
                        <input
                            type="text"
                            placeholder="J.K. Rowling..."
                            className={inputStyles}
                            onChange={(e) => setFormData({...formData, author: e.target.value})}
                        />
                    </div>

                    {/* Champ Sujet */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">Genre / Sujet</label>
                        <input
                            type="text"
                            placeholder="Fantasy, Science..."
                            className={inputStyles}
                            onChange={(e) => setFormData({...formData, subject: e.target.value})}
                        />
                    </div>
                </div>

                <div className="mt-8 flex justify-end">
                    <button
                        type="submit"
                        className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                    >
                        {<Search className="w-4 h-4" /> }
                        Lancer la recherche
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdvancedSearch;