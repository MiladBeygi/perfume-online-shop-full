import { createSlice } from "@reduxjs/toolkit";

const errorSlice = createSlice({
    name: 'errorSlice',
    initialState: { error: '' },
    reducers: {
        setError(state, action) {
            state.error = action.payload;
        }
    }
});
export const errorSliceActions = errorSlice.actions;
export default errorSlice.reducer;