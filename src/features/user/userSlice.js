import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginState: (state, action) => {
            state.currentUser = action.payload;
            localStorage.setItem("myUser", JSON.stringify(state.currentUser));
        },
        logoutState: (state, action) => {
            state.currentUser = null;
            localStorage.removeItem("myUser");
           
        },
    },
});
export const { loginState, logoutState } = userSlice.actions;
export default userSlice.reducer