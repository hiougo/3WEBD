export interface RecentChange {
    id: string;
    kind: string;
    author: { key: string };
    timestamp: string;
    changes: { key: string; revision: number }[];
}