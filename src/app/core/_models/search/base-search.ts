export interface BaseSearch {
    pageSize: number;
    page: number;
    retrieveAll: boolean;
    sortBy: string;
    includes: string[];
}
