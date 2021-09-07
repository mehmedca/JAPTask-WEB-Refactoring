import { BaseSearch } from "./base-search";

export interface AppuserSearch extends BaseSearch{
    firstName: string;
    lastName: string;
    roleId: string;
}
