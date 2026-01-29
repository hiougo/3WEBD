import type { WikiData } from '../types/Wikipedia';

export const wikipediaService = {

    getFromUrl: async (wikiUrl: string): Promise<WikiData | null> => {
        try {
            const match = wikiUrl.match(/https?:\/\/([a-z]{2,3})\.wikipedia\.org\/wiki\/(.*)/);
            if (!match) return null;

            const lang = match[1];
            const title = match[2];

            const response = await fetch(`https://${lang}.wikipedia.org/api/rest_v1/page/summary/${title}`);
            if (!response.ok) return null;
            const data = await response.json();
            return data as WikiData;

        } catch (error) {
            console.warn("Erreur chargement Wiki:", error);
            return null;
        }
    }
};