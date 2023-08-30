import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit'
import axios from "axios";
import {RootState} from "../store";
import {resolveSrv} from "dns";

export type SearchPizzaParams = {
    category: string;
    search:string;
    sortBy:string;
    currentPage:string;
}

// Record<string, string>


export const fetchPizzas = createAsyncThunk<TPizza[], SearchPizzaParams>('pizza/fetchPizzasStatus', async (params) => {
    const {category, search, sortBy, currentPage} = params;
    const {data} = await axios.get<TPizza[]>(
        `https://647bb7bad2e5b6101db18d30.mockapi.io/item?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}${search}`
    )
    return data;
});

type TPizza = {
    id: string;
    imageUrl: string;
    title: string;
    types: number[];
    sizes:number[];
    price: number;
    category: number;
    rating: number;
}

enum Status {
    LOADING = "loading",
    SUCCESS = "success",
    ERROR = "error"
}

interface IPizzaSliceState {
    items: TPizza[];
    status: Status;
}

const initialState: IPizzaSliceState = {
    items: [],
    status: Status.LOADING,
};

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action:PayloadAction<TPizza[]>) {
            state.items = action.payload;
        },
    },

    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending, (state, action) => {
            state.status = Status.LOADING;
            state.items = [];
        });
        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = Status.SUCCESS;
        });
        builder.addCase(fetchPizzas.rejected, (state, action) => {
            state.status = Status.ERROR;
            state.items = [];
        })
    },
})

export const selectPizzaData = (state:RootState) => state.pizza;

export const {setItems} = pizzaSlice.actions;

export default pizzaSlice.reducer;