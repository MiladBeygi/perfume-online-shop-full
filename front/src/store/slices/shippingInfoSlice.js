import { createSlice } from "@reduxjs/toolkit";
const initialState = { firstName: '', lastName: '', address: '', phone: '', expectAt: '', products: [], totalPrice: '', delivered: false }
const shippingInfoSlice = createSlice({
    name: 'shippingInfoSlice',
    initialState,
    reducers: {
        newShipping(state, action) {
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.address = action.payload.address;
            state.phone = action.payload.phone;
            state.expectAt = action.payload.expectAt;
            state.products = action.payload.products;
            state.totalPrice = action.payload.totalPrice;
            state.delivered = action.payload.delivered;
        },
        removeShippingInfo(state) {
            state.firstName = '';
            state.lastName = '';
            state.address = '';
            state.phone = '';
            state.expectAt = '';
            state.products = '';
            state.totalPrice = '';
            state.delivered = '';
        }
    }
});
export const shippingInfoSliceActions = shippingInfoSlice.actions;
export default shippingInfoSlice.reducer;