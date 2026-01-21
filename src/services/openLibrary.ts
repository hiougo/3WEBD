import type {OpenLibrarySearchResponse, BookDetail} from '../types/Book';

const BASE_URL = 'https://openlibrary.org';

export const openLibraryService = {
    // Recherche rapide et avancée
    // On passe un objet de paramètres pour la recherche avancée
    searchBooks: async (query: string, params: Record<string, string> = {}): Promise<OpenLibrarySearchResponse> => {
        const searchParams = new URLSearchParams({ q: query, ...params });
        const response = await fetch(`${BASE_URL}/search.json?${searchParams.toString()}`);

        if (!response.ok) throw new Error('Erreur réseau lors de la recherche');
        return response.json();
    },

    // Récupérer les détails d'un livre spécifique
    getBookDetails: async (workId: string): Promise<BookDetail> => {
        const response = await fetch(`${BASE_URL}${workId}.json`);

        if (!response.ok) throw new Error('Livre introuvable');
        return response.json();
    },

    getRecentChanges: async (): Promise<any[]> => {
        const response = await fetch('https://openlibrary.org/recentchanges.json?limit=50');
        if (!response.ok) throw new Error('Failed to fetch changes');
        return response.json();
    }
};