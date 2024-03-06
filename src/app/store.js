import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../features/product/productSlice";
import orderSlice from "../features/order/orderSlice";
import userSlice from "../features/user/userSlice";


export const store = configureStore({
    reducer: {
        product: productSlice,
        order:orderSlice,
        user:userSlice
    }
})