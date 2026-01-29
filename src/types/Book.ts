export interface BookSummary {
    key: string;
    title: string;
    author_name?: string[];
    first_publish_date?: number;
    cover_i?: number;
    subject?: string[];
}

export interface BookDetail extends BookSummary {
    description?: string | { value: string };
    subjects?: string[];
    publish_date?: string;
    covers?: number[];
    authors?: {
        key: string;
        name?: string;
        author?: { key: string }
    }[];
    wiki_url?: string;
}