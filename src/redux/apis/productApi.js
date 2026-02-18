import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL,
        credentials: "include"
    }),
    tagTypes: ["Product"],
    endpoints: (builder) => ({
        getAllProducts: builder.query({
            query: () => "get/all/product",
            providesTags: ["Product"],
        }),
        addProduct: builder.mutation({
            query: (formData) => ({
                url: "add/product",
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["Product"],
        }),
        editProduct: builder.mutation({
            query: ({ categoryId, productId, formData }) => ({
                url: `update/product/${categoryId}/${productId}`,
                method: "PUT",
                body: formData,
            }),
            invalidatesTags: ["Product"],
        }),

        deleteProduct: builder.mutation({
            query: (body) => ({
                url: "v1/login/verify",
                method: "POST",
                body
            }),
        }),
    }),
});

export const { useGetAllProductsQuery, useAddProductMutation, useEditProductMutation } = productApi;
