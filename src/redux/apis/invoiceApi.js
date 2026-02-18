import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const invoiceApi = createApi({
    reducerPath: "invoiceApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://beauty-products-backend-4ldf.onrender.com/api",
        credentials: "include"
    }),
     
    tagTypes: ["admin"],
    endpoints: (builder) => ({
        getAllinvoice: builder.query({
            query: ({ page = 1, limit = 10 } = {}) => ({
                url: `/biling_software/invoice?page=${page}&limit=${limit}`,
                method: "GET",
            }),
            providesTags: ["admin"],
        }),
        getInvoicebyId: builder.query({
            query: (id) => ({
                url: `/biling_software/invoice/${id}`,
                method: "GET",
            }),
        }),
    }),
});

export const { useGetAllinvoiceQuery, useGetInvoicebyIdQuery } = invoiceApi;
