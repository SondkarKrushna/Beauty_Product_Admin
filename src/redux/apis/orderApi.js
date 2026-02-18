import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
    reducerPath: "orderApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL,
        credentials: "include"
    }),
    tagTypes: ["Customer"],
    endpoints: (builder) => ({
        getAllOrders: builder.query({
            query: ({ page = 1, limit = 10 }) => `get/all/order?page=${page}&limit=${limit}`,
            providesTags: ["Order"],
        }),

        getOrderDetails: builder.query({
            query: (orderId) => `get/order/by/${orderId}`,
            providesTags: ["Customer"],
        }),

    }),
});

export const { useGetAllOrdersQuery, useGetOrderDetailsQuery } = orderApi;
