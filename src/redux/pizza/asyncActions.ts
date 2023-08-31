import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {SearchPizzaParams, TPizza} from "./types";

export const fetchPizzas = createAsyncThunk<TPizza[], SearchPizzaParams>('pizza/fetchPizzasStatus', async (params) => {
    const {category, search, sortBy, currentPage} = params;
    const {data} = await axios.get<TPizza[]>(
        `https://647bb7bad2e5b6101db18d30.mockapi.io/item?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}${search}`
    )
    return data;
});
