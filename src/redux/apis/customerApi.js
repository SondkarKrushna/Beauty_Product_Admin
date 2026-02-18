import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const customerApi = createApi({
    reducerPath: "customerApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL,
        credentials: "include"
    }),
    tagTypes: ["Customer"],
    endpoints: (builder) => ({
        getAllCustomers: builder.query({
            query: ({ page = 1, limit = 20 }) => `/get/all/user?page=${page}&limit=${limit}`,
            providesTags: ["Customer"],
        }),
        getCustomerOrderDetails: builder.query({
            query: (customerId) => `get/user/by/${customerId}`,
            providesTags: ["Customer"],
        }),
    }),
});

export const { useGetAllCustomersQuery, useGetCustomerOrderDetailsQuery } = customerApi;
