import type { OpenLibrarySearchResponse, BookDetail } from '../types/Book';

// ✅ Ensure it starts with '/' and has NO trailing slash
const BASE_URL = '/api';

export const openLibraryService = {
    searchBooks: async (query: string, params: Record<string, string> = {}): Promise<OpenLibrarySearchResponse> => {
        const searchParams = new URLSearchParams({ q: query, ...params });
        // ✅ Adds slash explicitly: /api/search.json
        const response = await fetch(`${BASE_URL}/search.json?${searchParams.toString()}`);
        if (!response.ok) throw new Error('Search failed');
        return response.json();
    },

    getBookDetails: async (workId: string): Promise<BookDetail> => {
        // workId from BookDetails.tsx usually starts with /works/ or /books/
        // If workId already has a slash, we don't add another.
        // If workId is "OL123M", we need to handle it.
        // Assuming your BookDetails passes the full path "/works/OL..."
        const response = await fetch(`${BASE_URL}${workId}.json`);
        if (!response.ok) throw new Error('Book not found');
        return response.json();
    },

    getRecentChanges: async (): Promise<any[]> => {
        // ✅ Adds slash explicitly: /api/recentchanges.json
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