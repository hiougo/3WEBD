import type {WikiData} from '../types/Wikipedia';

export const wikipediaService = {
    getArticle: async (title: string): Promise<WikiData | null> => {
        // On utilise l'API de résumé de Wikipedia (plus simple)
        const formattedTitle = encodeURIComponent(title);
        const response = await fetch(
            `https://en.wikipedia.org/api/rest_v1/page/summary/${formattedTitle}`
        );

        if (!response.ok) return null; // On renvoie null si pas de page trouvée
        return response.json();
    }
};