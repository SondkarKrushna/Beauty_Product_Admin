import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const createSaleApi = createApi({
    reducerPath: "createSaleApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL || "https://beauty-products-backend-4ldf.onrender.com/api/admin/v1/",
        credentials: "include",
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("adminToken");

            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }

            return headers;
        },
    }),
    tagTypes: ["Sale"],
    endpoints: (builder) => ({
        AddFlashSale: builder.mutation({
            query: (formData) => ({
                url: "sale/create",
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["Sale"],
        }),
        getAllSale: builder.query({
            query: () => "/sale/all",
            providesTags: ["Sale"],
        }),
    }),
});

export const { useAddFlashSaleMutation, useGetAllSaleQuery } = createSaleApi;
