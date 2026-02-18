import { createSlice } from "@reduxjs/toolkit";


const storedToken = localStorage.getItem("adminToken");

const initialState = {
    admin: null,
    token: storedToken || null,
    isAuthenticated: !!storedToken,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
            state.isAuthenticated = true;
            localStorage.setItem("adminToken", action.payload); // Save token
        },
        setAdmin: (state, action) => {
            state.admin = action.payload;
            state.isAuthenticated = true;
        },
        logoutAdmin: (state) => {
            state.admin = null;
            state.token = null;
            state.isAuthenticated = false;
            localStorage.removeItem("adminToken");
        },
    },
});

export const { setToken, setAdmin, logoutAdmin } = authSlice.actions;
export default authSlice.reducer;
