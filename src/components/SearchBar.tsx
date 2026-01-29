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
            <form onSubmit={handleSubmit} className="space-y-8">

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">


                    <div className="flex flex-col gap-2">
                        <label className="uppercase font-bold text-sm tracking-widest dark:text-gray-400">Title</label>
                        <input
                            type="text"
                            placeholder="Harry Potter..."
                            className="p-3 border-3 border-black dark:border-neon bg-white dark:bg-black outline-none focus:bg-neon focus:text-black transition-colors font-bold uppercase placeholder:text-gray-400 dark:placeholder:text-gray-700 dark:text-white"
                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                        />
                    </div>


                    <div className="flex flex-col gap-2">
                        <label className="uppercase font-bold text-sm tracking-widest dark:text-gray-400">Author</label>
                        <input
                            type="text"
                            placeholder="J.K. Rowling..."
                            className="p-3 border-3 border-black dark:border-neon bg-white dark:bg-black outline-none focus:bg-neon focus:text-black transition-colors font-bold uppercase placeholder:text-gray-400 dark:placeholder:text-gray-700 dark:text-white"
                            onChange={(e) => setFormData({...formData, author: e.target.value})}
                        />
                    </div>


                    <div className="flex flex-col gap-2">
                        <label className="uppercase font-bold text-sm tracking-widest dark:text-gray-400">Genre / Subject</label>
                        <input
                            type="text"
                            placeholder="Fantasy, Science..."
                            className="p-3 border-3 border-black dark:border-neon bg-white dark:bg-black outline-none focus:bg-neon focus:text-black transition-colors font-bold uppercase placeholder:text-gray-400 dark:placeholder:text-gray-700 dark:text-white"
                            onChange={(e) => setFormData({...formData, subject: e.target.value})}
                        />
                    </div>
                </div>


                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="flex items-center gap-3 px-8 py-3 bg-black text-white dark:bg-neon dark:text-black border-3 border-black dark:border-neon font-display font-bold uppercase italic text-xl
                       hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[4px_4px_0px_0px_#000000] dark:hover:shadow-[4px_4px_0px_0px_#CBFD00]
                       active:translate-x-0 active:translate-y-0 active:shadow-none transition-all"
                    >
                        <Search className="w-6 h-6 stroke-[3]" />
                        Recherche
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdvancedSearch;