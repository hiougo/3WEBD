// src/types/Book.ts

export interface BookSummary {
    key: string;
    title: string;
    author_name?: string[];
    first_publish_date?: number;
    cover_i?: number;
    subject?: string[];
}

// C'est cette ligne qui manque probablement ou qui est mal écrite :
export interface BookDetail extends BookSummary {
    description?: string | { value: string };
    subjects?: string[];
    number_of_pages?: number;
    // Ajoute d'autres champs si nécessaire
    publish_date?: string;
    covers?: number[];
    authors?: {
        key: string;            // Le cas standard
        name?: string;          // Parfois le nom est là
        author?: { key: string } // Le cas imbriqué (Work vs Edition)
    }[];
    wiki_url?: string;
}

export interface OpenLibrarySearchResponse {
    numFound: number;
    docs: BookSummary[];
}