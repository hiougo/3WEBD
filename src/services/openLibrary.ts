import type { OpenLibrarySearchResponse, BookDetail } from '../types/Book';
import type { SearchCriteria } from '../types/Search';

const BASE_URL = '/api';

export const openLibraryService = {
    searchBooks: async (criteria: SearchCriteria): Promise<OpenLibrarySearchResponse> => {
        const searchParams = new URLSearchParams();

        // On remplit les paramètres seulement s'ils existent
        if (criteria.q) searchParams.append('q', criteria.q);
        if (criteria.title) searchParams.append('title', criteria.title);
        if (criteria.author) searchParams.append('author', criteria.author);
        if (criteria.subject) searchParams.append('subject', criteria.subject);
        searchParams.append('limit', '20');

        const response = await fetch(`${BASE_URL}/search.json?${searchParams.toString()}`);
        if (!response.ok) throw new Error('Search failed');
        return response.json();
    },

    getBookDetails: async (workId: string): Promise<BookDetail> => {

        const response = await fetch(`${BASE_URL}${workId}.json`);
        if (!response.ok) throw new Error('Book not found');
        return response.json();
    },

    getRecentChanges: async (): Promise<any[]> => {
        const response = await fetch(`${BASE_URL}/recentchanges.json?limit=10`);
        if (!response.ok) throw new Error('Failed to fetch changes');
        return response.json();
    },

    getAuthor: async (authorKey: string): Promise<any> => {
        const response = await fetch(`${BASE_URL}${authorKey}.json`);
        if (!response.ok) throw new Error('Auteur introuvable');
        return response.json();
    }


};