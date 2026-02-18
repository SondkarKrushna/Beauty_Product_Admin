import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productDetailsApi = createApi({
    reducerPath: "productDetailsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://beauty-products-backend.onrender.com/api/user/",
        credentials: "include"
    }),
    endpoints: (builder) => ({
        getProductDetails: builder.query({
            query: (id) => `get/product/${id}`,
        }),
    }),
});

export const { useGetProductDetailsQuery } = productDetailsApi;
