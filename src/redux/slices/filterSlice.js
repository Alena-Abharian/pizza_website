import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    searchValue: '',
    categoryId: 0,
    currentPage: 1,
    sort: {
        name: 'popularity',
        sortProperty: 'rating'
    }
}

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategoryId(state, action) {
            state.categoryId = action.payload;
        },
        setSearchValue(state,action) {
            state.searchValue = action.payload;
        },
        setSort(state, action) {
            state.sort = action.payload;
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload;
        },
        setFilters(state, action){
            state.currentPage = Number(action.payload.currentPage);
            state.sortType = action.payload.sortType;
            state.categoryId = Number(action.payload.categoryId);
        }
    },
})

export const selectFilterCategoryId = (state) => state.filter.categoryId;
export const selectFilterSortProperty = (state) => state.filter.sort.sortProperty;
export const selectFilterCurrentPage = (state) => state.filter.currentPage;
export const selectFilterSearchValue = (state) => state.filter.searchValue;
export const selectSort = (state) => state.filter.sort;
export const {setCategoryId, setSort, setCurrentPage,setFilters, setSearchValue} = filterSlice.actions;

export default filterSlice.reducer;