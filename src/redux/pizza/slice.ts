import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {IPizzaSliceState, Status, TPizza} from "./types";
import {fetchPizzas} from "./asyncActions";

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

export const {setItems} = pizzaSlice.actions;

export default pizzaSlice.reducer;