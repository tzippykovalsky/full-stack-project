import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../features/productSlice";
import orderSlice from "../features/orderSlice";
import userSlice from "../features/userSlice";


export const store = configureStore({
    reducer: {
        product: productSlice,
        order:orderSlice,
        user:userSlice
    }
})