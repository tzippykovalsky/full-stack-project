import { createSlice } from "@reduxjs/toolkit"

let initialState = {
    numberOfPages: null,
    currentPageOnSite:1
}

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        saveNumPagesToState: (state, action) => {
            state.numberOfPages = action.payload;
      
        },
        saveCurrentPageOnSiteToState:(state, action)=>{
            state.currentPageOnSite=action.payload;
            localStorage.setItem("currentPages", JSON.stringify(state.currentPageOnSite));
        }
    }
});

export const { saveCurrentPageOnSiteToState, saveNumPagesToState } = productSlice.actions;
export default productSlice.reducer