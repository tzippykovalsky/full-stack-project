import { createSlice } from "@reduxjs/toolkit"


let initialState = {
    ordersArr: []
}

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        addArrProductToState: (state, action) => {
            state.ordersArr = action.payload;

        },

        addProductToOrderInState: (state, action) => {
            const existingProductIndex = state.ordersArr.findIndex((product) => product.productCode === action.payload.productCode);

            if (existingProductIndex !== -1) {
                state.ordersArr[existingProductIndex].quantity += action.payload.quantity;
            } else {
                state.ordersArr.push(action.payload);
            }
           
            localStorage.setItem("myCart", JSON.stringify(state.ordersArr));
        },




        deleteProductFromOrderInState: (state, action) => {
            let index = state.ordersArr.findIndex((item) => item.productCode === action.payload);
            state.ordersArr.splice(index, 1);
            if (state.ordersArr.length > 1)
                localStorage.setItem("myCart", JSON.stringify(state.ordersArr));
            else  localStorage.removeItem("myCart");
        },
    }
})

export const { addProductToOrderInState, deleteProductFromOrderInState, addArrProductToState } = orderSlice.actions;
export default orderSlice.reducer;