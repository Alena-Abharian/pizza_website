import {RootState} from "../store";

export const selectFilterCategoryId = (state:RootState) => state.filter.categoryId;
export const selectFilterSortProperty = (state:RootState) => state.filter.sort.sortProperty;
export const selectFilterCurrentPage = (state:RootState) => state.filter.currentPage;
export const selectFilterSearchValue = (state:RootState) => state.filter.searchValue;
export const selectSort = (state:RootState) => state.filter.sort;