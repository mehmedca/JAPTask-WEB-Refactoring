import { BaseSearch } from "./base-search";

export interface MovieSearch extends BaseSearch {
    textualSearch: string;
    releaseYear: number;
}
