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

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <Search />
                    <h3>Recherche Avancée</h3>
                </div>

                <div>
                    {/* Champ Titre */}
                    <div>
                        <label>Titre</label>
                        <input
                            type="text"
                            placeholder="Harry Potter..."
                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                        />
                    </div>

                    {/* Champ Auteur */}
                    <div>
                        <label>Auteur</label>
                        <input
                            type="text"
                            placeholder="J.K. Rowling..."
                            onChange={(e) => setFormData({...formData, author: e.target.value})}
                        />
                    </div>

                    {/* Champ Sujet */}
                    <div>
                        <label>Genre / Sujet</label>
                        <input
                            type="text"
                            placeholder="Fantasy, Science..."
                            onChange={(e) => setFormData({...formData, subject: e.target.value})}
                        />
                    </div>
                </div>

                <div>
                    <button type="submit">
                        <Search />
                        Lancer la recherche
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdvancedSearch;