import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL,
        credentials: "include"
    }),
    endpoints: (builder) => ({
        loginAdmin: builder.mutation({
            query: (body) => ({
                url: "login",
                method: "POST",
                body
            }),
        }),
        
        verifyAdmin: builder.mutation({
            query: (body) => ({
                url: "login/verify",
                method: "POST",
                body
            }),
        }),
    }),
});

export const { useLoginAdminMutation, useVerifyAdminMutation } = authApi;
