export class PagedResult<T> {
    //totals
    totalCompletedWorkAmount?: number;
    totalInvoicesAmount?: number;
    totalExpensesAmount?: number;
    totalAmount?: number;

    count: number = 0;
    results: T[] = [];
}