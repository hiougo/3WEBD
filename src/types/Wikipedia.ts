export interface WikiData {
    title: string;
    extract: string;        // Résumé textuel
    content_urls: {
        desktop: { page: string };
    };
    thumbnail?: {
        source: string;       // URL de l'image Wikipedia
    };
}