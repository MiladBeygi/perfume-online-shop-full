import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
    name: "productsSlice",
    initialState: [],
    reducers: {
        setProducts(state, action) {
            return [...action.payload];
        }
    }
})
export const productsSliceActions = productsSlice.actions;
export default productsSlice.reducer;
