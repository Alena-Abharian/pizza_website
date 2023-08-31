export enum SortEnum  {
    RATING = 'rating',
    PRICE = 'price',
    TITLE = 'title'
}


export type TSort = {
    name: string;
    sortProperty: SortEnum;
}

export interface IFilterSliceState {
    searchValue: string;
    categoryId: number;
    currentPage: number;
    sort:TSort;
}