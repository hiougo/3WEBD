export interface WikiData {
    title: string;
    extract: string;
    content_urls: {
        desktop: { page: string };
    };
    thumbnail?: {
        source: string;
    };
}