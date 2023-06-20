import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from "axios";

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params) => {
    const {category, search, sortType, currentPage} = params;
    const {data} = await axios.get(
        `https://647bb7bad2e5b6101db18d30.mockapi.io/item?page=${currentPage}&limit=4&${category}&sortBy=${sortType}${search}`
    )
    return data;
});

const initialState = {
    items: [],
    status: 'loading',
};

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload;
        },
    },
    extraReducers: {
        [fetchPizzas.pending]: (state) => {
            state.status = "loading";
            state.items = [];
        },
        [fetchPizzas.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.status = "success";
        },
        [fetchPizzas.rejected]: (state, action) => {
            state.status = "error";
            state.items = [];
        }
    }
})

export const selectPizzaData = (state) => state.pizza;

export const {setItems} = pizzaSlice.actions;

export default pizzaSlice.reducer;