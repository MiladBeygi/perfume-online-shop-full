import { createSlice } from "@reduxjs/toolkit";

const shopppingCatrSlice = createSlice({
    name: 'shoppingCartSlice',
    initialState: [],
    reducers: {
        newOrder(state, action) {
            state = state.push(action.payload);
        },
        increaseOrder(state, action) {
            const myIndex = state.findIndex((el) => el.id === +action.payload?.id)
            if (+action.payload.storageQuantity > state[myIndex].quantity) {
                if ((myIndex + 1)) {
                    state[myIndex].quantity = state[myIndex].quantity + 1;
                }
            }
        },
        decreaseOrder(state, action) {
            const myIndex = state.findIndex((el) => el.id === +action.payload?.id)
            if ((myIndex + 1)) {
                if (state[myIndex].quantity === 1) {
                    state.splice(myIndex, 1);
                } else {
                    state[myIndex].quantity = state[myIndex].quantity - 1;
                }
            }
        },
        removeOrder(state, action) {
            const myIndex = state.findIndex((el) => el.id === +action.payload?.id);
            if ((myIndex + 1)) {
                state.splice(myIndex, 1);
            }
        },
        removeCart(state) {
            while (state.length) {
                state.pop();
            }
        }
    }
});
export const shoppingCartSliceActions = shopppingCatrSlice.actions;
export default shopppingCatrSlice.reducer;