import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoryApi = createApi({
    reducerPath: "categoryApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL,
        credentials: "include"
    }),
    tagTypes: ["Category"],
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => "get/all/category",
            providesTags: ["Category"],
        }),
        addCategory: builder.mutation({
            query: (formData) => ({
                url: "add/category",
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["Category"],
        }),
        editCategory: builder.mutation({
            query: ({ id, formData }) => ({
                url: `update/product/${id}`,
                method: "PUT",
                body: formData,
            }),
            invalidatesTags: ["Category"],
        }),


    }),
});

export const { useAddCategoryMutation, useEditCategoryMutation, useGetCategoriesQuery } = categoryApi;
