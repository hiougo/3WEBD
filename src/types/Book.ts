export interface OpenLibrarySearchResponse {
    numFound: number;
    docs: BookSummary[];
}

export interface BookSummary {
    key: string;            // Ex: "/works/OL45804W"
    title: string;
    author_name?: string[];
    first_publish_year?: number;
    cover_i?: number;       // ID pour l'image de couverture
    subject?: string[];     // Tags/Sujets
    isbn?: string[];
}

export interface BookDetail extends BookSummary {
    description?: string | { value: string };
    number_of_pages?: number;
    covers?: number[];
    subjects?: string[];
}